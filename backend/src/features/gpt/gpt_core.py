import os
from pathlib import Path
from typing import Optional
from dotenv import load_dotenv
from typing import Dict
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferWindowMemory
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings

from src.core import settings
from .gpt_prompts import QA_PROMPT


class ChatbotManager:
    """Main chatbot manager class"""

    def __init__(self):
        self.qa_chain: Optional[ConversationalRetrievalChain] = None
        self.memory_manager = MemoryManager()
        self.vectordb: Optional[Chroma] = None
        self.llm: Optional[ChatGoogleGenerativeAI] = None
        self.retriever = None

    async def initialize(self):
        """Initialize all chatbot components"""
        await self._load_environment()
        await self._setup_vector_store()
        await self._setup_llm()
        await self._create_qa_chain()

    async def _load_environment(self):
        """Load environment variables"""
        api_key = os.getenv("GOOGLE_API_KEY") or settings.gemini_api_key

        if not api_key:
            raise ValueError("GOOGLE_API_KEY not found")

        os.environ["GOOGLE_API_KEY"] = api_key

    async def _setup_vector_store(self):
        """
        Setup or load the Chroma vector store and configure retriever.
        TODO: Make such that read all the files inside `settings.dataset_path`
        """

        try:
            chroma_dir = settings.chroma_persist_dir
            embeddings = GoogleGenerativeAIEmbeddings(model=settings.embedding_model)

            if Path(chroma_dir).exists() and any(Path(chroma_dir).iterdir()):
                # Load existing vector store
                self.vectordb = Chroma(
                    embedding_function=embeddings, persist_directory=chroma_dir
                )
                print("Existing vector store loaded!")
            else:
                print("Creating new vector store...")
                loader = TextLoader(settings.dataset_path)
                docs = loader.load()

                splitter = RecursiveCharacterTextSplitter(
                    chunk_size=settings.chunk_size,
                    chunk_overlap=settings.chunk_overlap,
                )
                splits = splitter.split_documents(docs)

                self.vectordb = Chroma.from_documents(
                    splits,
                    embedding=embeddings,
                    persist_directory=chroma_dir,
                )
                print("Vector store created!")

            self.retriever = self.vectordb.as_retriever(
                search_kwargs={"k": settings.retrieval_doc_k}
            )

        except FileNotFoundError:
            raise FileNotFoundError(
                f"Dataset file '{settings.dataset_path}' not found."
            )
        except Exception as e:
            raise Exception(f"Error setting up document processing: {str(e)}")

    async def _setup_llm(self):
        """Setup the language model"""
        self.llm = ChatGoogleGenerativeAI(
            model=settings.llm_model, temperature=settings.llm_temperature
        )

    async def _create_qa_chain(self):
        """Create the QA chain"""
        self.qa_chain = ConversationalRetrievalChain.from_llm(
            llm=self.llm,
            retriever=self.retriever,
            return_source_documents=True,
            combine_docs_chain_kwargs={"prompt": QA_PROMPT},
            verbose=False,
        )

    def get_response(self, question: str, session_id: str = "default") -> dict:
        """Get response from the chatbot"""
        if not self.qa_chain:
            raise Exception("Chatbot not initialized")

        # Get memory for this session
        memory = self.memory_manager.get_or_create_memory(session_id)

        # Create temporary chain with session-specific memory
        temp_chain = ConversationalRetrievalChain.from_llm(
            llm=self.llm,
            retriever=self.retriever,
            memory=memory,
            return_source_documents=True,
            combine_docs_chain_kwargs={"prompt": QA_PROMPT},
            verbose=False,
        )

        # Get response
        result = temp_chain({"question": question})
        return result


class MemoryManager:
    """Manages conversation memory for different sessions"""

    def __init__(self):
        self.memory_store: Dict[str, ConversationBufferWindowMemory] = {}

    def get_or_create_memory(self, session_id: str) -> ConversationBufferWindowMemory:
        """
        Get or create memory for a specific session
        TODO: Add DB
        """
        if session_id not in self.memory_store:
            self.memory_store[session_id] = ConversationBufferWindowMemory(
                k=settings.memory_window_k,
                return_messages=True,
                memory_key="chat_history",
                output_key="answer",
            )
        return self.memory_store[session_id]

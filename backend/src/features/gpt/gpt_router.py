from fastapi import APIRouter, HTTPException, Depends
from fastapi.requests import Request
from typing import List, Dict

from .gpt_schemas import (
    ChatRequest,
    ChatResponse,
    SessionsResponse,
)
from .gpt_core import ChatbotManager

router = APIRouter(prefix="/gpt")


def get_chatbot_manager(request: Request) -> ChatbotManager:
    """Dependency to get chatbot manager from app state"""
    return request.app.state.chatbot_manager


@router.post("/gpt", response_model=ChatResponse)
async def chat_endpoint(
    request: ChatRequest, chatbot_manager: ChatbotManager = Depends(get_chatbot_manager)
):
    """Main chat endpoint for the forestry expert chatbot"""
    try:
        # Get response from chatbot
        result = chatbot_manager.get_response(
            question=request.question, session_id=request.session_id
        )

        # Format sources
        sources = []
        if result.get("source_documents"):
            for i, doc in enumerate(result["source_documents"], start=1):
                sources.append(
                    {
                        "source_id": i,
                        "metadata": doc.metadata,
                        "content_preview": (
                            doc.page_content[:200] + "..."
                            if len(doc.page_content) > 200
                            else doc.page_content
                        ),
                    }
                )

        return ChatResponse(
            answer=result["answer"], session_id=request.session_id, sources=sources
        )

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error processing request: {str(e)}"
        )

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ========= App Info ===========
    app_name: str
    version: str = "1.0.0"
    api_prefix: str = "/api/v1"

    # ============ RAG ============
    chunk_size: int = 800
    chunk_overlap: int = 150
    retrieval_doc_k: int = 8
    memory_window_k: int = 5
    embedding_model: str = "models/embedding-001"
    llm_model: str = "gemini-1.5-flash"
    llm_temperature: float = 0.0
    dataset_path: str
    chroma_persist_dir: str

    # ======== JWT Settings ========
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 60

    # ============ URLs ============
    server_url: str
    frontend_url: str
    database_url: str

    # =========== API keys =========
    open_ai: str
    gemini_api_key: str

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )


settings = Settings()

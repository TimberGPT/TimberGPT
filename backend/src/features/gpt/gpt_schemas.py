from pydantic import BaseModel
from typing import Optional, List, Dict


class ChatRequest(BaseModel):
    question: str
    session_id: Optional[str] = "default"


class ChatResponse(BaseModel):
    answer: str
    session_id: str
    sources: Optional[List[Dict]] = None


class SessionsResponse(BaseModel):
    active_sessions: List[str]
    total_sessions: int

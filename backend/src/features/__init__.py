from fastapi import APIRouter

# Router imports
from .gpt.gpt_router import router as gpt_router
from .user.user_router import router as user_router


api_router = APIRouter()


api_router.include_router(gpt_router, tags=["GPT"])
api_router.include_router(user_router, tags=["User"])

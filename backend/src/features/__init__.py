from fastapi import APIRouter

# Router imports
from .gpt.gpt_router import router as gpt_router
from .user.user_router import router as user_router
from .image_process.api import router as image_process_router
from .image_process.ring_count_api import router as ring_count_router


api_router = APIRouter()


api_router.include_router(gpt_router, tags=["GPT"])
api_router.include_router(user_router, tags=["User"])
api_router.include_router(image_process_router, tags=["Image Processing"])
api_router.include_router(ring_count_router, tags=["Ring Count"])

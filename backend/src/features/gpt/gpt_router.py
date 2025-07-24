from fastapi import APIRouter


router = APIRouter(prefix="/gpt")


@router.get("/")
def get_user():
    return "This is TimberGPT"

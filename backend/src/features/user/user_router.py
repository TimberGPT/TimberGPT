from fastapi import APIRouter


router = APIRouter(prefix="/user")


@router.get("/login")
def get_user():
    return "Login successful"

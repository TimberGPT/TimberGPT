from typing import Annotated
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session

# Internal imports
from src.core import get_session
from src.security import oauth2
from src.schemas import Message, Token, TokenData
from . import user_schemas as schema
from . import user_services as service

router = APIRouter(prefix="/user")
DBSession = Annotated[Session, Depends(get_session)]


@router.post("/register", response_model=Message)
def create_user(info: schema.UserCreate, session: DBSession):
    """
    Register a new user with hashed password.
    """
    return service.create_user(info, session)


@router.post("/login", response_model=Token)
def login(session: DBSession, form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Authenticate user and return JWT access token.
    """
    return service.authenticate_user(form_data, session)


@router.get("/me")
def read_current_user(current_user: TokenData = Depends(oauth2.get_current_user)):
    """
    Return the authenticated user's information from the `Access Token`.
    """
    return current_user

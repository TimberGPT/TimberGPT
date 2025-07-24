from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select

from src import models
from src.security import hashing, oauth2
from src.schemas import Token
from . import user_schemas as schema


def create_user(info: schema.UserCreate, session: Session):
    """
    Register a new user with unique email and hashed password.
    """

    statement = select(models.User).where(models.User.email == info.email)
    existing_user = session.exec(statement).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )

    # Hash password
    info.password = hashing.hash(info.password)

    # Create user model
    new_user = models.User(**info.model_dump())
    session.add(new_user)
    session.commit()
    new_user = session.refresh(new_user)

    return {"message": "User created Successfully"}


def authenticate_user(form_data: OAuth2PasswordRequestForm, session: Session) -> Token:
    """
    Verify user credentials and return a JWT access token.
    """

    statement = select(models.User).where(models.User.email == form_data.username)
    user = session.exec(statement).first()

    if not user or not hashing.verify(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token_data = {
        "name": user.name,
        "email": user.email,
    }

    access_token = oauth2.create_access_token(token_data)

    return Token(access_token=access_token, token_type="bearer")

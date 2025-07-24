import jwt
from jwt import PyJWTError, ExpiredSignatureError
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from src.core import settings
from src.schemas import TokenData


# Extracts Bearer token from the Authorization header
# `tokenUrl` is the login endpoint used by Swagger UI
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.api_prefix}/user/login")


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now() + (
        expires_delta or timedelta(minutes=settings.jwt_expiration_minutes)
    )
    to_encode.update({"exp": expire, "sub": data.get("email")})
    encoded_jwt = jwt.encode(
        to_encode,
        settings.jwt_secret_key,
        algorithm=settings.jwt_algorithm,
    )
    return encoded_jwt


def verify_access_token(token: str) -> TokenData:
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret_key,
            algorithms=[settings.jwt_algorithm],
        )

        token_data = TokenData(
            name=payload.get("name"),
            email=payload.get("sub"),
        )

        if token_data.email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token payload missing email",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return token_data
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user(token: str = Depends(oauth2_scheme)) -> TokenData:
    """
    Dependency to extract current user info from JWT token.
    """
    return verify_access_token(token)

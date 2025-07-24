from typing import Optional
from pydantic import BaseModel, Field, EmailStr


# Generic response message
class Message(BaseModel):
    message: str = Field(..., example="Operation successful")


# JWT
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# Token data payload
class TokenData(BaseModel):
    name: str
    email: EmailStr

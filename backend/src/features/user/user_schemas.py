from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    name: str = Field(..., max_length=255, example="Adnan Sarkar")
    email: EmailStr = Field(..., max_length=255, example="adnan@example.com")
    password: str = Field(..., min_length=4, max_length=255, example="StrongP@ssw0rd")


class UserRead(BaseModel):
    name: str
    email: EmailStr


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None

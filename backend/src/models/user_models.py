from sqlmodel import SQLModel, Field
from typing import Optional


# SQLModel User class
class User(SQLModel, table=True):
    # Primary key
    id: Optional[int] = Field(default=None, primary_key=True)

    # Required fields
    name: str = Field(max_length=255)
    email: str = Field(max_length=255, unique=True)
    password: str = Field(max_length=255)

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    pass


class UserRead(UserBase):
    id: int
    avatar: str
    username: str
    email: str
    deleted: bool
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime] = None
    last_login_at: Optional[datetime] = None


class UserCreate(UserBase):
    username: str = Field(min_length=4, max_length=16)
    email: EmailStr
    password: str = Field(min_length=6)


class UserUpdate(UserBase):
    avatar: Optional[str] = None
    username: Optional[str] = Field(None, min_length=4, max_length=16)
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=6)


class UserUpdateAdmin(UserUpdate):
    deleted: Optional[bool] = None
    roles: Optional[list[int]] = None

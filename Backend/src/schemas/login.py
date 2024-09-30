from typing import Any
from pydantic import BaseModel

from src.schemas.relation import UserReadWithRelation


class Login(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Any


class LoginResponseModel(Login):
    user: UserReadWithRelation

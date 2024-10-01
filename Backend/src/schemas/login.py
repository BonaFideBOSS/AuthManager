from typing import Any

from fastapi import Form
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

from src.schemas.relation import UserReadWithRelation


class LoginForm(OAuth2PasswordRequestForm):
    email: str = Form(...)

    def __init__(self, email: str = Form(...), password: str = Form(...)):
        super().__init__(username=email, password=password)
        self.email = email


class Login(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Any


class LoginResponseModel(Login):
    user: UserReadWithRelation

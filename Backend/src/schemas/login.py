from typing import Any, Optional

from fastapi import Form
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.exceptions import HTTPException
from pydantic import BaseModel

from src.schemas.relation import UserReadWithRelation


class LoginForm(OAuth2PasswordRequestForm):
    """Custom Swagger Log-in Form"""

    email: Optional[str] = Form(default=None)
    username: Optional[str] = Form(default=None)
    password: Optional[str] = Form(default=None)

    def __init__(self,
                 email: Optional[str] = Form(None),
                 username: Optional[str] = Form(None),
                 password: Optional[str] = Form(None)):
        if not (username or email and password):
            raise HTTPException(status_code=401,
                                detail='Email and Password required')
        super().__init__(username=email or username, password=password)
        self.email = email or username


class Login(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Any


class LoginResponseModel(Login):
    user: UserReadWithRelation

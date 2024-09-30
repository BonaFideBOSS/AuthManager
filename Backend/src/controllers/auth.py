from datetime import datetime, timedelta

import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from src.config.settings import Settings
from src.config.database import get_db
from src.controllers.user import UserController
from src.models.user import User
from src.utils.encryption import verify

settings = Settings()
SECRET_KEY = settings.SECRET_KEY
AUTH_ALGORITHM = settings.AUTH_ALGORITHM
AUTH_TOKEN_DURATION = settings.AUTH_TOKEN_DURATION
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login/")


class AuthController:
    """
    Authentication
    """

    def authenticate_user(self, email: str, password: str, db: Session):
        """
        Authenticate user credentials
        """
        controller = UserController(db=db)
        user = controller.read(email=email)
        if not user:
            return False
        if not verify(password, user.password):
            return False
        return user

    def create_access_token(self,
                            data: dict):
        """Generate a JWT token from the given data"""
        to_encode = data.copy()
        expire = datetime.now() + timedelta(minutes=AUTH_TOKEN_DURATION)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, SECRET_KEY, algorithm=AUTH_ALGORITHM)

    def get_current_user(self,
                         token: str = Depends(oauth2_scheme),
                         db: Session = Depends(get_db)):
        """Get user details from the JWT token"""
        credentials_exception = HTTPException(status_code=401,
                                              detail="Invalid credentials")
        try:
            payload = jwt.decode(jwt=token,
                                 key=SECRET_KEY,
                                 algorithms=[AUTH_ALGORITHM])
            user_id: int = payload.get("user_id")
            if not user_id:
                raise credentials_exception
        except InvalidTokenError as e:
            raise credentials_exception from e
        controller = UserController(db=db)
        user = controller.read(user_id=user_id)
        if not user:
            raise credentials_exception
        return user


class Authorize:
    """
    If the user has any role from the allowed roles
    return true or else raise an exception
    """
    auth_controller = AuthController()

    def __init__(self, permission: str | None = None):
        self.permission = permission

    def __call__(self, user: User = Depends(auth_controller.get_current_user)):
        perms = [perm.name for role in user.roles for perm in role.permissions]
        if self.permission in perms:
            return user
        raise HTTPException(status_code=403,
                            detail="You don't have enough permissions")

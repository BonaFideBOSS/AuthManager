from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from src.config.database import get_db
from src.controllers.auth import AuthController
from src.controllers.user import UserController
from src.schemas.login import Login, LoginResponseModel
from src.schemas.user import UserCreate
from src.schemas.custom_response import CustomResponse, UserResponseModel

auth = APIRouter()


@auth.post("/register/", response_model=UserResponseModel)
def register(user: UserCreate, db: Session = Depends(get_db)):
    """API for users to create a new account"""

    try:
        user = UserController(db=db).create(user=user)
        return CustomResponse(success=True,
                              message="User created successfully",
                              data=user)

    except Exception as e:
        raise HTTPException(status_code=400,
                            detail=f"Failed to register - {str(e)}") from e


@auth.post("/login/", response_model=LoginResponseModel)
def login(form_data: OAuth2PasswordRequestForm = Depends(),
          db: Session = Depends(get_db)):
    """
    API to let users log into the system
    they are first authenticated by username and password
    if verified, a JWT token is generated and sent to them
    """
    try:
        auth_controller = AuthController()
        user = auth_controller.authenticate_user(form_data.username,
                                                 form_data.password,
                                                 db)
        if not user:
            raise ValueError("Invalid credentials")

        data = {"user_id": user.id}
        access_token = auth_controller.create_access_token(data=data)
        return Login(access_token=access_token, user=user)

    except Exception as e:
        raise HTTPException(status_code=401,
                            detail=f"Failed to login - {str(e)}") from e

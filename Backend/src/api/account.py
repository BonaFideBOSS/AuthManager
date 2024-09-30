from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from src.config.database import get_db
from src.controllers.auth import AuthController
from src.controllers.user import UserController
from src.models.user import User
from src.schemas.user import UserUpdate
from src.schemas.custom_response import CustomResponse, UserResponseModel

account = APIRouter()
auth = AuthController()


@account.get("/", response_model=UserResponseModel)
def get_account(db: Session = Depends(get_db),
                current_user: User = Depends(auth.get_current_user)):
    """API for user to get their account details"""
    try:
        user = UserController(db=db).read(user_id=current_user.id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return CustomResponse(success=True, data=user)

    except Exception as e:
        raise HTTPException(status_code=400,
                            detail=f'Failed to get user - {str(e)}') from e


@account.put("/", response_model=UserResponseModel)
def update_account(new_details: UserUpdate,
                   db: Session = Depends(get_db),
                   current_user: User = Depends(auth.get_current_user)):
    """API for user to update their account details"""
    try:
        user = UserController(db=db).update(current_user.id, new_details)
        return CustomResponse(success=True,
                              data=user,
                              message='Account updated successfully')

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f'Failed to update account - {str(e)}') from e


@account.delete("/", response_model=UserResponseModel)
def delete_account(db: Session = Depends(get_db),
                   current_user: User = Depends(auth.get_current_user)):
    """API for user to delete their account"""
    try:
        user = UserController(db=db).delete(current_user.id)
        return CustomResponse(success=True,
                              data=user,
                              message='Account deleted successfully')

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f'Failed to delete account - {str(e)}') from e

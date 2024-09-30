from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException

from src.utils.avatar_picker import get_avatars_list
from src.controllers.auth import AuthController
from src.schemas.custom_response import CustomResponse

auth_controller = AuthController()
avatar = APIRouter(dependencies=[Depends(auth_controller.get_current_user)])


@avatar.get('/', response_model=CustomResponse)
def get_avatars():
    """API to get list of all avatars"""
    try:
        return CustomResponse(success=True, data=get_avatars_list())
    except Exception as e:
        raise HTTPException(status_code=400,
                            detail=f'Failed to get avatars - {str(e)}') from e

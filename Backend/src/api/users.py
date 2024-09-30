from fastapi import APIRouter, Depends, Query
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from src.config.database import get_db
from src.controllers.auth import Authorize
from src.controllers.user import UserController
from src.schemas.custom_response import (CustomResponse,
                                         Pagination,
                                         UserResponseModel)
from src.schemas.user import UserUpdateAdmin


users = APIRouter()


@users.get("/all/", response_model=UserResponseModel)
def get_all_users(query: str = None,
                  exclude_deleted: bool = True,
                  roles: str | None = None,
                  sort_by: str = "created_at",
                  sort_order: str = "desc",
                  page: int = Query(1, ge=1),
                  limit: int = Query(10, ge=1, le=100),
                  db: Session = Depends(get_db),
                  _=Depends(Authorize(permission="user_read"))):
    try:
        controller = UserController(db=db)
        data, pagination = controller.read_many(
            query=query,
            page=page,
            limit=limit,
            exclude_deleted=exclude_deleted,
            roles=roles,
            sort_by=sort_by,
            sort_order=sort_order)
        return CustomResponse(success=True,
                              data=data,
                              pagination=Pagination(**pagination))
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f'Failed to retrieve user(s) - {str(e)}.') from e


@users.get("/", response_model=UserResponseModel)
def get_user(user_id: int,
             db: Session = Depends(get_db),
             _=Depends(Authorize(permission="user_read"))):
    try:
        controller = UserController(db=db)
        user = controller.read(user_id=user_id, exclude_deleted=False)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return CustomResponse(success=True, data=user)
    except Exception as e:
        raise HTTPException(status_code=400,
                            detail=f'Failed to get user - {str(e)}.') from e


@users.put("/", response_model=UserResponseModel)
def update_user(user_id: int,
                new_details: UserUpdateAdmin,
                db: Session = Depends(get_db),
                _=Depends(Authorize(permission="user_update"))):
    try:
        user = UserController(db=db).update(user_id, new_details)
        return CustomResponse(success=True,
                              data=user,
                              message='User updated successfully')
    except Exception as e:
        raise HTTPException(status_code=400,
                            detail=f'Failed to update user - {str(e)}') from e


@users.delete("/", response_model=UserResponseModel)
def delete_user(user_id: int,
                db: Session = Depends(get_db),
                _=Depends(Authorize(permission="user_delete"))):
    try:
        user = UserController(db=db).delete(user_id)
        return CustomResponse(success=True,
                              data=user,
                              message='User updated successfully')
    except Exception as e:
        raise HTTPException(status_code=400,
                            detail=f'Failed to delete user - {str(e)}') from e


@users.delete("/many/", response_model=UserResponseModel)
def delete_multiple_users(user_ids: list[int],
                          db: Session = Depends(get_db),
                          user=Depends(Authorize(permission="user_delete"))):
    try:
        return CustomResponse(success=True,
                              data=UserController(db=db).delete_many(user_ids),
                              message="Users deleted successfully")
    except Exception as e:
        raise HTTPException(status_code=400,
                            detail=f'Failed to delete users - {str(e)}') from e

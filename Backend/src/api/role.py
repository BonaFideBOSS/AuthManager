from fastapi import APIRouter, Depends, Query
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from src.config.database import get_db
from src.controllers.auth import Authorize
from src.controllers.role import RoleController
from src.schemas.role import RoleCreate, RoleUpdate
from src.schemas.custom_response import (CustomResponse,
                                         Pagination,
                                         RoleResponseModel)

roles = APIRouter()


@roles.get("/", response_model=RoleResponseModel)
def get_roles(query: str = None,
              roles: str = None,
              perms: str = None,
              sort_by: str = "created_at",
              sort_order: str = "desc",
              page: int = Query(1, ge=1),
              limit: int = Query(10, ge=1, le=100),
              db: Session = Depends(get_db),
              _=Depends(Authorize(permission="role_read"))):
    try:
        controller = RoleController(db=db)
        data, pagination = controller.read_many(query=query,
                                                roles=roles,
                                                perms=perms,
                                                sort_by=sort_by,
                                                sort_order=sort_order,
                                                page=page,
                                                limit=limit)
        return CustomResponse(success=True,
                              data=data,
                              pagination=Pagination(**pagination))

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) from e


@roles.post("/", response_model=RoleResponseModel)
def create_role(role: RoleCreate,
                db: Session = Depends(get_db),
                _=Depends(Authorize(permission="role_create"))):
    try:
        return CustomResponse(success=True,
                              data=RoleController(db=db).create(new_role=role),
                              message="Role created successfully")
    except Exception as e:
        raise HTTPException(status_code=400,
                            detail=f"Failed to create role - {str(e)}") from e


@roles.put("/", response_model=RoleResponseModel)
def update_role(role_id: int,
                new_details: RoleUpdate,
                db: Session = Depends(get_db),
                _=Depends(Authorize(permission="role_update"))):

    try:
        role = RoleController(db=db).update(role_id, new_details)
        return CustomResponse(success=True,
                              data=role,
                              message="Role updated successfully")

    except Exception as e:
        raise HTTPException(status_code=400,
                            detail=f"Failed to update role - {str(e)}") from e


@roles.delete("/", response_model=RoleResponseModel)
def delete_role(role_id: int,
                db: Session = Depends(get_db),
                _=Depends(Authorize(permission="role_delete"))):
    try:
        role = RoleController(db=db).delete(role_id)
        return CustomResponse(success=True,
                              data=role,
                              message='Roles deleted successfully')

    except Exception as e:
        raise HTTPException(status_code=400,
                            detail=f"Failed to delete role - {str(e)}") from e


@roles.delete("/many/", response_model=RoleResponseModel)
def delete_multiple_roles(role_ids: list[int],
                          db: Session = Depends(get_db),
                          user=Depends(Authorize(permission="role_delete"))):
    try:
        roles = RoleController(db=db).delete_many(role_ids)
        return CustomResponse(success=True,
                              data=roles,
                              message='Roles deleted successfully')

    except Exception as e:
        raise HTTPException(status_code=400,
                            detail=f'Failed to delete roles - {str(e)}') from e

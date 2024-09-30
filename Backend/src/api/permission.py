from fastapi import APIRouter, Depends, Query
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from src.config.database import get_db
from src.controllers.auth import Authorize
from src.controllers.permission import PermissionController
from src.schemas.custom_response import (CustomResponse,
                                         Pagination,
                                         PermissionResponseModel)
from src.schemas.permission import PermissionCreate, PermissionUpdate

permissions = APIRouter()


@permissions.get("/", response_model=PermissionResponseModel)
def get_permissions(query: str = None,
                    roles: str = None,
                    perms: str = None,
                    sort_by: str = "created_at",
                    sort_order: str = "desc",
                    page: int = Query(1, ge=1),
                    limit: int = Query(10, ge=1, le=100),
                    db: Session = Depends(get_db),
                    _=Depends(Authorize(permission="permission_read"))):
    try:
        controller = PermissionController(db=db)
        data, pagination = controller.read_many(
            query=query,
            roles=roles,
            perms=perms,
            sort_by=sort_by,
            sort_order=sort_order,
            page=page,
            limit=limit,
        )
        return CustomResponse(success=True,
                              data=data,
                              pagination=Pagination(**pagination))

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) from e


@permissions.post("/", response_model=PermissionResponseModel)
def create_permission(permission: PermissionCreate,
                      db: Session = Depends(get_db),
                      _=Depends(Authorize(permission="permission_create"))):
    try:
        controller = PermissionController(db=db)
        permission = controller.create(permission)
        return CustomResponse(success=True,
                              data=permission,
                              message='Permission created successfully')

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to create permission - {str(e)}") from e


@permissions.put("/", response_model=PermissionResponseModel)
def update_permission(permission_id: int,
                      new_details: PermissionUpdate,
                      db: Session = Depends(get_db),
                      _=Depends(Authorize(permission="permission_update"))):

    try:
        controller = PermissionController(db=db)
        permission = controller.update(permission_id, new_details)
        return CustomResponse(success=True,
                              data=permission,
                              message='Permission updated successfully')

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to update permission - {str(e)}") from e


@permissions.delete("/", response_model=PermissionResponseModel)
def delete_permission(permission_id: int,
                      db: Session = Depends(get_db),
                      _=Depends(Authorize(permission="permission_delete"))):
    try:
        PermissionController(db=db).delete(permission_id)
        return CustomResponse(success=True,
                              message='Permission deleted successfully')

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to delete permission - {str(e)}") from e


@permissions.delete("/many/", response_model=PermissionResponseModel)
def delete_multiple_permissions(
        permission_ids: list[int],
        db: Session = Depends(get_db),
        _=Depends(Authorize(permission="permission_delete"))):
    try:
        PermissionController(db=db).delete_many(permission_ids)
        return CustomResponse(success=True,
                              message='Permissions deleted successfully')

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f'Failed to delete permissions - {str(e)}') from e

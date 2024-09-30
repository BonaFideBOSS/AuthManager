from typing import Any, Optional

from pydantic import BaseModel

from src.schemas.relation import (
    UserReadWithRelation,
    RoleReadWithRelation,
    PermissionReadWithRelation)


class Pagination(BaseModel):
    """Pagination response structure"""
    total: int = 0
    filtered: int = 0


class CustomResponse(BaseModel):
    """Custom API response structure"""
    success: bool = False
    message: Optional[str] = None
    data: Any = None
    pagination: Optional[Pagination] = None


class UserResponseModel(CustomResponse):
    """Custom response model for user details"""
    data: list[UserReadWithRelation] | UserReadWithRelation | None = None


class RoleResponseModel(CustomResponse):
    """Custom response model for role details"""
    data: list[RoleReadWithRelation] | RoleReadWithRelation | None = None


class PermissionResponseModel(CustomResponse):
    """Custom response model for permission details"""
    data: list[PermissionReadWithRelation] | PermissionReadWithRelation | None = None

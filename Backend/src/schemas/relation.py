from src.schemas.user import UserRead
from src.schemas.role import RoleRead
from src.schemas.permission import PermissionRead


class RoleReadWithRelationPermissions(RoleRead):
    """Role Details With Permissions"""
    permissions: list[PermissionRead]


class UserReadWithRelation(UserRead):
    """User Details With Roles and Permissions"""
    roles: list[RoleReadWithRelationPermissions]


class RoleReadWithRelation(RoleReadWithRelationPermissions):
    """Role Details with Permissions and Users"""
    users: list[UserRead]


class PermissionReadWithRelation(PermissionRead):
    """Permissions Details with Users"""
    roles: list[RoleRead]

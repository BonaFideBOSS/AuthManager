from datetime import datetime
from pydantic import BaseModel


class PermissionBase(BaseModel):
    name: str


class PermissionRead(PermissionBase):
    id: int
    created_at: datetime
    updated_at: datetime


class PermissionCreate(PermissionBase):
    pass


class PermissionUpdate(PermissionBase):
    pass

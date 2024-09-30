from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class RoleBase(BaseModel):
    name: str
    color: Optional[str] = None


class RoleRead(RoleBase):
    id: int
    created_at: datetime
    updated_at: datetime


class RoleEdit(RoleBase):
    permissions: Optional[list[int]] = None


class RoleCreate(RoleEdit):
    pass


class RoleUpdate(RoleEdit):
    pass

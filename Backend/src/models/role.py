from typing import Optional

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models.base import BaseModel


class Role(BaseModel):
    "Roles table model"

    __tablename__ = "roles"

    name: Mapped[str] = mapped_column(String(255), unique=True)
    color: Mapped[Optional[str]] = mapped_column(String(255))
    users = relationship("User",
                         secondary="user_roles",
                         back_populates='roles')
    permissions = relationship("Permission",
                               secondary="role_permissions",
                               back_populates='roles')

from datetime import datetime
from typing import Optional

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models.base import BaseModel
from src.utils.avatar_picker import get_random_avatar


class User(BaseModel):
    "Users table model"

    __tablename__ = "users"

    avatar: Mapped[str] = mapped_column(String(255), default=get_random_avatar)
    username: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255), unique=True)
    password: Mapped[str] = mapped_column(String(255))
    deleted: Mapped[bool] = mapped_column(default=False)
    deleted_at: Mapped[Optional[datetime]]
    last_login_at: Mapped[Optional[datetime]]
    roles = relationship("Role",
                         secondary="user_roles",
                         back_populates='users')

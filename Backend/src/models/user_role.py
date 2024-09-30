from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from src.config.database import Base
from src.models.user import User
from src.models.role import Role


class UserRole(Base):
    "User roles table model"

    __tablename__ = "user_roles"

    user_id: Mapped[int] = mapped_column(ForeignKey(User.id,
                                                    ondelete='CASCADE'),
                                         primary_key=True,)
    role_id: Mapped[int] = mapped_column(ForeignKey(Role.id,
                                                    ondelete='CASCADE'),
                                         primary_key=True,)

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from src.config.database import Base
from src.models.role import Role
from src.models.permission import Permission


class RolePermission(Base):
    "Role permissions table model"

    __tablename__ = "role_permissions"

    role_id: Mapped[int] = mapped_column(ForeignKey(Role.id,
                                                    ondelete='CASCADE'),
                                         primary_key=True)
    permission_id: Mapped[int] = mapped_column(ForeignKey(Permission.id,
                                                          ondelete='CASCADE'),
                                               primary_key=True)

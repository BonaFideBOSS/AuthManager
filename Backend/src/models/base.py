from datetime import datetime

from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped, mapped_column

from src.config.database import Base

func: callable


class BaseModel(Base):
    "Base database model"
    __abstract__ = True

    id: Mapped[int] = mapped_column(primary_key=True,
                                    autoincrement=True,
                                    index=True)
    created_at: Mapped[datetime] = mapped_column(default=func.now(),
                                                 server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(default=func.now(),
                                                 server_default=func.now(),
                                                 onupdate=func.now(),
                                                 server_onupdate=func.now())

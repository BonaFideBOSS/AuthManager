from datetime import datetime, timezone

from sqlalchemy.orm import Session

from src.models.user import User
from src.models.role import Role
from src.models.user_role import UserRole
from src.schemas.user import UserCreate, UserUpdateAdmin
from src.utils.encryption import encrypt
from src.utils.database import (search_filter,
                                sort_filter,
                                multiple_match_relation)


class UserController:
    """Handle user database operations"""

    def __init__(self, db: Session):
        self.db = db

    def read(self,
             user_id: int = None,
             email: str = None,
             exclude_deleted: bool = True):
        """Get a single user"""
        user = self.db.query(User)
        if exclude_deleted:
            user = user.filter(User.deleted.is_(False))
        if user_id:
            user = user.filter(User.id == user_id)
        if email:
            user = user.filter(User.email == email)
        user = user.first()
        if not user:
            raise ValueError("User not found")
        return user

    def is_email_duplicate(self, email: str, user_id: int = None):
        """Check whether email already exists"""
        user = self.db.query(User).filter(User.email == email)
        if user_id:
            user = user.filter(User.id != user_id)
        user = user.first()
        if user:
            return True
        return False

    def read_many(self,
                  query: str = None,
                  exclude_deleted: bool = True,
                  roles: str = None,
                  sort_by: str = "created_at",
                  sort_order: str = "desc",
                  page: int = 1,
                  limit: int = 10):
        """Get all or filtered user(s)"""
        try:
            users = self.db.query(User)
            pagination = {"total": 0, "filtered": 0}
            pagination['total'] = users.count()
            if exclude_deleted:
                users = users.filter(User.deleted.is_(False))
            if query:
                search_cols = ['id', 'username', 'email']
                users = users.filter(search_filter(search=query,
                                                   model=User,
                                                   cols=search_cols))
            if roles:
                users = users.filter(multiple_match_relation(
                    model=User,
                    model_col='roles',
                    relation=Role,
                    match_cols=['name', 'id'],
                    query=roles))
            users = users.order_by(sort_filter(sort_by, sort_order, User))
            pagination['filtered'] = users.count()
            users = users.offset((page - 1) * limit).limit(limit).all()
            return users, pagination

        except Exception as e:
            raise ValueError(str(e)) from e

    def create(self, user: UserCreate):
        """Create a new user"""
        try:
            if self.is_email_duplicate(email=user.email):
                raise ValueError('Email already exists')
            user = User(**user.model_dump())
            user.password = encrypt(user.password)
            self.db.add(user)
            self.db.commit()
            self.db.refresh(user)
            return user
        except Exception as e:
            self.db.rollback()
            raise ValueError(str(e)) from e

    def update(self, user_id: int, new_details: UserUpdateAdmin):
        """Update a user details"""
        try:
            exclude_deleted = True
            delete_user = None
            if hasattr(new_details, 'deleted'):
                exclude_deleted = False
                delete_user = new_details.deleted
            user = self.read(user_id=user_id,
                             exclude_deleted=exclude_deleted)

            if delete_user is not None:
                user.deleted = new_details.deleted

            # Update avatar
            if new_details.avatar:
                user.avatar = new_details.avatar

            # Update username
            if new_details.username:
                user.username = new_details.username

            # Update email
            if new_details.email:
                # Check if email already exists
                if self.is_email_duplicate(email=new_details.email,
                                           user_id=user.id):
                    raise ValueError('Email already exists')
                user.email = new_details.email

            # Update password
            if new_details.password:
                if user.password != new_details.password:
                    # Encrypt new password
                    user.password = encrypt(new_details.password)

            # Update user roles
            if hasattr(new_details, 'roles'):
                # Remove all existing user roles
                user_roles = self.db.query(UserRole).filter(
                    UserRole.user_id == user.id).all()
                for role in user_roles:
                    self.db.delete(role)
                # Add new roles
                for role_id in new_details.roles or []:
                    role = self.db.query(Role).filter(
                        Role.id == role_id).first()
                    if not role:
                        raise ValueError(f"Role with id '{role_id}' not found")
                    user_role = UserRole(user_id=user.id, role_id=role.id)
                    self.db.add(user_role)

            self.db.commit()
            self.db.refresh(user)
            return user

        except Exception as e:
            self.db.rollback()
            raise ValueError(str(e)) from e

    def delete(self, user_id: int):
        """Soft delete a user"""
        try:
            user = self.read(user_id=user_id)
            user.deleted = True
            user.deleted_at = datetime.now(timezone.utc)
            self.db.commit()
            self.db.refresh(user)
            return user

        except Exception as e:
            self.db.rollback()
            raise ValueError(str(e)) from e

    def delete_many(self, user_ids: list[int]):
        """Soft delete multiple users"""
        try:
            users = self.db.query(User).filter(User.id.in_(user_ids),
                                               User.deleted.is_(False)).all()
            for user in users:
                user.deleted = True
                user.deleted_at = datetime.now(timezone.utc)
            self.db.commit()
            return users
        except Exception as e:
            self.db.rollback()
            raise ValueError(str(e)) from e

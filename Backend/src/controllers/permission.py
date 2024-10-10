from sqlalchemy.orm import Session

from src.models.permission import Permission
from src.models.role import Role
from src.schemas.permission import PermissionCreate, PermissionUpdate
from src.utils.database import (search_filter,
                                sort_filter,
                                multiple_match,
                                multiple_match_relation)


class PermissionController:
    """Handle database operations for the permissions tables"""

    def __init__(self, db: Session):
        self.db = db

    def read(self, permission_id: int):
        """Get a single permission from the database"""
        permission = self.db.query(Permission).filter(
            Permission.id == permission_id).first()
        if not permission:
            raise ValueError('Permission not found')
        return permission

    def is_permission_duplicate(self,
                                permission_name: str,
                                permission_id: int = None):
        """Raise error is permission is duplicate"""
        permission = self.db.query(Permission).filter(
            Permission.name == permission_name)
        if permission_id:
            permission = permission.filter(Permission.id != permission_id)
        permission = permission.first()
        if permission:
            return True
        return False

    def read_many(self,
                  query: str = None,
                  roles: str = None,
                  perms: str = None,
                  sort_by: str = "created_at",
                  sort_order: str = "desc",
                  page: int = 1,
                  limit: int = 10):
        """Get all or filtered permission(s)"""
        try:
            data = self.db.query(Permission)
            pagination = {"total": 0, "filtered": 0}
            pagination['total'] = data.count()
            search_cols = ['id', 'name']
            if query:
                data = data.filter(search_filter(search=query,
                                                 model=Permission,
                                                 cols=search_cols))
            if roles:
                data = data.filter(multiple_match_relation(
                    model=Permission,
                    model_col='roles',
                    relation=Role,
                    match_cols=search_cols,
                    query=roles))
            if perms:
                data = data.filter(multiple_match(model=Permission,
                                                  match_cols=search_cols,
                                                  query=perms))
            data = data.order_by(sort_filter(sort_by, sort_order, Permission))
            pagination['filtered'] = data.count()
            data = data.offset((page - 1) * limit).limit(limit).all()
            return data, pagination

        except Exception as e:
            raise ValueError(str(e)) from e

    def create(self, permission: PermissionCreate):
        """Create a new permission"""
        try:
            if self.is_permission_duplicate(permission_name=permission.name):
                raise ValueError('Permission already exists')
            permission = Permission(**permission.model_dump())
            self.db.add(permission)
            self.db.commit()
            self.db.refresh(permission)
            return permission

        except Exception as e:
            self.db.rollback()
            raise ValueError(str(e)) from e

    def update(self,
               permission_id: int,
               new_details: PermissionUpdate):
        """Update a permission details"""
        try:
            permission = self.read(permission_id=permission_id)

            if self.is_permission_duplicate(permission_name=new_details.name,
                                            permission_id=permission.id):
                raise ValueError('Permission already exists')

            permission.name = new_details.name
            self.db.commit()
            self.db.refresh(permission)
            return permission

        except Exception as e:
            self.db.rollback()
            raise ValueError(str(e)) from e

    def delete(self, permission_id: int):
        """Permanently delete a permission"""
        try:
            permission = self.read(permission_id=permission_id)
            self.db.delete(permission)
            self.db.commit()
            return True

        except Exception as e:
            self.db.rollback()
            raise ValueError(str(e)) from e

    def delete_many(self, permission_ids: list[int]):
        """delete multiple permissions"""
        try:
            permissions = self.db.query(Permission).filter(
                Permission.id.in_(permission_ids)).all()
            for permission in permissions:
                self.db.delete(permission)
            self.db.commit()
            return True
        except Exception as e:
            self.db.rollback()
            raise ValueError(str(e)) from e

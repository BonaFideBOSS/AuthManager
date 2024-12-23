from datetime import datetime, timezone

from sqlalchemy.orm import Session

from src.models.role import Role
from src.models.permission import Permission
from src.models.role_permission import RolePermission
from src.schemas.role import RoleCreate, RoleUpdate
from src.utils.database import (search_filter,
                                sort_filter,
                                multiple_match,
                                multiple_match_relation)


class RoleController:
    """Handle database operations for the roles tables"""

    def __init__(self, db: Session):
        self.db = db

    def read(self, role_id: int):
        """Get a role by id"""
        role = self.db.query(Role).filter(Role.id == role_id).first()
        if not role:
            raise ValueError('Role not found')
        return role

    def is_role_duplicate(self, role_name: str, role_id: int = None):
        """Check if role with name exists"""
        role = self.db.query(Role).filter(Role.name == role_name)
        if role_id:
            role = role.filter(Role.id != role_id)
        role = role.first()
        if role:
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
        """Get all or filtered role(s)"""
        try:
            data = self.db.query(Role)
            pagination = {"total": 0, "filtered": 0}
            pagination['total'] = data.count()
            search_cols = ['id', 'name']
            if query:
                data = data.filter(search_filter(search=query,
                                                 model=Role,
                                                 cols=search_cols))
            if roles:
                data = data.filter(multiple_match(model=Role,
                                                  match_cols=search_cols,
                                                  query=roles))
            if perms:
                data = data.filter(multiple_match_relation(
                    model=Role,
                    model_col='permissions',
                    relation=Permission,
                    match_cols=search_cols,
                    query=perms))
            data = data.order_by(sort_filter(sort_by, sort_order, Role))
            pagination['filtered'] = data.count()
            data = data.offset((page - 1) * limit).limit(limit).all()
            return data, pagination

        except Exception as e:
            raise ValueError(str(e)) from e

    def update_role_permissions(self, role: Role, permission_ids):
        """Update role permissions"""
        # Remove all existing role permissions
        role_perms = self.db.query(RolePermission).filter(
            RolePermission.role_id == role.id).all()
        for perm in role_perms:
            self.db.delete(perm)

        # Add new permissions
        for perm_id in permission_ids or []:
            perm = self.db.query(Permission).filter(
                Permission.id == perm_id).first()
            if not perm:
                raise ValueError(f"Permission with id '{perm_id}' not found")
            role_perm = RolePermission(permission_id=perm.id,
                                       role_id=role.id)
            self.db.add(role_perm)

    def create(self, new_role: RoleCreate):
        """Create a new role"""
        try:
            if self.is_role_duplicate(role_name=new_role.name):
                raise ValueError('Role already exists')

            perms = None
            if hasattr(new_role, 'permissions'):
                perms = new_role.permissions
                del new_role.permissions
            role = Role(**new_role.model_dump())
            self.db.add(role)
            self.db.flush()
            self.update_role_permissions(role, perms)
            self.db.commit()
            self.db.refresh(role)
            return role

        except Exception as e:
            self.db.rollback()
            raise ValueError(str(e)) from e

    def update(self, role_id: int, new_details: RoleUpdate):
        """Update a role details"""
        try:
            role = self.read(role_id=role_id)
            if self.is_role_duplicate(role_name=new_details.name,
                                      role_id=role.id):
                raise ValueError('Role already exists')
            role.name = new_details.name
            if hasattr(new_details, 'color'):
                role.color = new_details.color
            if hasattr(new_details, 'permissions'):
                self.update_role_permissions(role, new_details.permissions)
                role.updated_at = datetime.now(timezone.utc)
            self.db.commit()
            self.db.refresh(role)
            return role

        except Exception as e:
            self.db.rollback()
            raise ValueError(str(e)) from e

    def delete(self, role_id: int):
        """Permanently delete a role"""
        try:
            role = self.read(role_id=role_id)
            self.db.delete(role)
            self.db.commit()
            return role
        except Exception as e:
            self.db.rollback()
            raise ValueError(str(e)) from e

    def delete_many(self, role_ids: list[int]):
        """delete multiple roles"""
        try:
            roles = self.db.query(Role).filter(Role.id.in_(role_ids)).all()
            for role in roles:
                self.db.delete(role)
            self.db.commit()
            return roles
        except Exception as e:
            self.db.rollback()
            raise ValueError(str(e)) from e

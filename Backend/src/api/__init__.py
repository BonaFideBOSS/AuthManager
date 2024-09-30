from fastapi import APIRouter

from src.api.auth import auth
from src.api.account import account
from src.api.users import users
from src.api.role import roles
from src.api.permission import permissions
from src.api.avatar import avatar
from src.api.misc import misc

routes = APIRouter(prefix="/api")

routes.include_router(auth, tags=['Auth'])
routes.include_router(account, prefix="/account", tags=['Account'])
routes.include_router(users, prefix="/users", tags=['User Manager'])
routes.include_router(roles, prefix="/roles", tags=['Role Manager'])
routes.include_router(permissions,
                      prefix="/permissions",
                      tags=['Permission Manager'])
routes.include_router(avatar, prefix="/avatar", tags=['Avatar'])
routes.include_router(misc, prefix="/misc", tags=['Misc'])

tags_metadata = [
    {
        "name": "Auth",
        "description": "APIs for user account creation and login"
    },
    {
        "name": "Account",
        "description": "APIs for users to manage their account"
    },
    {
        "name": "User Manager",
        "description": "APIs to manage users"
    },
    {
        "name": "Role Manager",
        "description": "APIs to manage roles"
    },
    {
        "name": "Permission Manager",
        "description": "APIs to manage permissions"
    }
]

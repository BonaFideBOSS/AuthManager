from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from src.config.database import get_db
from src.models.user import User
from src.models.role import Role
from src.models.permission import Permission
from src.controllers.auth import AuthController
from src.schemas.custom_response import CustomResponse

auth_controller = AuthController()
misc = APIRouter(dependencies=[Depends(auth_controller.get_current_user)])


@misc.get('/db-count/', response_model=CustomResponse)
def get_db_records_count(db: Session = Depends(get_db)):
    """API to get count of items in the database"""
    try:
        data = [
            {"table": "users", "count": db.query(User).count()},
            {"table": "roles", "count": db.query(Role).count()},
            {"table": "permissions", "count": db.query(Permission).count()}
        ]
        return CustomResponse(success=True, data=data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) from e

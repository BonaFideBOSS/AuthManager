from src import app
# from src.config.database import session
# from sqlalchemy import text
# from sqlalchemy.orm import Session
# from src.models.user import User
# from src.models.role import Role
# from src.models.permission import Permission

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app="__main__:app", reload=True)

# try:
#     db: Session = session()
#     perms = ["user_read",
#              "user_update",
#              "user_delete",
#              "role_create",
#              "role_read",
#              "role_update",
#              "role_delete",
#              "permission_create",
#              "permission_read",
#              "permission_update",
#              "permission_delete",
#              ]
#     records = []
#     for perm in perms:
#         records.append(Permission(name=perm))
#     db.add_all(records)
#     db.add(Role(name='superadmin'))
#     db.commit()
#     print(db.query(Permission).count())
# except Exception as e:
#     print(e)
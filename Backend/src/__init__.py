from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html


from src.config.settings import Settings
from src.config.database import init_db
from src.middlewares.logger import Logger
from src.middlewares.exceptions import handle_exceptions
from src.api import routes, tags_metadata


settings = Settings()


@asynccontextmanager
async def lifespan(_: FastAPI):
    """Connect to the database before the application starts up"""
    init_db()
    print('Successfully connected to the database!')
    yield

app = FastAPI(title=settings.TITLE,
              description="The Amazing Auth Management Service",
              lifespan=lifespan,
              openapi_tags=tags_metadata,
              docs_url=None,
              redoc_url=None,
              openapi_url="/api/openapi.json")

app.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"],)
app.add_middleware(Logger)
handle_exceptions(app=app)


@app.get("/api", include_in_schema=False)
async def api_docs(req: Request):
    """Custom API Documentation"""

    root_path = req.scope.get("root_path", "").rstrip("/")
    openapi_url = root_path + app.openapi_url
    oauth2_redirect_url = app.swagger_ui_oauth2_redirect_url
    if oauth2_redirect_url:
        oauth2_redirect_url = root_path + oauth2_redirect_url
    return get_swagger_ui_html(
        openapi_url=openapi_url,
        title=f"{app.title} - API Documentation",
        oauth2_redirect_url=oauth2_redirect_url,
        init_oauth=app.swagger_ui_init_oauth,
        swagger_favicon_url="/api/static/favicon.ico",
        swagger_ui_parameters=app.swagger_ui_parameters,
    )

app.include_router(routes)

app.mount("/api/static", StaticFiles(directory="src/static"), name="static")
app.mount("/", StaticFiles(directory="src/views", html=True), name="views")

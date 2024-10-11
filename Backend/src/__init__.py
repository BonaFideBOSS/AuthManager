from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware


from src.config.settings import Settings
from src.config.database import init_db
from src.middlewares.logger import Logger
from src.middlewares.exceptions import handle_exceptions
from src.api import routes, tags_metadata


settings = Settings()
init_db()

app = FastAPI(title=settings.TITLE,
              description="The Amazing Auth Management Service",
              openapi_tags=tags_metadata,
              docs_url='/api')

app.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"],)
app.add_middleware(Logger)
handle_exceptions(app=app)

app.include_router(routes)
app.mount("/api/static", StaticFiles(directory="src/static"), name="static")
app.mount("/", StaticFiles(directory="src/views", html=True), name="views")

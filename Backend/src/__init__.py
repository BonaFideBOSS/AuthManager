import time

from fastapi import FastAPI, Request, Response
from fastapi.staticfiles import StaticFiles
from fastapi.exceptions import (RequestValidationError,
                                ResponseValidationError,
                                HTTPException)
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.background import BackgroundTask

from src.config.settings import Settings
from src.config.database import init_db
# from src.config.logger import log
from src.api import routes, tags_metadata
from src.schemas.custom_response import CustomResponse


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

app.include_router(routes)
app.mount("/api/static", StaticFiles(directory="src/static"), name="static")
app.mount("/", StaticFiles(directory="src/views", html=True), name="views")


@app.exception_handler(RequestValidationError)
async def req_validation_exception_handler(_, e: RequestValidationError):
    """Handling request data validation errors"""
    try:
        print(e)
        if len(e.errors()[0]["loc"]) > 1:
            msg = e.errors()[0]["msg"].split(' ')
            msg.pop(0)
            e = f'{e.errors()[0]["loc"][1]} {" ".join(msg)}'
        e = e.errors()[0]["msg"]
    finally:
        raise HTTPException(status_code=400,
                            detail=f"Validation error - {str(e)}")


@app.exception_handler(ResponseValidationError)
async def res_validation_exception_handler(_, e: ResponseValidationError):
    """Handling response data validation errors"""
    raise HTTPException(status_code=500,
                        detail="Failed to send a valid response")


@app.exception_handler(HTTPException)
async def http_exception_handler(_, e: HTTPException):
    """Handling response for http exceptions"""
    content = CustomResponse(message=e.detail)
    return JSONResponse(status_code=e.status_code,
                        content=content.model_dump())


# @app.middleware('http')
# async def logger(request: Request, call_next):
#    """Middleware to log http requests and responses"""
#    start_time = time.time()
#    request_body = await request.body()
#    response = await call_next(request)
#    response_body = b""
#    async for chunk in response.body_iterator:
#        response_body += chunk
#    process_time = time.time()-start_time
#    log_task = BackgroundTask(
#        log, request, request_body, response, response_body, process_time)
#    return Response(content=response_body,
#                    status_code=response.status_code,
#                    headers=dict(response.headers),
#                    media_type=response.media_type,
#                    background=log_task)

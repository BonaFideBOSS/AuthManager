from fastapi import FastAPI
from fastapi.exceptions import (RequestValidationError,
                                ResponseValidationError,
                                HTTPException)
from fastapi.responses import JSONResponse

from src.schemas.custom_response import CustomResponse


def handle_exceptions(app: FastAPI):
    """HTTP exception handlers"""

    @app.exception_handler(HTTPException)
    async def http_exception_handler(_, e: HTTPException):
        """Handling response for http exceptions"""
        content = CustomResponse(message=e.detail)
        return JSONResponse(status_code=e.status_code,
                            content=content.model_dump())

    @app.exception_handler(RequestValidationError)
    async def req_validation_exception_handler(_, e: RequestValidationError):
        """Handling request data validation errors"""
        try:
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

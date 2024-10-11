import time

from fastapi import Request, Response
from starlette.middleware.base import (BaseHTTPMiddleware,
                                       RequestResponseEndpoint)
from starlette.background import BackgroundTask

from src.config.logger import log


class Logger(BaseHTTPMiddleware):
    """HTTP Middleware"""

    async def dispatch(self,
                       request: Request,
                       call_next: RequestResponseEndpoint):
        """Get and pase request and response and their bodies"""

        start_time = time.time()
        request_body = await request.body()
        response = await call_next(request)
        response_body = b""
        async for chunk in response.body_iterator:
            response_body += chunk
        process_time = time.time()-start_time
        log_task = BackgroundTask(
            log, request, request_body, response, response_body, process_time)
        return Response(content=response_body,
                        status_code=response.status_code,
                        headers=dict(response.headers),
                        media_type=response.media_type,
                        background=log_task)

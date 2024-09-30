import sys
import json
import logging

from fastapi import Request, Response

from src.config.settings import Settings

settings = Settings()
LOG_FILE_PATH = settings.LOG_FILE_PATH


def get_file_handler(formatter, log_filename):
    """Log file handler"""
    file_handler = logging.FileHandler(log_filename)
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(formatter)
    return file_handler


def get_stream_handler(formatter):
    """Streaming data handler"""
    stream_handler = logging.StreamHandler(sys.stdout)
    stream_handler.setLevel(logging.DEBUG)
    stream_handler.setFormatter(formatter)
    return stream_handler


def get_logger(name, formatter, log_filename=LOG_FILE_PATH):
    """Return custom logger"""
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)
    logger.addHandler(get_file_handler(formatter, log_filename))
    logger.addHandler(get_stream_handler(formatter))
    return logger


def create_log(record):
    """Log structure"""
    return {
        'timestamp': record.asctime,
        'message': record.message,
        "process_time": record.extra_info['process_time'],
        'request': record.extra_info['request'],
        'response': record.extra_info['response']
    }


def convert_bytes_to_json(obj):
    """Bytes to json converter"""
    obj = obj.decode("utf-8")
    try:
        return json.loads(obj)
    except json.JSONDecodeError:
        return obj


def create_request_log(request: Request, request_body):
    """Request log structure"""
    return {
        'url': request.url.path,
        'method': request.method,
        "query": dict(request.query_params),
        "params": dict(request.path_params),
        'body': convert_bytes_to_json(request_body)
    }


def create_response_log(respose: Response, response_body):
    """Response log structure"""
    return {
        "status": respose.status_code,
        "body": convert_bytes_to_json(response_body)
    }


class CustomFormatter(logging.Formatter):
    """Custom Logger Formatter"""

    def __init__(self, formatter):
        logging.Formatter.__init__(self, formatter)

    def format(self, record):
        logging.Formatter.format(self, record)
        return json.dumps(create_log(record), indent=2)


logger = get_logger(__name__, CustomFormatter('%(asctime)s'))


def log(request, request_body, response, response_body, process_time):
    """Logger"""
    if not request.url.path.startswith('/api'):
        return
    if request.url.path in ["/api", "/openapi.json"]:
        response_body = b""
    info = {
        "process_time": process_time,
        "request": create_request_log(request, request_body),
        "response": create_response_log(response, response_body)
    }
    msg = f"{request.method} {request.url.path}"
    logger.info(msg=msg, extra={'extra_info': info})

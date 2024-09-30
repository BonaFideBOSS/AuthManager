import secrets

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings"""

    TITLE: str = "Auth Manager"
    DB_URL: str = "sqlite:///./dev.db"
    SECRET_KEY: str = "1234567890"
    AUTH_ALGORITHM: str = "HS256"
    AUTH_TOKEN_DURATION: int = 30
    LOG_FILE_PATH: str = "src/logs/logs.log"

    model_config = SettingsConfigDict(env_file=".env")

    def generate_secret_key(self, length=64):
        """Generate a new secret key"""
        return secrets.token_urlsafe(length)

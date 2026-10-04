from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    """
    Application settings for StudyForge AI Microservice.
    Loads configurations from environment variables or .env file.
    """
    PROJECT_NAME: str = "StudyForge AI Service"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/internal/v1"

    # Server binding
    AI_SERVICE_HOST: str = "0.0.0.0"
    AI_SERVICE_PORT: int = 8000

    # PostgreSQL + pgvector connection string (asyncpg format)
    DATABASE_URL: Optional[str] = "postgresql://studyforge_user:studyforge_password@localhost:5432/studyforge"

    # Internal shared secret for Spring Boot <-> FastAPI authentication
    INTERNAL_SERVICE_KEY: str = "studyforge_internal_dev_secret_key_change_in_production"

    # Google Gemini AI settings
    GEMINI_API_KEY: Optional[str] = None
    GEMINI_LLM_MODEL: str = "gemini-3.8-flash"
    # Note: Gemini Embedding 2 defaults to 3072 dimensions; StudyForge explicitly selects the supported 768-dimensional output to optimize vector storage and compute
    GEMINI_EMBEDDING_MODEL: str = "gemini-embedding-2"
    EMBEDDING_DIMENSION: int = 768

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()

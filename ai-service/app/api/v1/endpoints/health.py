from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()


@router.get("/health", summary="Health check probe")
async def health_check():
    """
    Returns service health status and configured model metadata.
    """
    return {
        "status": "UP",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "configured_llm_model": settings.GEMINI_LLM_MODEL,
        "configured_embedding_model": settings.GEMINI_EMBEDDING_MODEL,
        "embedding_dimension": settings.EMBEDDING_DIMENSION,
        "gemini_api_key_configured": bool(settings.GEMINI_API_KEY)
    }

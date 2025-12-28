"""
Health Check Endpoint
"""
from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "syncrade-api",
        "version": "1.0.0",
    }


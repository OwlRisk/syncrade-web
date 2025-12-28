"""
FastAPI Application Entry Point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes import query, render, replay, health

app = FastAPI(
    title="Syncrade API v1",
    version="1.0.0",
    description="Market Intelligence System API - Judgment Object Engine",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

# Routes
app.include_router(query.router, prefix="/v1", tags=["query"])
app.include_router(render.router, prefix="/v1", tags=["render"])
app.include_router(replay.router, prefix="/v1", tags=["replay"])
app.include_router(health.router, tags=["health"])


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "service": "Syncrade API v1",
        "version": "1.0.0",
        "status": "operational",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.api_host, port=settings.api_port)


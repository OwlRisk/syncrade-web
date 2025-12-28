"""
Configuration (Pydantic Settings)
"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Server
    api_port: int = 8000
    api_host: str = "0.0.0.0"
    frontend_url: str = "http://localhost:5173"  # Vite default
    
    # Data Sources
    ethereum_rpc_url: Optional[str] = None
    base_rpc_url: Optional[str] = None
    price_api_key: Optional[str] = None
    
    # Morpheus API
    morpheus_api_url: Optional[str] = None
    morpheus_api_key: Optional[str] = None
    
    # LLM
    openai_api_key: Optional[str] = None
    anthropic_api_key: Optional[str] = None
    
    # LLM Model Selection (per role)
    llm_model_primary_reasoner: str = "gpt-4-turbo-preview"
    llm_model_low_cost_renderer: str = "gpt-3.5-turbo"
    llm_model_nano_router: str = "gpt-3.5-turbo"
    
    # Token Limits (per model role)
    llm_max_tokens_primary_reasoner: int = 4000
    llm_max_tokens_low_cost_renderer: int = 2000
    llm_max_tokens_nano_router: int = 500
    
    # LLM Settings
    llm_temperature: float = 0.0  # Deterministic
    
    # Resource Limits
    max_tool_calls_per_request: int = 8
    max_window_span_days: int = 180
    max_returned_objects: int = 25
    
    # Storage (optional)
    database_url: Optional[str] = None
    redis_url: Optional[str] = None
    
    # Observability
    log_level: str = "info"
    trace_enabled: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()


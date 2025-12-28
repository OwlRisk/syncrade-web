# Python Backend Structure v1

**Status: Frozen (Engineering Boundary)**

This document defines the recommended Python backend structure for implementing Syncrade API v1.

⸻

## 1. Project Structure

```
syncrade-api/
  app/
    __init__.py
    main.py                    # FastAPI app entry point
    config.py                  # Settings (Pydantic)
    routes/
      __init__.py
      query.py                 # POST /query
      render.py                # POST /render
      replay.py                # GET /replay/:replay_key
      health.py                 # GET /health
    services/
      __init__.py
      intent_parser.py         # LLM intent parsing → QueryIntent
      pipeline.py              # Deterministic pipeline (Observation → Inference → Judgment)
      renderer.py              # LLM rendering → RenderBlocks
      data_source.py           # Onchain/market data fetching
    validators/
      __init__.py
      io_validator.py          # Intelligence Object validation (using schemas/)
      failure_validator.py    # Failure Object validation
      query_intent_validator.py
      render_blocks_validator.py
    utils/
      __init__.py
      replay.py                # Replay hash generation (canonical)
      evidence.py              # Evidence normalization/hashing
      subject.py               # Subject normalization
    models/
      __init__.py
      intelligence_object.py   # Pydantic models matching schemas/
      failure_object.py
      query_intent.py
      render_blocks.py
  tests/
    __init__.py
    test_validators.py
    test_replay.py
    test_pipeline.py
  schemas/                     # Symlink or copy from main repo
    intelligence-object-v1.schema.json
    failure-object-v1.schema.json
    query-intent-v1.schema.json
    render-blocks-v1.schema.json
  fixtures/                    # Symlink or copy from main repo
    v1/
      case-01.json
  requirements.txt
  Dockerfile
  .env.example
  README.md
```

⸻

## 2. Main Application (FastAPI)

**`app/main.py`:**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes import query, render, replay, health

app = FastAPI(
    title="Syncrade API v1",
    version="1.0.0",
    description="Market Intelligence System API",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

# Routes
app.include_router(query.router, prefix="/v1", tags=["query"])
app.include_router(render.router, prefix="/v1", tags=["render"])
app.include_router(replay.router, prefix="/v1", tags=["replay"])
app.include_router(health.router, tags=["health"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.api_port)
```

⸻

## 3. Configuration (Pydantic Settings)

**`app/config.py`:**
```python
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Server
    api_port: int = 8000
    api_host: str = "0.0.0.0"
    frontend_url: str = "https://your-domain.com"
    
    # Data Sources
    ethereum_rpc_url: str
    base_rpc_url: str
    price_api_key: str
    
    # LLM
    llm_api_key: str
    llm_model: str = "gpt-4-turbo-preview"
    llm_max_tokens: int = 2000
    llm_temperature: float = 0.0
    
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
```

⸻

## 4. Query Route (POST /query)

**`app/routes/query.py`:**
```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.intent_parser import parse_intent
from app.services.pipeline import run_pipeline
from app.validators.io_validator import validate_intelligence_object
from app.utils.replay import generate_replay_hash

router = APIRouter()

class QueryRequest(BaseModel):
    user_input: str

class QueryResponse(BaseModel):
    trace_id: str
    objects: list  # IntelligenceObjectV1[]
    failures: list = []  # FailureObjectV1[]

@router.post("/query")
async def query(request: QueryRequest):
    # 1. Parse intent (LLM)
    intent = await parse_intent(request.user_input)
    
    # 2. Run deterministic pipeline
    objects = await run_pipeline(intent)
    
    # 3. Validate all objects
    validated_objects = []
    for obj in objects:
        if validate_intelligence_object(obj):
            validated_objects.append(obj)
        else:
            # Return failure object
            pass
    
    # 4. Generate trace_id
    trace_id = generate_trace_id()
    
    return QueryResponse(
        trace_id=trace_id,
        objects=validated_objects,
    )
```

⸻

## 5. Validators (Schema-Based)

**`app/validators/io_validator.py`:**
```python
import json
import jsonschema
from pathlib import Path

SCHEMA_PATH = Path(__file__).parent.parent.parent / "schemas" / "intelligence-object-v1.schema.json"

def validate_intelligence_object(obj: dict) -> bool:
    """Validate against JSON Schema."""
    with open(SCHEMA_PATH) as f:
        schema = json.load(f)
    
    try:
        jsonschema.validate(instance=obj, schema=schema)
        return True
    except jsonschema.ValidationError:
        return False
```

⸻

## 6. Replay Hash Generation (Canonical)

**`app/utils/replay.py`:**
```python
import hashlib
import json
from typing import Dict, Any

def canonical_json(obj: Dict[str, Any]) -> str:
    """Generate canonical JSON string."""
    return json.dumps(
        obj,
        sort_keys=True,
        separators=(',', ':'),
        ensure_ascii=False
    )

def generate_replay_hash(replay_inputs: Dict[str, Any]) -> str:
    """Generate SHA256 hash of canonical replay inputs."""
    canonical = canonical_json(replay_inputs)
    return hashlib.sha256(canonical.encode('utf-8')).hexdigest()
```

⸻

## 7. Requirements

**`requirements.txt`:**
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
pydantic-settings==2.1.0
httpx==0.25.2
openai==1.3.0
python-dotenv==1.0.0
jsonschema==4.20.0
web3==6.11.3  # for Ethereum/Base RPC
redis==5.0.1  # if using Redis
asyncpg==0.29.0  # if using PostgreSQL
sqlalchemy==2.0.23  # if using database ORM
```

⸻

## 8. Testing

**Example test:**
```python
# tests/test_replay.py
import pytest
from app.utils.replay import generate_replay_hash

def test_replay_hash_consistency():
    inputs = {
        "subject_norm": {"type": "wallet", "address": "0x123"},
        "window": {"start": "2026-01-01T00:00:00Z", "end": "2026-01-08T00:00:00Z"},
        "pipeline_version": "v1.0.0",
        "dataset_snapshot": "onchain:base:20500000-20501000:2026-01-03T02:00:00Z",
    }
    
    hash1 = generate_replay_hash(inputs)
    hash2 = generate_replay_hash(inputs)
    
    assert hash1 == hash2  # Must be deterministic
```

⸻

## 9. Key Implementation Notes

**Deterministic modules (no LLM):**
- `services/pipeline.py` - Must be fully deterministic
- `utils/replay.py` - Must match canonical algorithm
- `utils/evidence.py` - Must match normalization rules

**LLM-allowed modules:**
- `services/intent_parser.py` - Outputs QueryIntent JSON only
- `services/renderer.py` - Outputs RenderBlocks JSON only

**Validation gates:**
- All Intelligence Objects must pass `io_validator`
- All LLM outputs must pass schema validation
- See `docs/slo-quality-gates-v1.md`


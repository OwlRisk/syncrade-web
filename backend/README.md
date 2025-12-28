# Syncrade Backend API v1

Python + FastAPI backend for Syncrade Judgment Object Engine.

⸻

## Quick Start

### 1. Setup Python Environment

```bash
# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your API keys
# Required: OPENAI_API_KEY (at minimum)
```

### 3. Run Development Server

```bash
# Run with uvicorn
uvicorn app.main:app --reload

# Or use Python directly
python -m app.main
```

API will be available at: `http://localhost:8000`

- API Docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

⸻

## Project Structure

```
backend/
  ├── app/
  │   ├── main.py              # FastAPI app entry point
  │   ├── config.py            # Settings (Pydantic)
  │   ├── routes/              # API endpoints
  │   │   ├── query.py         # POST /v1/query
  │   │   ├── render.py        # POST /v1/render
  │   │   ├── replay.py        # GET /v1/replay/:replay_key
  │   │   └── health.py        # GET /health
  │   ├── services/            # Business logic
  │   │   ├── intent_parser.py # LLM intent parsing
  │   │   ├── pipeline.py      # Deterministic pipeline
  │   │   ├── renderer.py      # LLM rendering
  │   │   └── data_source.py   # Data fetching
  │   ├── validators/          # Schema validation
  │   │   ├── io_validator.py
  │   │   ├── failure_validator.py
  │   │   ├── query_intent_validator.py
  │   │   └── render_blocks_validator.py
  │   ├── utils/               # Utilities
  │   │   ├── replay.py        # Replay hash generation
  │   │   ├── evidence.py      # Evidence normalization
  │   │   └── subject.py        # Subject normalization
  │   └── models/              # Pydantic models
  │       ├── intelligence_object.py
  │       ├── failure_object.py
  │       ├── query_intent.py
  │       └── render_blocks.py
  ├── tests/                   # Tests
  │   ├── test_validators.py
  │   ├── test_replay.py
  │   └── test_pipeline.py
  ├── requirements.txt
  ├── .env.example
  └── README.md
```

⸻

## Key Principles

### 1. Schema Validation (SSOT)

All outputs must validate against schemas in `../schemas/`:
- `intelligence-object-v1.schema.json`
- `failure-object-v1.schema.json`
- `query-intent-v1.schema.json`
- `render-blocks-v1.schema.json`

### 2. Deterministic Pipeline

- `services/pipeline.py` must be fully deterministic
- No LLM in pipeline (only in intent parsing and rendering)
- Replay hash must be consistent

### 3. LLM Boundaries

LLM is only allowed in:
- `services/intent_parser.py` → QueryIntent JSON
- `services/renderer.py` → RenderBlocks JSON

LLM is NOT allowed in:
- Observation aggregation
- Behavior modeling
- Inference logic
- Judgment generation

⸻

## Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test
pytest tests/test_replay.py
```

⸻

## Development Status

**Current Status:** Foundation Complete

✅ Project structure created
✅ Validators implemented (using schemas/)
✅ Replay hash generation (canonical)
✅ API routes skeleton (query, render, replay, health)
✅ Configuration (Pydantic settings)

**TODO:**
- [ ] Implement intent parser (LLM)
- [ ] Implement deterministic pipeline
- [ ] Implement renderer (LLM)
- [ ] Implement data source integration
- [ ] Add caching layer
- [ ] Add observability (logging, tracing)

⸻

## API Endpoints

### POST /v1/query
Main query endpoint. Accepts user input, returns Intelligence Objects.

### POST /v1/render
Renders Intelligence Objects into UI blocks.

### GET /v1/replay/:replay_key
Replays a judgment by replay_key (must be byte-identical).

### GET /health
Health check endpoint.

⸻

## See Also

- `../docs/` - Frozen specifications
- `../schemas/` - JSON Schemas (SSOT)
- `../fixtures/` - Golden test fixtures


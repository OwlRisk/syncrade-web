# Syncrade Project Structure

**Monorepo:** Frontend (React/Vite) + Backend (Python/FastAPI)

⸻

## Directory Structure

```
syncrade-web/
├── frontend/                    # React + Vite Frontend
│   ├── src/                     # Source code
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/                  # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/                      # Python + FastAPI Backend
│   ├── app/                     # Application code
│   │   ├── main.py              # FastAPI entry point
│   │   ├── config.py            # Settings (Pydantic)
│   │   ├── routes/              # API endpoints
│   │   │   ├── query.py         # POST /v1/query
│   │   │   ├── render.py        # POST /v1/render
│   │   │   ├── replay.py        # GET /v1/replay/:replay_key
│   │   │   └── health.py        # GET /health
│   │   ├── services/            # Business logic
│   │   │   ├── intent_parser.py # LLM intent parsing
│   │   │   ├── pipeline.py      # Deterministic pipeline
│   │   │   ├── renderer.py      # LLM rendering
│   │   │   └── data_source.py   # Data fetching
│   │   ├── validators/          # Schema validation
│   │   │   ├── io_validator.py
│   │   │   ├── failure_validator.py
│   │   │   ├── query_intent_validator.py
│   │   │   └── render_blocks_validator.py
│   │   ├── utils/              # Utilities
│   │   │   ├── replay.py        # Replay hash generation
│   │   │   ├── evidence.py      # Evidence normalization
│   │   │   └── subject.py       # Subject normalization
│   │   └── models/              # Pydantic models
│   │       ├── intelligence_object.py
│   │       ├── failure_object.py
│   │       ├── query_intent.py
│   │       └── render_blocks.py
│   ├── tests/                   # Tests
│   │   ├── test_validators.py
│   │   ├── test_replay.py
│   │   └── test_pipeline.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .env.example
│   └── README.md
│
├── schemas/                     # Shared JSON Schemas (SSOT)
│   ├── intelligence-object-v1.schema.json
│   ├── failure-object-v1.schema.json
│   ├── query-intent-v1.schema.json
│   └── render-blocks-v1.schema.json
│
├── fixtures/                    # Shared Golden Fixtures (SSOT)
│   └── v1/
│       └── case-01.json
│
├── docs/                        # Frozen Specifications (SSOT)
│   ├── *.md                     # All frozen specs
│   └── terminology.json
│
├── docker-compose.yml           # Local development
├── README.md                    # Main documentation
└── .gitignore
```

⸻

## Key Principles

### 1. Single Source of Truth (SSOT)

- **Schemas:** `schemas/*.schema.json` - Used by both frontend and backend
- **Fixtures:** `fixtures/v1/*.json` - Shared test cases
- **Specs:** `docs/*.md` - Frozen specifications

### 2. Monorepo Benefits

- Atomic commits (schema + validator + frontend types together)
- Shared SSOT assets prevent drift
- Single CI/CD pipeline
- Easier development workflow

### 3. Technology Stack

- **Frontend:** React 19 + Vite 7
- **Backend:** Python 3.11+ + FastAPI
- **Validation:** jsonschema (Python), JSON Schema (shared)
- **LLM:** OpenAI / Anthropic (via SDKs)

⸻

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your API keys
uvicorn app.main:app --reload
```

### Docker Compose
```bash
docker-compose up
```

⸻

## Development Status

**✅ Completed:**
- Project structure (monorepo)
- Backend skeleton (FastAPI + validators)
- Frontend structure (React + Vite)
- Shared schemas and fixtures
- Docker setup

**🚧 TODO:**
- Implement intent parser (LLM)
- Implement deterministic pipeline
- Implement renderer (LLM)
- Data source integration
- Frontend API integration

⸻

## See Also

- `README.md` - Main documentation
- `docs/` - Frozen specifications
- `backend/README.md` - Backend documentation
- `frontend/README.md` - Frontend documentation


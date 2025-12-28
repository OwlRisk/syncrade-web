# Project Structure Recommendation v1

**Status: Advisory (Pre-Implementation)**

This document recommends the optimal project structure for Syncrade v1.

⸻

## 1. Monorepo vs Separate Repos

### Recommendation: **Monorepo (Single Repository)**

**Why monorepo is better for Syncrade:**

1. **Shared SSOT Assets**
   - `schemas/` (JSON Schemas) must be shared between frontend and backend
   - `fixtures/` (Golden Fixtures) must be shared for testing
   - `docs/` (Frozen Specs) are the single source of truth
   - **Having them in one repo prevents drift**

2. **Atomic Commits**
   - Schema changes can be committed with validator changes in one commit
   - Frontend and backend can update together when API contract changes
   - Easier to maintain version consistency

3. **Simpler CI/CD**
   - One CI pipeline can test both frontend and backend
   - Schema validation can run once for both projects
   - Golden fixture tests can verify both sides

4. **Development Workflow**
   - Developers can see full system in one place
   - Easier to understand how pieces fit together
   - Shared tooling (linting, formatting)

**When separate repos make sense:**
- Different teams working independently
- Different deployment schedules
- Different access controls

**For Syncrade v1: Monorepo is recommended.**

⸻

## 2. Recommended Monorepo Structure

```
syncrade-web/
  ├── frontend/              # Next.js frontend
  │   ├── app/
  │   ├── components/
  │   ├── lib/
  │   ├── public/
  │   ├── next.config.js
  │   ├── package.json
  │   └── .env.local.example
  │
  ├── backend/               # Python backend
  │   ├── app/
  │   │   ├── main.py
  │   │   ├── routes/
  │   │   ├── services/
  │   │   ├── validators/
  │   │   ├── utils/
  │   │   └── models/
  │   ├── tests/
  │   ├── requirements.txt
  │   ├── Dockerfile
  │   └── .env.example
  │
  ├── schemas/               # Shared JSON Schemas (SSOT)
  │   ├── intelligence-object-v1.schema.json
  │   ├── failure-object-v1.schema.json
  │   ├── query-intent-v1.schema.json
  │   └── render-blocks-v1.schema.json
  │
  ├── fixtures/              # Shared Golden Fixtures (SSOT)
  │   └── v1/
  │       └── case-01.json
  │
  ├── docs/                  # Frozen Specs (SSOT)
  │   ├── *.md
  │   └── terminology.json
  │
  ├── .github/
  │   └── workflows/
  │       └── ci.yml         # CI for both frontend and backend
  │
  ├── README.md
  ├── .gitignore
  └── docker-compose.yml     # For local development
```

⸻

## 3. Why Python for Backend?

### ✅ Python is Optimal for Syncrade

**1. Deterministic Logic**
- Python's explicit typing (with type hints) helps catch errors early
- Easy to implement canonical JSON serialization
- Clear control flow for deterministic pipelines

**2. Rich Ecosystem**
- `jsonschema` - Direct validation against `schemas/*.schema.json`
- `web3.py` - Ethereum/Base RPC interaction
- `pydantic` - Type validation, natural fit with FastAPI
- `httpx` - Async HTTP for data fetching

**3. LLM Integration**
- `openai` - Official OpenAI SDK
- `anthropic` - Official Anthropic SDK
- Both have good structured output support

**4. FastAPI Framework**
- Async support (important for concurrent data fetching)
- Automatic OpenAPI docs (helps validate API contract)
- Pydantic integration (natural schema validation)
- Type hints (catches errors early)

**5. Maintainability**
- Clear, readable code (important for deterministic logic)
- Easy to test (pytest ecosystem)
- Good tooling (mypy, black, ruff)

### ❌ Alternatives Considered

**Node.js/TypeScript:**
- ❌ Less mature Web3 libraries
- ❌ JSON Schema validation less straightforward
- ✅ Good for frontend-backend code sharing (but not needed for Syncrade)

**Go:**
- ❌ More verbose for business logic
- ❌ Less mature LLM SDKs
- ✅ Better performance (but not critical for Syncrade's use case)

**Rust:**
- ❌ Steeper learning curve
- ❌ Less mature ecosystem for LLM/Web3
- ✅ Best performance (but overkill for Syncrade)

**Conclusion: Python + FastAPI is the optimal choice for Syncrade v1.**

⸻

## 4. Migration Plan (If Needed)

### If Current Repo is Frontend-Only

**Option A: Add Backend to Current Repo (Recommended)**
```bash
# Current structure
syncrade-web/
  ├── src/          # React components
  ├── docs/         # Already here
  ├── schemas/      # Already here
  └── fixtures/     # Already here

# Add backend
syncrade-web/
  ├── frontend/     # Move current src/ here (or keep as-is)
  ├── backend/      # NEW: Python backend
  ├── docs/         # Keep as-is
  ├── schemas/      # Keep as-is (shared)
  └── fixtures/     # Keep as-is (shared)
```

**Option B: Keep Flat Structure**
```bash
# Keep current structure, add backend at root
syncrade-web/
  ├── src/          # Frontend (React/Next.js)
  ├── app/          # Backend (Python)
  ├── docs/         # Shared
  ├── schemas/      # Shared
  └── fixtures/     # Shared
```

**Recommendation: Option A (separate frontend/backend folders) is cleaner.**

⸻

## 5. Shared Assets Management

### Schemas (SSOT)

**Both frontend and backend must use same schemas:**
- Frontend: Use for TypeScript types generation (optional)
- Backend: Use for validation (required)

**Implementation:**
```bash
# Backend validates against schemas/
from jsonschema import validate
import json

with open('../schemas/intelligence-object-v1.schema.json') as f:
    schema = json.load(f)
    validate(instance=obj, schema=schema)
```

### Fixtures (SSOT)

**Both frontend and backend must use same fixtures:**
- Backend: Test replay consistency
- Frontend: Test UI rendering (optional)

⸻

## 6. CI/CD for Monorepo

**Single CI pipeline can:**
1. Lint frontend (ESLint)
2. Build frontend (Next.js/Vite)
3. Lint backend (ruff, mypy)
4. Test backend (pytest)
5. Validate schemas (jsonschema)
6. Test fixtures (replay consistency)

**Example `.github/workflows/ci.yml`:**
```yaml
jobs:
  frontend:
    # Frontend tests
  backend:
    # Backend tests
  schemas:
    # Schema validation
  fixtures:
    # Fixture tests
```

⸻

## 7. Development Workflow

**Local development:**
```bash
# Terminal 1: Frontend
cd frontend
npm run dev

# Terminal 2: Backend
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

**Or use Docker Compose:**
```bash
docker-compose up
```

⸻

## 8. Deployment

**Frontend (Vercel):**
- Deploy `frontend/` directory
- Vercel auto-detects Next.js

**Backend (Your Server):**
- Deploy `backend/` directory
- Use Docker or direct Python deployment

**Both can reference shared `schemas/` and `fixtures/` at build time.**

⸻

## Conclusion

**Recommended Structure:**
- ✅ **Monorepo** (frontend + backend in one repo)
- ✅ **Python + FastAPI** for backend
- ✅ **Shared `schemas/` and `fixtures/`** (SSOT)
- ✅ **Separate `frontend/` and `backend/` folders**

This structure maximizes:
- Consistency (shared SSOT)
- Maintainability (clear separation)
- Development speed (atomic changes)
- Authority (no schema drift)


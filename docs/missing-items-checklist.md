# Missing Items Checklist

**Status: Pre-Implementation Review**

This document lists what's missing before starting implementation.

⸻

## ✅ What's Complete (Documentation & Specs)

- [x] **Constitutional Layer**: Visual Constitution, Authority Protocol, Intelligence Object Spec, Judgment Pipeline Spec
- [x] **Product Layer**: All frozen specs (Projection, Query Interaction, Compliance, Replay UX, etc.)
- [x] **Engineering Layer**: Deployment guides, Environment config, Development setup, Backend structure
- [x] **Executable Assets**: JSON Schemas, Golden Fixtures, Terminology JSON
- [x] **Model Binding**: LLM Usage Contract with Model Binding Clause
- [x] **Environment Templates**: `.env.example`, `.env.local.example`

⸻

## ❌ What's Missing (Critical for Implementation)

### 1. Frontend Project Mismatch

**Issue:**
- README says "Next.js (recommended)" but current project is **React + Vite**
- Need to decide: migrate to Next.js OR update README to reflect current stack

**Options:**
- **Option A**: Migrate to Next.js (recommended if deploying to Vercel)
  - Create Next.js project structure
  - Migrate existing React components
  - Update build/deploy scripts
- **Option B**: Keep React + Vite, update README
  - Update README tech stack section
  - Update deployment guide for Vite build

**Recommendation**: Choose Option A if you want Vercel deployment benefits (SSR, edge functions, etc.)

⸻

### 2. Backend Project Doesn't Exist

**Missing:**
- No Python backend code
- No `requirements.txt`
- No backend project structure (as defined in `docs/python-backend-structure-v1.md`)

**Need to create:**
```
syncrade-api/  (or backend/)
  app/
    main.py
    routes/
    services/
    validators/
    utils/
    models/
  requirements.txt
  Dockerfile
  .env.example
  README.md
```

**Priority**: High (backend is core of the system)

⸻

### 3. Actual Implementation Code

**Current state:**
- Only UI components exist (Header, Footer, Hero, etc.)
- No API integration code
- No query/rendering logic
- No Intelligence Object handling

**Need to implement:**
- Frontend: API client, query input handling, result display
- Backend: All API endpoints (`/query`, `/render`, `/replay`)
- Backend: Deterministic pipeline (Observation → Inference → Judgment)
- Backend: LLM integration (Intent Parser, Renderer)
- Backend: Validators (io-validator, failure-validator)

⸻

### 4. Testing Infrastructure

**Missing:**
- No test files
- No test framework setup
- No test configuration

**Need:**
- Frontend: Jest/Vitest setup (if keeping React)
- Backend: pytest setup
- Integration tests for validators
- Golden fixture tests (replay consistency)
- Schema validation tests

⸻

### 5. Deployment Configuration

**Missing:**
- No `Dockerfile` (documented but not created)
- No `docker-compose.yml`
- No Vercel configuration (`vercel.json` if using Next.js)
- No deployment scripts

**Need:**
- Dockerfile for backend
- docker-compose.yml (if using Docker)
- Vercel config (if using Next.js)
- Deployment scripts (if needed)

⸻

### 6. Data Source Integration

**Missing:**
- No RPC client code (Ethereum, Base)
- No price API integration
- No data fetching/aggregation logic

**Need:**
- RPC client setup (web3.py)
- Price API client
- Data snapshot generation logic
- Evidence collection logic

⸻

### 7. LLM Integration

**Missing:**
- No LLM client code
- No prompt templates
- No structured output handling

**Need:**
- OpenAI client setup
- Prompt templates (with versioning/hashing)
- Structured output parsing (QueryIntent, RenderBlocks)
- Fallback logic

⸻

## 📋 Implementation Priority

### Phase 1: Foundation (Week 1-2)
1. ✅ Validators (io-validator, failure-validator) - **CRITICAL**
2. ✅ Replay hash generation - **CRITICAL**
3. ✅ Minimal API endpoints (mock responses) - **CRITICAL**
4. ⚠️ Decide: Next.js migration OR keep React+Vite

### Phase 2: Core Pipeline (Week 3-4)
5. ⚠️ Subject normalization
6. ⚠️ Observation layer (mock data first)
7. ⚠️ Inference layer (rule-based)
8. ⚠️ Judgment composer

### Phase 3: LLM Integration (Week 5-6)
9. ⚠️ Intent parser (with fallback)
10. ⚠️ Renderer (with fallback)

### Phase 4: Real Data & Production (Week 7-8)
11. ⚠️ Real data source integration
12. ⚠️ Storage & caching
13. ⚠️ Observability (logging, tracing)

⸻

## 🎯 Immediate Next Steps

**Before writing code, decide:**

1. **Frontend stack**: Next.js or React+Vite?
2. **Backend location**: Separate repo or same repo?
3. **Development order**: Frontend first or backend first?

**Recommended order:**
1. Create backend project structure (Python)
2. Implement validators first (gatekeeper)
3. Implement replay hash (test with fixtures)
4. Build minimal pipeline (mock data)
5. Then integrate frontend

⸻

## 📝 Quick Start Checklist

- [ ] Decide frontend stack (Next.js vs React+Vite)
- [ ] Create backend project structure
- [ ] Set up Python environment (venv, requirements.txt)
- [ ] Implement validators (io-validator, failure-validator)
- [ ] Implement replay hash generation
- [ ] Create minimal API endpoints (mock responses)
- [ ] Set up testing framework
- [ ] Create Dockerfile (if using Docker)
- [ ] Set up CI/CD (already have .github/workflows/ci.yml)


# Backend Implementation Recommendations v1

**Status: Advisory (Based on Frozen Specs)**

This document provides practical recommendations for implementing the Syncrade Python backend, based on the frozen specifications.

⸻

## 1. Implementation Priority (Critical Path)

### Phase 1: Foundation (Week 1-2)
**Must-have to validate architecture:**

1. **Validator Layer** (Highest Priority)
   - Implement `io-validator` using `schemas/intelligence-object-v1.schema.json`
   - Implement `failure-validator` using `schemas/failure-object-v1.schema.json`
   - **Why first:** Everything else must pass validation. This is your gatekeeper.

2. **Replay Hash Generation** (Critical for Authority)
   - Implement canonical JSON serialization
   - Implement `replay_hash` generation (SHA256 of canonical replay_inputs)
   - Test with `fixtures/v1/case-01.json` to ensure consistency
   - **Why critical:** Without replay, you lose determinism = lose authority

3. **Minimal API Endpoints**
   - `POST /query` (return mock Intelligence Objects that pass validator)
   - `GET /health` (simple health check)
   - `GET /replay/:replay_key` (return cached/mock objects)
   - **Why:** Validate API contract before building pipeline

### Phase 2: Deterministic Pipeline (Week 3-4)
**Core judgment generation:**

4. **Subject Normalization**
   - Wallet address normalization (checksum, validation)
   - Token contract normalization
   - Window resolution (from `docs/window-subject-resolution-rules-v1.md`)
   - **Why:** Must be deterministic, no LLM here

5. **Observation Layer**
   - Mock data source integration (start with static data)
   - Observation aggregation (deterministic)
   - Evidence collection and normalization
   - **Why:** Foundation for all judgments

6. **Inference Layer** (Rule-Based First)
   - Start with simple rule-based inference (no ML yet)
   - Pattern detection (ACCUMULATION / ROTATION / THINNING)
   - Multi-dimensional agreement logic
   - **Why:** Must be deterministic. ML can come later.

7. **Judgment Composer**
   - Assemble Intelligence Objects from inferences
   - Set uncertainty (deterministic calculation)
   - Generate replay inputs
   - **Why:** Final deterministic output

### Phase 3: LLM Integration (Week 5-6)
**Only after deterministic pipeline works:**

8. **Intent Parser** (LLM)
   - Parse user input → QueryIntent JSON
   - Schema validation (must pass `query-intent-v1.schema.json`)
   - Fallback to deterministic parsing if LLM fails
   - **Why:** LLM is optional, determinism is not

9. **Renderer** (LLM)
   - Convert Intelligence Objects → RenderBlocks
   - Schema validation (must pass `render-blocks-v1.schema.json`)
   - Forbidden lexicon check
   - **Why:** LLM only for language, not judgment

### Phase 4: Production Hardening (Week 7-8)
**Make it production-ready:**

10. **Data Source Integration**
    - Real RPC connections (Ethereum, Base)
    - Price API integration
    - Error handling and retries
    - **Why:** Real data, but still deterministic

11. **Storage & Caching**
    - Dataset snapshot storage
    - Replay object caching
    - Audit log storage (trace_id)
    - **Why:** Required for replay and auditability

12. **Observability**
    - Structured logging
    - Trace ID generation and propagation
    - Metrics collection
    - **Why:** Required by `docs/observability-spec-v1.md`

⸻

## 2. Technology Recommendations

### Core Framework
**FastAPI** (already recommended in structure doc)
- ✅ Async support (important for data fetching)
- ✅ Automatic OpenAPI docs (helps with API contract validation)
- ✅ Pydantic validation (natural fit for schema validation)
- ✅ Type hints (catches errors early)

### Data Fetching
**httpx** (async HTTP client)
- ✅ Async/await support
- ✅ Better than requests for concurrent data fetching
- ✅ Can handle WebSocket if needed for RPC

**web3.py** (for Ethereum/Base RPC)
- ✅ Standard library for Ethereum interaction
- ✅ Supports async (use AsyncWeb3)
- ⚠️ Be careful: some methods are not deterministic (use specific block numbers)

### Schema Validation
**jsonschema** (for JSON Schema validation)
- ✅ Direct validation against `schemas/*.schema.json`
- ✅ Can generate Pydantic models from schemas (advanced)

**Pydantic** (for Python models)
- ✅ Type validation
- ✅ Can load from JSON Schema (use `pydantic-jsonschema`)
- ✅ Natural integration with FastAPI

### LLM Integration
**OpenAI Python SDK** (if using OpenAI)
- ✅ Official SDK
- ✅ Async support
- ✅ Structured outputs (use JSON mode + schema)

**Anthropic SDK** (if using Claude)
- ✅ Official SDK
- ✅ Good structured output support

**Recommendation:** Start with OpenAI (better structured output support), but design abstraction layer so you can switch.

### Storage (Optional for v1)
**PostgreSQL** (if using database)
- ✅ Relational data (good for audit logs, snapshots)
- ✅ Use `asyncpg` for async access
- ⚠️ Not required for v1 MVP (can use file-based storage first)

**Redis** (if using cache)
- ✅ Fast caching for replay objects
- ✅ TTL support (good for dataset snapshots)
- ⚠️ Not required for v1 MVP

**Recommendation:** Start without database/cache. Add when you need persistence.

⸻

## 3. Architecture Patterns (Critical)

### 3.1 Strict Separation: Deterministic vs LLM

**Pattern:**
```python
# Deterministic (no LLM)
class PipelineService:
    async def run(self, intent: QueryIntent) -> List[IntelligenceObject]:
        # All deterministic logic here
        pass

# LLM (only for language)
class IntentParser:
    async def parse(self, user_input: str) -> QueryIntent:
        # LLM call here, but output must be validated
        pass

class Renderer:
    async def render(self, objects: List[IntelligenceObject]) -> RenderBlocks:
        # LLM call here, but output must be validated
        pass
```

**Rule:** Never mix. LLM output must go through validator before entering pipeline.

⸻

### 3.2 Validator Gate Pattern

**Every output must pass validator:**
```python
from app.validators.io_validator import validate_intelligence_object

async def generate_judgment(...) -> IntelligenceObject:
    obj = compose_judgment(...)
    
    # Gate: Must pass validation
    if not validate_intelligence_object(obj):
        raise ValidationError("Object failed validation")
    
    return obj
```

**Rule:** If validation fails, return Failure Object, not partial object.

⸻

### 3.3 Replay-First Design

**Every judgment must be replayable:**
```python
def generate_replay_inputs(obj: IntelligenceObject) -> Dict:
    return {
        "subject_norm": normalize_subject(obj.subject),
        "window": obj.window,
        "pipeline_version": "v1.0.0",
        "dataset_snapshot": generate_snapshot_id(...),
        "evidence_hash": hash_evidence(obj.evidence),
    }

def generate_replay_hash(replay_inputs: Dict) -> str:
    canonical = canonical_json(replay_inputs)
    return sha256(canonical.encode()).hexdigest()
```

**Rule:** Replay hash must be generated from canonical inputs, not from object itself.

⸻

### 3.4 Uncertainty-First Design

**Uncertainty is primary, confidence is derived:**
```python
def calculate_uncertainty(evidence: List[Evidence], agreement: float) -> float:
    # Deterministic calculation
    base_uncertainty = 1.0 - (len(evidence) / MIN_EVIDENCE_COUNT)
    agreement_penalty = 1.0 - agreement
    return min(1.0, max(0.0, base_uncertainty + agreement_penalty))

def derive_confidence(uncertainty: float) -> float:
    return 1.0 - uncertainty
```

**Rule:** LLM cannot set uncertainty. Only deterministic calculation.

⸻

## 4. Critical Implementation Details

### 4.1 Canonical JSON Serialization

**Must match exactly across languages:**
```python
import json

def canonical_json(obj: Dict) -> str:
    """Generate canonical JSON string matching spec."""
    return json.dumps(
        obj,
        sort_keys=True,           # Keys sorted
        separators=(',', ':'),    # No spaces
        ensure_ascii=False,       # UTF-8
        allow_nan=False,          # No NaN/Inf
    )
```

**Test:** Generate hash in Python, verify it matches spec examples.

⸻

### 4.2 Evidence Normalization

**Must match spec exactly:**
```python
def normalize_evidence(evidence: Evidence) -> Dict:
    """Normalize evidence for hashing."""
    return {
        "source": evidence.source.lower(),      # lowercase
        "metric": evidence.metric.lower(),      # lowercase
        "value": evidence.value,                # JSON number
        "timestamp": evidence.timestamp,        # ISO-8601 UTC
        "reference_id": evidence.reference_id or "",  # empty string if None
    }

def sort_evidence_list(evidence_list: List[Evidence]) -> List[Evidence]:
    """Sort by: source, metric, timestamp, reference_id."""
    return sorted(
        evidence_list,
        key=lambda e: (
            e.source.lower(),
            e.metric.lower(),
            e.timestamp,
            e.reference_id or "",
        )
    )
```

⸻

### 4.3 LLM Output Validation

**Never trust LLM output:**
```python
async def parse_intent_with_validation(user_input: str) -> QueryIntent:
    # Call LLM
    llm_output = await llm_client.chat(...)
    
    # Parse JSON
    try:
        intent_dict = json.loads(llm_output)
    except json.JSONDecodeError:
        # Fallback to deterministic parsing
        return deterministic_parse(user_input)
    
    # Validate against schema
    if not validate_query_intent(intent_dict):
        # Fallback to deterministic parsing
        return deterministic_parse(user_input)
    
    return QueryIntent(**intent_dict)
```

**Rule:** Always have deterministic fallback.

⸻

### 4.4 Dataset Snapshot Generation

**Must be deterministic and traceable:**
```python
def generate_dataset_snapshot(
    source: str,
    chain: str,
    block_start: int,
    block_end: int,
    generated_at: datetime,
) -> str:
    """Generate canonical snapshot ID."""
    return f"{source}:{chain}:{block_start}-{block_end}:{generated_at.isoformat()}Z"
```

**Rule:** Snapshot ID must include all information needed to reproduce data window.

⸻

## 5. Testing Strategy

### 5.1 Golden Fixture Tests (Critical)

**Test replay consistency:**
```python
def test_replay_hash_consistency():
    """Test that replay hash is deterministic."""
    fixture = load_fixture("fixtures/v1/case-01.json")
    replay_inputs = fixture["replay_inputs"]
    
    hash1 = generate_replay_hash(replay_inputs)
    hash2 = generate_replay_hash(replay_inputs)
    
    assert hash1 == hash2
    assert hash1 == fixture["expected_replay_hash"]
```

⸻

### 5.2 Validator Tests

**Test all validators:**
```python
def test_io_validator():
    """Test Intelligence Object validation."""
    valid_obj = load_fixture("fixtures/v1/case-01.json")["expected_object"]
    assert validate_intelligence_object(valid_obj) == True
    
    invalid_obj = valid_obj.copy()
    del invalid_obj["id"]  # Missing required field
    assert validate_intelligence_object(invalid_obj) == False
```

⸻

### 5.3 Determinism Tests

**Test that same inputs produce same outputs:**
```python
def test_pipeline_determinism():
    """Test that pipeline is deterministic."""
    intent = QueryIntent(...)
    
    result1 = await pipeline.run(intent)
    result2 = await pipeline.run(intent)
    
    # Must be identical (canonical JSON)
    assert canonical_json(result1) == canonical_json(result2)
```

⸻

## 6. Common Pitfalls to Avoid

### ❌ Don't: Let LLM Generate Evidence
```python
# WRONG
evidence = await llm.generate_evidence(...)  # NO!
```

### ✅ Do: LLM Only for Language
```python
# CORRECT
evidence = fetch_from_data_source(...)  # Deterministic
explanation = await llm.render_explanation(evidence)  # Language only
```

⸻

### ❌ Don't: Skip Validator
```python
# WRONG
obj = generate_object(...)
return obj  # No validation!
```

### ✅ Do: Always Validate
```python
# CORRECT
obj = generate_object(...)
if not validate_intelligence_object(obj):
    return FailureObject(error_code="VALIDATION_FAILED")
return obj
```

⸻

### ❌ Don't: Generate Replay Hash from Object
```python
# WRONG
replay_hash = sha256(json.dumps(obj).encode()).hexdigest()
```

### ✅ Do: Generate from Replay Inputs
```python
# CORRECT
replay_inputs = {
    "subject_norm": normalize_subject(obj.subject),
    "window": obj.window,
    # ... other inputs
}
replay_hash = sha256(canonical_json(replay_inputs).encode()).hexdigest()
```

⸻

### ❌ Don't: Let LLM Set Uncertainty
```python
# WRONG
uncertainty = await llm.calculate_uncertainty(...)  # NO!
```

### ✅ Do: Calculate Deterministically
```python
# CORRECT
uncertainty = calculate_uncertainty_deterministic(evidence, agreement)
confidence = 1.0 - uncertainty
```

⸻

## 7. Performance Considerations

### 7.1 Async Everything

**Use async/await for all I/O:**
```python
async def fetch_data_sources(intent: QueryIntent) -> Dict:
    # Fetch all sources concurrently
    results = await asyncio.gather(
        fetch_ethereum_data(...),
        fetch_price_data(...),
        fetch_onchain_data(...),
    )
    return combine_results(results)
```

⸻

### 7.2 Caching Strategy

**Cache deterministic outputs:**
```python
@cache(ttl=3600)
async def get_dataset_snapshot(snapshot_id: str) -> Dict:
    # Expensive operation, cache by snapshot_id
    pass
```

**Rule:** Only cache deterministic outputs. Never cache LLM outputs (they're not deterministic).

⸻

### 7.3 Rate Limiting

**Implement early:**
```python
from slowapi import Limiter

limiter = Limiter(key_func=get_remote_address)

@router.post("/query")
@limiter.limit("60/minute")
async def query(request: Request, ...):
    # Rate limited
    pass
```

⸻

## 8. Deployment Recommendations

### 8.1 Start Simple

**v1 MVP:**
- Single server (no load balancer needed yet)
- File-based storage (no database needed yet)
- In-memory cache (no Redis needed yet)
- Simple logging (no ELK needed yet)

**Add complexity only when needed.**

⸻

### 8.2 Monitoring from Day 1

**Even in MVP:**
- Structured logging (JSON format)
- Trace ID in every log line
- Health check endpoint
- Basic metrics (request count, latency)

**Why:** You'll need it for debugging. Start simple, but start early.

⸻

## 9. Recommended Libraries

### Core
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `pydantic` - Data validation
- `pydantic-settings` - Configuration

### Data
- `httpx` - HTTP client (async)
- `web3` - Ethereum/Base RPC
- `python-dotenv` - Environment variables

### Validation
- `jsonschema` - JSON Schema validation
- `pydantic-jsonschema` - Generate Pydantic from JSON Schema (optional)

### LLM
- `openai` - OpenAI SDK
- `anthropic` - Anthropic SDK (if using Claude)

### Utilities
- `python-dateutil` - Date parsing
- `pytz` - Timezone handling (for ISO-8601)

⸻

## 10. Next Steps

1. **Create project structure** (use `docs/python-backend-structure-v1.md`)
2. **Implement validators first** (gatekeeper)
3. **Implement replay hash** (test with fixtures)
4. **Build minimal pipeline** (mock data first)
5. **Add LLM integration** (with fallbacks)
6. **Add real data sources** (RPC, APIs)
7. **Add storage** (when needed)
8. **Add observability** (logging, metrics)

**Remember:** Determinism > Features. Authority > Speed.


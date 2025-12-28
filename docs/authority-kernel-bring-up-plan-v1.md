# Authority Kernel Bring-Up Plan v1

**Status: Frozen (Engineering Execution Plan)**

This document defines the execution plan for bringing up the first executable Authority Kernel — the first legal Syncrade Judgment.

⸻

## System Stage: Authority Kernel Bring-Up

**You are no longer designing a product.  
You are bringing up a judgment machine that can be constrained by CI / Validator / Hash / Replay.**

This is the **Authority Kernel Bring-Up** phase.

⸻

## Current System State

### ✅ What's Frozen (Constitution Layer)

| Layer | Status |
|-------|--------|
| Visual Constitution | ✅ Frozen |
| Authority Protocol | ✅ Frozen |
| Judgment Pipeline | ✅ Frozen |
| Intelligence Object Constitution | ✅ Frozen |
| LLM Usage Contract | ✅ Frozen |
| Replay / Hash / Compliance / Terminology | ✅ Frozen |
| Monorepo Architecture | ✅ Ready |
| Schema / Golden Fixtures | ✅ Ready |
| Validator Skeleton | ✅ Ready |

### ✅ What's Ready (Engineering Layer)

- Project structure (monorepo: frontend + backend)
- Backend skeleton (FastAPI, routes, validators, replay hash)
- Frontend structure (Next.js, components)
- Shared assets (schemas, fixtures, docs)

### ❌ What's Missing

**Not ideas. Not features.**

**Only one thing:**

**The first executable machine chain that turns "constitution" into "judgment".**

⸻

## Phase 0: Freeze Missing Specs ✅

**Status: Complete**

Three files frozen:

1. ✅ **`docs/prompt-templates-v1.md`** - LLM Prompt versioning + Hash rules
2. ✅ **`docs/dataset-snapshot-spec-v1.md`** - `dataset_snapshot` naming format
3. ✅ **`docs/api-contract-v1.md`** - API request/response examples

**These are now frozen and will not change.**

⸻

## Phase 1: Authority Kernel v1 (Frozen Scope)

### 🎯 Single Judgment Scenario (Frozen)

**Input:**
- Wallet address (Base chain only)

**Output:**
- **ONE** Intelligence Object
- Type: `OBSERVATION` (frozen per `docs/kernel-bring-up-spec-v1.md`)
- Judgment: Observable facts about wallet behavior
- Window: `last 30d` (fixed)

**Hard rules:**
- Only ONE judgment type allowed in v1: `OBSERVATION` only
- Only ONE model/pipeline version
- Only ONE chain (Base)
- Only ONE window (30d)
- Only mock data sources (no real chains)

**This is the minimum viable Authority Kernel.**

**See:** `docs/kernel-bring-up-spec-v1.md` for complete Bring-Up specification.

⸻

## Phase 2: Pipeline Bring-Up (All Deterministic)

### Pipeline Flow (Frozen)

```
wallet address
  ↓
subject_normalize() → normalized wallet
  ↓
data_source.fetch() → on-chain data (Base, last 30d)
  ↓
observation.aggregate() → observation metrics
  ↓
behavior_vector.compute() → behavior pattern (accumulation/distribution/neutral)
  ↓
inference.detect() → inference record
  ↓
judgment_object.compose() → BEHAVIOR Intelligence Object
  ↓
replay_hash.generate() → replay_key
  ↓
validator.validate() → validated object
  ↓
renderer.render() → RenderBlocks (LLM allowed here only)
```

**All steps except `renderer.render()` are deterministic (no LLM).**

⸻

## Phase 3: Replay Kernel (Frozen)

### Replay Guarantee

**Every output must be replayable:**

```
GET /v1/replay/:replay_key
  → Same hash
  → Same object (byte-identical JSON)
  → Same result
```

**This is the Authority core proof.**

**Replay test:**
1. Generate Intelligence Object with `replay_key = "abc123..."`
2. Store object by `replay_key`
3. Call `GET /v1/replay/abc123...`
4. Response must be byte-identical to original

⸻

## Phase 4: Frontend Projection (Frozen)

### Judgment Terminal v1

**Your website is no longer UI. It is:**

**A Judgment Terminal.**

**Minimum projection:**
- Input field: wallet address
- Output: BEHAVIOR Intelligence Object (projected per `docs/projection-spec-v1.md`)
- Replay controls: Show `replay_key`, allow replay
- Provenance: Show `dataset_snapshot`, `pipeline_version`, `replay_key` (collapsible)

⸻

## Implementation Checklist (Frozen Order)

### Step 1: Subject Normalization ✅ Ready

**File:** `backend/app/utils/subject.py`

**Function:**
```python
def normalize_wallet(address: str, chain: str) -> dict:
    """
    Normalize wallet address.
    - Validate address format
    - Checksum (EIP-55 for Ethereum/Base)
    - Return: { "chain": chain, "type": "wallet", "address": normalized_address }
    """
```

**Test:** Same address → same normalized output (deterministic)

⸻

### Step 2: Data Source (Mock First)

**File:** `backend/app/services/data_source.py`

**Function:**
```python
async def fetch_wallet_data(
    address: str,
    chain: str,
    window: dict
) -> tuple[list, str]:
    """
    Fetch on-chain data for wallet.
    Returns: (evidence_list, dataset_snapshot)
    
    v1: Start with mock data (static evidence)
    """
```

**Mock data for v1:**
- Return static evidence list
- Generate `dataset_snapshot` per `docs/dataset-snapshot-spec-v1.md`
- Format: `onchain:base:20500000-20501000:2026-01-03T02:00:00Z`

⸻

### Step 3: Observation Aggregation

**File:** `backend/app/services/observation.py`

**Function:**
```python
def aggregate_observations(
    evidence_list: list,
    window: dict
) -> dict:
    """
    Aggregate evidence into observation metrics.
    Returns: { "tx_count": int, "net_inflow": float, ... }
    """
```

**v1 metrics:**
- `tx_count`: Transaction count in window
- `net_inflow`: Net token inflow (ETH/USDC)
- `hold_time_avg`: Average hold time

⸻

### Step 4: Observation Pipeline

**File:** `backend/app/services/pipeline.py`

**Function:**
```python
def run_observation_pipeline(
    observations: dict,
    baseline: dict
) -> dict:
    """
    Run deterministic observation pipeline.
    Returns: { "observation": str, "metrics": dict, "uncertainty": float }
    """
```

**v1 rules (deterministic):**
- Aggregate metrics from evidence
- Compare to baseline (historical average)
- Generate observation inference (factual, not predictive)
- Compute uncertainty: `0.2 + (1 - data_quality_score) * 0.3` (clamped to [0, 1])
- `uncertainty_method`: `RULE_CALIBRATED`

**Note:** v1 only outputs OBSERVATION type (per `docs/kernel-bring-up-spec-v1.md`).

⸻

### Step 6: Judgment Composer

**File:** `backend/app/services/judgment_composer.py`

**Function:**
```python
def compose_judgment(
    subject: dict,
    window: dict,
    inference: dict,
    evidence: list,
    dataset_snapshot: str
) -> dict:
    """
    Compose OBSERVATION Intelligence Object.
    Returns: IntelligenceObjectV1 (dict)
    """
```

**Must generate:**
- `id`: `syncrade:observation:${chain}:${date}:${address_short}:${window}:${index}`
- `type`: `OBSERVATION` (frozen per Bring-Up spec)
- `inference`: From observation pipeline
- `uncertainty`: From pipeline
- `replay`: Generate `replay_key` and `replay_inputs`
- All required fields per schema

**Note:** v1 only composes OBSERVATION type (per `docs/kernel-bring-up-spec-v1.md`).

⸻

### Step 7: Replay Hash

**File:** `backend/app/utils/replay.py` ✅ (Already implemented)

**Function:**
```python
def generate_replay_hash(replay_inputs: dict) -> str:
    """
    Generate SHA256 hash of canonical replay_inputs.
    Already implemented.
    """
```

⸻

### Step 8: Validator

**File:** `backend/app/validators/io_validator.py` ✅ (Already implemented)

**Function:**
```python
def validate_intelligence_object(obj: dict) -> tuple[bool, Optional[str]]:
    """
    Validate against schemas/intelligence-object-v1.schema.json.
    Already implemented.
    """
```

⸻

### Step 9: Renderer (LLM Allowed)

**File:** `backend/app/services/renderer.py`

**Function:**
```python
async def render_objects(
    objects: list[dict]
) -> list[dict]:
    """
    Convert Intelligence Objects → RenderBlocks.
    Uses LLM prompt from docs/prompt-templates-v1.md.
    Fallback to template if LLM unavailable.
    """
```

**v1 prompt:** `renderer/observation_object_v1.0.0.txt` (for OBSERVATION type)

**Fallback:** Template substitution (no LLM)

⸻

### Step 10: API Route

**File:** `backend/app/routes/query.py` ⚠️ (Skeleton exists)

**Update:**
```python
@router.post("/query")
async def query(request: QueryRequest):
    # 1. Normalize subject
    # 2. Fetch data
    # 3. Run pipeline
    # 4. Validate
    # 5. Return
```

⸻

## Success Criteria (Frozen)

**Authority Kernel v1 is "up" when:**

1. ✅ User inputs wallet address
2. ✅ System produces ONE valid OBSERVATION Intelligence Object
3. ✅ Object passes `io-validator`
4. ✅ Object has valid `replay_key`
5. ✅ `GET /v1/replay/:replay_key` returns byte-identical object
6. ✅ Replay hash is 100% consistent across 100 executions
7. ✅ Frontend displays object correctly
8. ✅ All fields match schema
9. ✅ All compliance rules satisfied

**See:** `docs/kernel-bring-up-spec-v1.md` for complete success criteria.

**Not required:**
- ❌ Multiple judgment types (OBSERVATION only)
- ❌ Multiple chains (Base only)
- ❌ Multiple windows (30d only)
- ❌ Complex intelligence
- ❌ Real on-chain data (mock only, per Bring-Up spec)
- ❌ BEHAVIOR / SIGNAL / RISK / INSIGHT types (forbidden in v1)

⸻

## Implementation Order (Frozen)

**Week 1:**
1. Implement `services/intent_parser.py` (LLM intent parsing)
2. Implement `utils/subject.py` (normalize wallet)
3. Implement `utils/window.py` (resolve window)
4. Implement `services/data_source.py` (mock data only)
5. Implement `services/pipeline.py` (observation pipeline)

**Week 2:**
6. Implement `services/judgment_composer.py` (compose OBSERVATION object)
7. Wire up `routes/query.py` (full pipeline)
8. Test with validators
9. Test replay consistency (100 executions, 100% identical)
10. Implement `services/renderer.py` (LLM + fallback)

**Week 3:**
11. Frontend: API client
12. Frontend: Query input
13. Frontend: Object display
14. Frontend: Replay controls
15. End-to-end test

⸻

## Frozen Constraints (Non-negotiable)

**What can move:**
- Implementation details (as long as deterministic)
- Code structure (as long as follows architecture)
- Test data (as long as passes validators)

**What cannot move:**
- Schema (frozen)
- Replay algorithm (frozen)
- Validator rules (frozen)
- Prompt templates (frozen after v1.0.0)
- API contract (frozen)
- Compliance rules (frozen)

⸻

## Next Steps (Immediate)

1. **Start with `utils/subject.py`** - Normalize wallet address
2. **Create mock data** - Static evidence for testing
3. **Build pipeline step by step** - One function at a time
4. **Test each step** - Ensure determinism
5. **Wire up route** - Connect pipeline to API
6. **Test end-to-end** - Wallet → Object → Replay

**This is the Authority Kernel Bring-Up.  
This is the first legal Syncrade Judgment.**


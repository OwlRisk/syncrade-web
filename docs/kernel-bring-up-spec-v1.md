# Kernel Bring-Up Spec v1

**Syncrade Core System Boot Specification**

**Status: Frozen / Engineering Law**

⸻

## 0. Definition

**Kernel Bring-Up = The first system ignition that transforms "judgment constitution" into "executable order".**

This is the irreversible stage where Syncrade transitions from "philosophical system" to "engineering entity".

**Bring-Up's goal is not feature completeness, but:**

**Validation: Can this system start, run, replay, and freeze as a "judgment engine"?**

⸻

## I. Bring-Up Single Goal (Frozen)

**Bring-Up v1 allows only one goal:**

**Enable the system to generate, validate, return, and replay the first legal Intelligence Object.**

No more, no extension, no optimization.

**Only one question:**

**Can this system actually "judge"?**

⸻

## II. Bring-Up Minimum Execution Loop (Non-negotiable)

**Kernel v1 must form the following closed loop:**

```
User Query
  ↓
Intent Parser (LLM)
  ↓
Subject Resolver
  ↓
Window Resolver
  ↓
Mock Data Source
  ↓
Deterministic Pipeline
  ↓
Judgment Object Builder
  ↓
Validator (Schema + Replay)
  ↓
Renderer (LLM or Template)
  ↓
Response + Replay Hash
```

**Any missing step → Bring-Up fails.**

⸻

## III. Bring-Up Allowed Data Sources (Frozen)

**v1 only allows:**

| Source | Rule |
|--------|------|
| mock datasets | Embedded JSON |
| golden fixtures | Fixed files |
| static snapshots | Frozen windows |

**❌ Real chains not allowed**  
**❌ Real-time APIs not allowed**  
**❌ Dynamic changes not allowed**

**Bring-Up is order validation, not market connection.**

⸻

## IV. Bring-Up Single Allowed Judgment Type (Frozen)

**v1 only allows output:**

| Type |
|------|
| **OBSERVATION** |

**SIGNAL / RISK / INSIGHT / BEHAVIOR are forbidden.**

**You must first prove you "can observe", then prove you "can judge".**

⸻

## V. Bring-Up Judgment Required Conditions (Frozen)

**The only legal Judgment Object must have:**

- ✅ `subject` (normalized)
- ✅ `window` (time-bounded)
- ✅ `metrics` (observable data)
- ✅ `baseline` (comparison reference)
- ✅ `inference` (OBSERVATION type)
- ✅ `replay_hash` (deterministic)
- ✅ Passes schema validator
- ✅ Can be replayed

**Otherwise → System is invalid.**

⸻

## VI. Bring-Up Replay Law (Most Critical)

**The only criterion for Bring-Up success:**

**The same request, 100 times → `replay_hash` must be 100% identical.**

**If not satisfied:**

→ System has not successfully ignited  
→ Development of new features is forbidden

⸻

## VII. Bring-Up API Constraints (Frozen)

**Kernel v1 only allows three endpoints:**

| Endpoint | Purpose |
|----------|---------|
| `POST /v1/query` | Execute full pipeline |
| `POST /v1/render` | Object → Text |
| `GET /v1/replay/:replay_key` | Replay by replay_key |

**Adding any business endpoints is forbidden.**

⸻

## VIII. Bring-Up Forbidden Items (Frozen)

| Forbidden | Reason |
|-----------|--------|
| Login system | Pollutes system purity |
| User state | Introduces non-replayable variables |
| LLM multi-turn | Breaks determinism |
| Multiple subjects | Breaks replay atomicity |
| Multiple windows | Breaks minimum loop |

⸻

## IX. Bring-Up Success Definition (Frozen)

**Kernel v1 Bring-Up is considered successful if and only if:**

1. ✅ `/v1/query` can stably return one legal OBSERVATION Object
2. ✅ `/v1/replay` can completely replay the same Judgment
3. ✅ `replay_hash` is 100% identical across 100 executions
4. ✅ All objects pass JSON Schema Validator
5. ✅ All outputs comply with LLM Usage Contract

⸻

## X. System State After Bring-Up Completion

**After Bring-Up completes:**

**You officially possess:**

**The world's first "Judgment Object Engine Kernel"**

**Not a website**  
**Not a Bot**  
**Not an Agent**  
**Not a SaaS**

**But:**

**A Judgment Kernel that has been ignited**

⸻

## XI. Bring-Up Implementation Checklist (Frozen Order)

### Step 1: Intent Parser (LLM)

**File:** `backend/app/services/intent_parser.py`

**Function:**
```python
async def parse_intent(user_input: str) -> dict:
    """
    Parse user input → QueryIntent JSON.
    Must output structured JSON matching query-intent-v1.schema.json.
    """
```

**v1 scope:**
- Input: wallet address (string)
- Output: `{ "subject": { "type": "wallet", "address": "..." }, "window": { "days": 30 } }`

⸻

### Step 2: Subject Resolver

**File:** `backend/app/utils/subject.py`

**Function:**
```python
def resolve_subject(intent: dict) -> dict:
    """
    Resolve subject from intent.
    Returns: { "chain": "base", "type": "wallet", "address": normalized_address }
    """
```

**Rules:**
- Validate address format
- Normalize (checksum for Ethereum/Base)
- Deterministic: same address → same normalized output

⸻

### Step 3: Window Resolver

**File:** `backend/app/utils/window.py`

**Function:**
```python
def resolve_window(intent: dict) -> dict:
    """
    Resolve time window from intent.
    v1: Fixed 30d window.
    Returns: { "start": ISO-8601, "end": ISO-8601 }
    """
```

**v1 rule:** Always return last 30 days (fixed).

⸻

### Step 4: Mock Data Source

**File:** `backend/app/services/data_source.py`

**Function:**
```python
async def fetch_mock_data(
    subject: dict,
    window: dict
) -> tuple[list, str]:
    """
    Fetch mock data for subject/window.
    Returns: (evidence_list, dataset_snapshot)
    
    v1: Return static mock data from embedded JSON.
    """
```

**Mock data format:**
- Embedded JSON in code (no external files)
- Static evidence list
- Generate `dataset_snapshot` per `docs/dataset-snapshot-spec-v1.md`

⸻

### Step 5: Deterministic Pipeline

**File:** `backend/app/services/pipeline.py`

**Function:**
```python
def run_pipeline(
    subject: dict,
    window: dict,
    evidence: list
) -> dict:
    """
    Run deterministic observation pipeline.
    Returns: inference record for OBSERVATION type.
    """
```

**v1 pipeline:**
1. Aggregate evidence → metrics
2. Compute baseline (historical average)
3. Detect observation → inference
4. Compute uncertainty (deterministic)
5. Return: `{ "observation": str, "metrics": dict, "uncertainty": float }`

⸻

### Step 6: Judgment Object Builder

**File:** `backend/app/services/judgment_composer.py`

**Function:**
```python
def compose_observation(
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
- `id`: `syncrade:observation:${chain}:${date}:${subject_short}:${window}:${index}`
- `type`: `OBSERVATION`
- `inference`: From pipeline
- `uncertainty`: From pipeline
- `replay`: Generate `replay_key` and `replay_inputs`
- All required fields per schema

⸻

### Step 7: Validator

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

### Step 8: Replay Hash

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

### Step 9: Renderer

**File:** `backend/app/services/renderer.py`

**Function:**
```python
async def render_objects(
    objects: list[dict]
) -> list[dict]:
    """
    Convert Intelligence Objects → RenderBlocks.
    Uses LLM prompt OR template fallback.
    """
```

**v1:**
- Try LLM (if available)
- Fallback to template (deterministic)
- Output must match `render-blocks-v1.schema.json`

⸻

### Step 10: API Route

**File:** `backend/app/routes/query.py` ⚠️ (Skeleton exists)

**Update:**
```python
@router.post("/v1/query")
async def query(request: QueryRequest):
    # 1. Parse intent (LLM)
    # 2. Resolve subject
    # 3. Resolve window
    # 4. Fetch mock data
    # 5. Run pipeline
    # 6. Compose judgment
    # 7. Validate
    # 8. Generate replay hash
    # 9. Render (optional)
    # 10. Return
```

⸻

## XII. Bring-Up Test Protocol (Frozen)

### Test 1: Replay Consistency (100 executions)

**Test:**
```python
def test_replay_consistency():
    """Same input → same replay_hash 100 times."""
    input = "0x1111111111111111111111111111111111111111"
    hashes = []
    for _ in range(100):
        response = await query({"user_input": input})
        hashes.append(response["objects"][0]["replay"]["replay_key"])
    
    assert len(set(hashes)) == 1, "Replay hash must be 100% consistent"
```

**Success:** All 100 hashes are identical.

⸻

### Test 2: Schema Validation

**Test:**
```python
def test_schema_validation():
    """All objects must pass validator."""
    response = await query({"user_input": "0x1111..."})
    for obj in response["objects"]:
        is_valid, error = validate_intelligence_object(obj)
        assert is_valid, f"Object failed validation: {error}"
```

**Success:** All objects pass validation.

⸻

### Test 3: Replay Endpoint

**Test:**
```python
def test_replay_endpoint():
    """Replay endpoint returns byte-identical object."""
    # Generate object
    response1 = await query({"user_input": "0x1111..."})
    replay_key = response1["objects"][0]["replay"]["replay_key"]
    
    # Replay
    response2 = await replay(replay_key)
    
    # Compare (byte-identical)
    obj1_json = canonical_json(response1["objects"][0])
    obj2_json = canonical_json(response2["objects"][0])
    assert obj1_json == obj2_json, "Replay must be byte-identical"
```

**Success:** Replay returns byte-identical object.

⸻

## XIII. Bring-Up Completion Criteria (Frozen)

**Kernel v1 Bring-Up is complete when:**

1. ✅ All 10 implementation steps are complete
2. ✅ Test 1 passes (100% replay consistency)
3. ✅ Test 2 passes (all objects validate)
4. ✅ Test 3 passes (replay endpoint works)
5. ✅ `/v1/query` returns legal OBSERVATION Object
6. ✅ `/v1/render` converts Object → RenderBlocks
7. ✅ `/v1/replay/:replay_key` returns byte-identical object
8. ✅ All outputs comply with LLM Usage Contract
9. ✅ All outputs comply with Compliance Output Rules

**Only when all 9 criteria are met → Bring-Up is successful.**

⸻

## XIV. Post Bring-Up State (Frozen)

**After successful Bring-Up:**

**System possesses:**

- ✅ A working Judgment Kernel
- ✅ Deterministic pipeline
- ✅ Replayable judgments
- ✅ Validated outputs
- ✅ Constitutional compliance

**System is ready for:**

- Phase 2: Real data integration
- Phase 3: Additional judgment types
- Phase 4: Multi-chain support

**But not before Bring-Up is complete.**

⸻

## XV. Frozen Constraints (Non-negotiable)

**What can move:**
- Implementation details (as long as deterministic)
- Code structure (as long as follows architecture)
- Test data (as long as passes validators)

**What cannot move:**
- Judgment type (OBSERVATION only)
- Data source (mock only)
- Replay consistency (100% required)
- API endpoints (3 only)
- Success criteria (9 criteria, all required)

⸻

## Conclusion

**Kernel Bring-Up is not feature development.**

**It is system ignition.**

**The first legal Syncrade Judgment must be:**

- Observable (OBSERVATION type)
- Deterministic (100% replay consistency)
- Validated (passes all validators)
- Replayable (byte-identical replay)
- Constitutional (complies with all frozen specs)

**Only then is the Kernel "up".**


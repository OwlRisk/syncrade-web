# Intelligence Object Schema v1

**Status: Frozen (Constitution/Product Boundary)**

v1 recognizes **one** schema: **Minimal + Extensible**.  
Adding fields is allowed only under the compatibility rules below.

⸻

## 1. Goals (What this schema enforces)

- **Replayability**: the object can be deterministically re-generated
- **Auditability**: every claim maps to evidence and versions
- **Projection safety**: UI cannot “pretty it up” into free text

⸻

## 2. Minimal Executable Schema (Required)

All required fields must exist, otherwise the object is **invalid**.

```
IntelligenceObjectV1 := {
  id,                     // stable, globally unique, copyable
  type,                   // OBSERVATION | SIGNAL | INSIGHT | RISK | BEHAVIOR
  subject,                // wallet | token | market | cohort (structured)
  window,                 // { start, end }

  model,                  // { pipeline_version, rule_version?, scoring_version?, params_hash? }
  inference,              // structured (no free-text-only judgments)
  uncertainty,            // numeric 0..1 (deterministic system uncertainty; not LLM “confidence”)
  uncertainty_method,     // ENUM (frozen), see below
  confidence?,            // derived only (optional), see below
  confidence_method?,     // ENUM (frozen), see below

  evidence,               // Evidence[] (no evidence => no object)
  data_timestamp,         // timestamp of dataset snapshot / cutoff

  expires_at,             // time-bounded validity

  replay,                 // { replay_hash, replay_inputs }
  safety_notice           // fixed compliance notice
}
```

⸻

## 3. Evidence Schema (Required)

```
Evidence := {
  source,
  metric,
  value,
  delta?,
  baseline?,
  timestamp,
  reference_id?
}
```

Rule: **LLM must never fabricate evidence**.

⸻

## 4. Replay Input Closure (Required)

Replay is not “just a hash”. It is an input closure that must allow regeneration:

```
replay_inputs := {
  subject,
  window,
  pipeline_version,
  rule_params_hash,
  dataset_snapshot,
  evidence_hash,
  price_snapshot?          // if prices are used, they must be snapshotted
}
```

`dataset_snapshot` must include (at minimum):

- data source version(s)
- cutoff block height / timestamp
- price source timestamp (if prices are used)

⸻

## 4.1 Replay Triple (Minimum, Product-Visible)

To make authority projectable, every object must carry a minimal Replay Triple:

- `dataset_snapshot`
- `pipeline_version` (and rule/scoring versions if split)
- `replay_key` / `replay_hash`

UI must be able to show these three (collapsible allowed).

⸻

## 4.2 Replay Input Canon (Executable)

Replay must be **computable identically** across languages/runtimes.

### Canonical replay_inputs object

`replay_inputs` must be a JSON object with these fields:

```
replay_inputs := {
  subject_norm,        // normalized subject object (see below)
  window,              // { start, end } ISO-8601
  pipeline_version,    // string
  rule_version,        // string (if separate)
  scoring_version,     // string (if separate)
  dataset_snapshot,    // string (canonical naming)
  evidence_hash,       // string
  price_snapshot?      // string/object, if any price data used
}
```

### dataset_snapshot naming (canonical)

```
dataset_snapshot := "${source}:${chain}:${block_range}:${generated_at}"
```

Example:

```
"onchain:base:20500000-20501000:2026-01-03T02:00:00Z"
```

### evidence_hash algorithm (canonical)

1) Normalize each `Evidence`:
   - `metric`: lowercase
   - `timestamp`: ISO-8601 UTC string
   - numbers: JSON number (no stringified numbers)
2) Sort evidence list by:
   - `source`, then `metric`, then `timestamp`, then `reference_id` (empty last)
3) Serialize **canonical JSON**:
   - UTF-8
   - object keys sorted lexicographically
   - no whitespace
4) `evidence_hash = SHA256(canonical_json(sorted_normalized_evidence_list))`

### replay_key / replay_hash (canonical)

`replay_key = SHA256(canonical_json(replay_inputs))`

Rule: if two implementations produce different hashes for the same inputs → **invalid judgment**.

⸻

## 5. Optional Fields (Allowed)

Optional fields may exist for UI projection or convenience (must not affect meaning unless versioned):

- `explanation` (rendered text projection only; must not add facts)
- `provenance` (expanded provenance fields)
- `data_quality` (deterministic flags only)
- `source_trace` (expandable trace blob/pointers)

⸻

## 5.1 Uncertainty / Confidence Semantics (Frozen)

v1 has one primary axis: **uncertainty**.

- `uncertainty` is deterministic system uncertainty (0..1).
- `confidence` is **derived** only (not authored) and must not be set by LLM.

### Frozen formula

If `confidence` is present:

```
confidence = 1 - uncertainty
```

### Method enums (no free text)

`uncertainty_method` must be one of:

- `RULE_CALIBRATED`
- `DATA_QUALITY_GATED`
- `STATISTICAL_CALIBRATION`

If `confidence` is exposed, `confidence_method` must be:

- `ONE_MINUS_UNCERTAINTY`

⸻

## 5.2 SIGNAL Legality Requirements (Frozen)

If `type = SIGNAL`, the object must satisfy:

- inference must be **IF–THEN conditional** (no prediction language)
- `expires_at` is required (already mandatory in v1)
- `invalidations[]` must exist (reasons that would invalidate the signal)
- must pass an evidence minimum gate (deterministic; otherwise degrade to OBSERVATION)

`invalidations[]` is allowed as an optional field, but becomes mandatory for SIGNAL.

⸻

## 6. Compatibility Rules (Frozen)

- **Adding optional fields is backward-compatible** if it does not change replay meaning.
- If a new field changes meaning, it must:
  - be versioned (rule/scoring/pipeline version bump), and
  - be included in `replay_inputs`, and
  - not break old object replay under old versions.

Rule: **“Everyone can add a field” is illegal unless compatibility is preserved.**

⸻

## 7. Failure Object (v1, Recommended)

v1 should treat failures as auditable, validated objects.

Failure is **not** an Intelligence Object type in v1.  
Use a separate validated `FailureObjectV1`.

Minimum Failure fields:

```
FailureObjectV1 := {
  kind: "FAILURE",
  error_code,
  what_happened,
  what_user_can_do,
  feedback_link,
  trace_id,
  created_at,
  pipeline_version
}
```




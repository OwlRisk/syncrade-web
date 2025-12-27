# Minimal Backend Architecture v1

**Status: Frozen (Engineering Boundary)**

This is not a tech-stack essay. It freezes boundaries so layers cannot be “punched through”.

⸻

## 1. Deterministic Modules (Must be deterministic)

Must be deterministic and replayable:

- Observation aggregation
- Behavioral modeling (rule-based or frozen models)
- Inference layer
- Judgment composer
- Replay hash generation and validation

⸻

## 2. LLM-Allowed Modules (Only)

Allowed LLM usage in v1:

- Intent parsing (structured JSON output)
- Rendering (structured RenderBlocks output)

LLM cannot modify evidence, uncertainty/confidence, windows, or subjects.

⸻

## 3. Minimal Runtime Dependencies

Minimum dependencies (conceptual):

- Data sources (onchain + market/price)
- Indexer/aggregation layer (optional, but must be snapshottable)
- Storage for:
  - dataset snapshots (or snapshot IDs)
  - replayable objects
  - audit logs (trace_id)

⸻

## 4. Validator Gate (Non-negotiable)

System output must pass validators:

- `io-validator` for Intelligence Objects
- `failure-validator` for Failure Objects
- renderer lint (for forbidden lexicon + “no new facts”)



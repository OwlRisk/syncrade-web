# Golden Test Fixtures v1

**Status: Frozen (Engineering Boundary)**

Golden fixtures prevent hallucination and replay drift by locking expected outputs.

⸻

## 1. Fixture Definition

A fixture is:

- `input`: subject + window + dataset_snapshot (+ optional price_snapshot)
- `expected`: validated `IntelligenceObjectV1[]`
- `expected_hashes`: replay_key/evidence_hash values

⸻

## 2. CI Requirements

CI must run:

- `io-validator` on expected objects
- replay hash recomputation (must match)
- renderer lint checks (forbidden lexicon; no new facts)

⸻

## 3. Suggested Directory Layout

```
fixtures/
  v1/
    case-01.json
    case-02.json
```

Each fixture should include:

- `trace_id` (optional)
- `replay_inputs`
- `objects`

See: `fixtures/v1/case-01.json`



# Caching & Determinism Spec v1

**Status: Frozen (Engineering Boundary)**

Caching must not break determinism. Replayability is invalid if cache keys drift.

⸻

## 1. dataset_snapshot Generation Rule (Canonical)

`dataset_snapshot` must be generated deterministically at a defined granularity:

- by block height window and `generated_at` time bucket, or
- by fixed time buckets (minute/hour), depending on data domain

The chosen granularity must be consistent across environments.

⸻

## 2. Cache Key (Hard Rule)

Same `subject_norm + window + dataset_snapshot` must map to the same cache key.

Minimum key components:

- `subject_norm`
- `window.start/end`
- `dataset_snapshot`
- `pipeline_version` (and rule/scoring versions if split)

⸻

## 3. Cache Layers (Allowed)

Allowed caching layers:

- edge (read-only, short TTL)
- server (per-request memoization)
- database/object store (replayable snapshots)

Hard rule:

- caches must not mutate the meaning of objects
- caches must not cause “partial objects” without explicit `PARTIAL_DATA` failure/degrade

⸻

## 4. “Same Question, Different Time” Explanation (Frozen Copy Rule)

When a user repeats a query and results differ, UI must explain deterministically:

- “Results differ because data window/snapshot changed.”

The UI must expose:

- `dataset_snapshot`
- `window`
- `replay_key`



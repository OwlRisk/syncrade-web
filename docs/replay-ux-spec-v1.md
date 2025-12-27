# Replay UX Spec v1

**Status: Frozen (Product Layer)**

Replay is a product feature, not a hidden debug tool.

⸻

## 0. Replay Input Closure (Non-negotiable)

Replay must be defined as a reproducible **input closure**, not a UI button.

Replay inputs include (minimum):

- `subject`
- `window`
- `pipeline_version`
- `rule_params_hash`
- `dataset_snapshot`
- `evidence_hash`
- `price_snapshot` (if price/market data is used anywhere in judgment logic)

`dataset_snapshot` must include:

- data source version(s)
- cutoff block height / timestamp
- price source timestamp (if prices are used)

⸻

## 0.1 Replay Input Canon (Executable)

Replay must be computable identically across languages/runtimes.

- `replay_key = SHA256(canonical_json(replay_inputs))`
- `evidence_hash = SHA256(canonical_json(sorted_normalized_evidence_list))`

Canonical rules:

- JSON: UTF-8, sorted keys, no whitespace
- Evidence sorting: `source` → `metric` → `timestamp` → `reference_id`
- Normalize: `metric` lowercase; timestamps ISO-8601 UTC

If the same inputs yield a different hash on another machine/runtime → replay is broken.

⸻

## 1. Fixed Actions (Every Judgment Page)

Every Judgment / Intelligence Object page must provide:

- **Replay** (shows replay parameters + versions + hash)
- **Copy Judgment ID**
- **View Source Trace** (collapsible)

⸻

## 2. Replay Definition (Frozen)

Replay means:

**Same `subject` + same `window` + same `rule_version` (and pipeline versions) → identical object.**

If it changes, the output is not a Syncrade judgment.

⸻

## 3. Replay Panel (Minimum Fields)

The Replay UI must show:

- `id`
- `subject`
- `window`
- `pipeline_version` / `rule_version` / `scoring_version`
- `data_timestamp`
- `replay_hash` / `replay_key`

⸻

## 4. Old-Version Replay Display

If replay uses older versions:

Show a banner:

**“Generated under vX.Y rules.”**

And display both:

- the original versions
- the current versions (if different)



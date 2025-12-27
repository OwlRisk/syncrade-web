# Observability & Audit Log Spec v1

**Status: Frozen (Engineering Boundary)**

Syncrade is an audit-grade system. Every request must be traceable without leaking sensitive data.

⸻

## 1. trace_id (Required)

- Every request produces a `trace_id`
- `trace_id` is returned to user on success and failure

⸻

## 2. Minimum Audit Log Record

Each request should log (structured):

- `trace_id`
- `received_at`
- `query_intent` (router output)
- `resolved_subject` (normalized subject)
- `window`
- `called_tools` (names only; no secrets)
- `latency_ms`
- `dataset_snapshot`
- `validation_result` (pass/fail + reason)
- `error_code` (if failure)

⸻

## 3. Privacy Principles (Log Hygiene)

- Do not log private keys, secrets, auth tokens
- Do not log full raw payloads by default
- Prefer normalized subjects + hashes over raw input

See: `docs/privacy-retention-v1.md`



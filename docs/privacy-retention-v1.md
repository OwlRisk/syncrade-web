# Privacy & Data Retention v1

**Status: Frozen (Product/Engineering Boundary)**

Wallet inputs are sensitive. v1 must state what is stored and for how long.

⸻

## 1. What We Store (v1)

- `trace_id`
- router output (intent/entities) in structured form
- normalized subject (e.g. address) **may be stored** for auditability
- `dataset_snapshot` identifiers (not raw datasets)
- validation outcomes
- error codes

⸻

## 2. What We Do Not Store (v1)

- private keys / seed phrases
- authentication tokens
- raw upstream payload dumps by default

⸻

## 3. Retention (v1)

Default retention targets (update if policy changes):

- audit logs (trace-level): **30 days**
- feedback reports: **90 days**

⸻

## 4. Deletion Requests (v1)

v1 may not support self-serve deletion. If not supported, UI must state:

- “Deletion requests are not supported in v1.”

⸻

## 5. Redaction Rule

If raw `user_input` is stored for debugging/feedback, it must be:

- explicit (opt-in or error-only)
- redacted where applicable



# Failure & Feedback Protocol v1

**Status: Frozen (Product Layer)**

This protocol freezes failure states and the feedback loop so the UI stays “system-like”.

⸻

## 0. Trace First (Required)

- **All failures must return a copyable `trace_id`.**
- If an object exists, also return `judgment_id`.
- Feedback must default-attach:
  - `trace_id`
  - `user_input`
  - `pipeline_version`
  - `error_class`

This turns feedback into a system capability, not a “page link”.

⸻

## 1. Error Taxonomy (Canonical)

- **No Data**
- **Partial Data**
- **Rate Limit**
- **Unsupported Chain**
- **Internal Error**

⸻

## 2. Required Output Per Failure

Each failure state must render:

- **One sentence**: what happened (non-technical)
- **One sentence**: what you can do
- **One button**: Send feedback (must include `trace_id` and/or `judgment_id`)

Optional:

- Try another window (7d/30d)
- Retry

⸻

## 3. Forbidden Failure Copy

Do not show these words to users:

- “Error”
- “Invalid”
- “Not found”

Use neutral system language:

- “Insufficient data for the selected window.”
- “This chain is not supported yet.”
- “Rate limited. Please retry later.”

⸻

## 4. Feedback Payload (Minimum)

Send feedback must include:

- `trace_id` (always, if available)
- `judgment_id` (if an object exists)
- `subject`
- `window`
- `versions` (pipeline/rule/scoring)

- `user_input`
- `error_class`



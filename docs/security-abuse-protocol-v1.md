# Security & Abuse Protocol v1

**Status: Frozen (Engineering/Product Boundary)**

Syncrade is a system terminal. v1 must be resilient against abuse, injection, and resource exhaustion.

⸻

## 1. Rate Limit (Canonical)

Rate limiting must apply by:

- IP
- session
- endpoint

On limit, return a Failure Object with:

- `error_code = RATE_LIMITED`
- a neutral `what_happened`
- a deterministic `what_user_can_do` (retry later)

See: `docs/error-codes-v1.md`

⸻

## 2. Input Sanitation (Hard Limits)

All inputs must be validated before routing:

- address / tx hash format validation (per supported chain)
- token symbol length limit
- max input length cap (prevent payload abuse)

Invalid input must return a Failure Object (`error_code` in USER_INPUT category).

⸻

## 3. Prompt Injection Defense (Frozen)

LLM outputs must be accepted **only** if they validate as JSON against the expected schema:

- Intent parsing: `QueryIntent` JSON only
- Rendering: `RenderBlocks` JSON only

Any non-schema output is discarded and triggers:

- degrade to deterministic fallback, or
- return Failure Object (if no safe fallback)

LLM must never be treated as an authority source.

⸻

## 4. Deterministic Degradation (No “making something up”)

When dependencies are unavailable:

- **Data source unavailable** → Failure Object with DATA_SOURCE code
- **LLM unavailable** → return validated structured objects + template rendering (no LLM text)

Degradation must be replayable and must not introduce new claims.

⸻

## 5. Resource / Cost Caps (Hard Gate)

Each request must enforce caps:

- max tool calls per request
- max data window span
- max returned object count

If caps are exceeded:

- return Failure Object with `error_code = RESOURCE_LIMIT`




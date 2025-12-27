# Window & Subject Resolution Rules v1

**Status: Frozen (Product/Engineering Boundary)**

Defaults affect meaning. v1 must freeze how subjects, windows, and references are resolved.

⸻

## 1. Default Windows (Who chooses, when)

Hard rule: LLM must not choose defaults that affect meaning.

Default window selection must be deterministic:

- If user specifies a window → use it
- Else use v1 default windows (declare explicitly): `7d` (default), `30d`, `180d`

Only a deterministic rule engine may select between defaults (not LLM).

⸻

## 2. Subject Resolution (Normalization)

Subject must be normalized into a canonical `subject_norm`:

- chain
- address/identifier
- entity type (wallet/token/market/cohort)

Normalization must be deterministic and versioned if changed.

⸻

## 3. Session Reference (“刚刚那个钱包”)

v1 supports session reference with strict limits:

- max 1 active subject reference
- TTL: fixed duration (declare in implementation)
- on ambiguity/conflict: do not guess; return low-confidence router output with exactly 2 options

⸻

## 4. Multi-Subject Inputs

If input contains multiple subjects (e.g., two addresses or address+token):

- Router must output multiple `QueryIntent`s, one per subject
- UI must render as multiple objects, never merged into one judgment



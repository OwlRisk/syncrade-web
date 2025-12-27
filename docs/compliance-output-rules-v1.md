# Compliance Output Rules v1

**Status: Frozen (Product Layer)**

This spec freezes the allowed language patterns and the mandatory compliance UI behavior.

⸻

## 1. Allowed Sentence Templates (Canonical)

Allowed:

- **“If X continues, Y may become more likely…”**
- **“Observed…” / “Changed…” / “Uncertain because…”**
- **“This is consistent with … in the last N days.”**
- **“Uncertainty is high because …”**

All forward-facing language must be conditional and evidence-linked.

⸻

## 2. Allowed vs Forbidden Phrasing (Executable)

| ✅ Allowed framing | ❌ Forbidden phrasing |
|-------------------|----------------------|
| “If X continues, Y may become more likely.” | “You should …” |
| “Observed … in the last N days.” | “Best trade” / “Good entry” |
| “Uncertain because …” | “Target price” / “Guaranteed” |
| “Could be invalidated if …” | “Must …” / coercive language |

These are not “copy suggestions”; they are **lint rules**.

⸻

## 3. Forbidden Lexicon (Minimum)

The renderer must not emit these terms (case/locale variants included):

- entry / exit
- target / TP / SL
- long / short
- guaranteed profit / sure win
- buy / sell
- opportunity
- bullish / bearish

⸻

## 4. Disclaimer Placement Rule (Per Projection)

Every Intelligence Object projection must include a visible disclaimer:

**“⚠️ Informational intelligence only. Not financial advice.”**

Collapsible is allowed, but default must be visible.

⸻

## 5. Risk Prompt Triggers (Mandatory)

If any of the following is true:

- `uncertainty > 0.6`, or
- `data_quality = LOW` (or equivalent deterministic flag), or
- evidence is partial / missing windows

Then the projection must show a **Data Insufficiency** prompt:

- one line: what is insufficient
- one line: what could invalidate
- buttons: Try another window (7d/30d), Send feedback

⸻

## 6. A/B, i18n Safety

Any A/B test, internationalization, or copy change must preserve:

- conditional phrasing
- forbidden lexicon constraints
- disclaimer visibility
- no action commands



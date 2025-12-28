# LLM Usage Contract v1

**Status: Frozen (Engineering/Product Boundary)**

This contract freezes where LLMs are allowed in the system and how cost/boundary drift is prevented.

⸻

## 1. LLM Is Allowed Only For

- **Intent / Entity extraction** (Planner/Router)  
  Output must be structured (plan JSON), never a judgment.
- **Rendering**  
  Convert already-validated objects into neutral human-readable language.

⸻

## 2. Validator Ordering (Non-negotiable)

LLM output must not become user-visible “conclusions” unless:

**Deterministic pipeline → Object validation → Rendering**

LLM must never bypass validation.

⸻

## 3. LLM Is Never Allowed For

- observation aggregation
- behavior modeling
- inference logic
- confidence assignment (for judgments)
- evidence generation
- window selection defaults that affect meaning

⸻

## 4. Cost Control Principles (Frozen)

- Default: **no long context**
- Only invoke Planner on **multi-tool / complex** queries
- Rendering must have a **template fallback** (low-cost mode)
- Cacheable outputs (by replay hash) should not re-call LLM

⸻

## 5. Budget & Degradation Strategy (Frozen)

### Budget

- Per query, the system has a fixed **LLM call budget** (configured).
- If the budget is exceeded: **degrade**, do not “try harder”.

### Degradation (When LLM is unavailable or budget exceeded)

Allowed fallback behaviors:

- return the validated **structured object** (minimal projection), without long explanation
- return **fixed template** explanation (non-LLM)
- show Router understood echo + next steps (no conversational loop)

Forbidden fallback behaviors:

- emitting free-form "judgment text" without a validated object
- asking multi-round questions to compensate

⸻

## 6. Canonical Model Set (Legal LLM Set)

**Status: Frozen — Constitutional Control Layer**

Syncrade recognizes only the following model classes as legal system narrators:

| Class | Purpose | Legal Models |
|-------|---------|--------------|
| PRIMARY_REASONER | Complex intent parsing & structured rendering | gpt-5.2 |
| LOW_COST_RENDERER | Cached / fallback rendering | gpt-5-mini |
| NANO_ROUTER | High-throughput routing / classification | gpt-5-nano |

**All other models are illegal for production judgment rendering.**

Any attempt to introduce a new model class requires:
- protocol version bump
- migration doc
- replay compatibility proof

⸻

## 7. Model Role Separation Law

| Role | Allowed Model | Forbidden |
|------|---------------|-----------|
| Planner / Router | gpt-5.2 / gpt-5-nano | Any open-weight LLM |
| Judgment Rendering | gpt-5.2 / gpt-5-mini | Community / uncensored / experimental models |
| Explanation Fallback | gpt-5-mini | All others |

**Open models may be used only in R&D sandboxes, never in canonical judgment paths.**

⸻

## 8. Determinism Guard

All model calls must be wrapped with:

- `model_version_hash`
- `prompt_template_hash`
- `temperature = 0`

so that:

**Same object → same rendered explanation → replayable**

⸻

## 9. Model Switching Governance

**Model switching is NOT a config change.  
It is a constitutional event.**

Switching PRIMARY_REASONER requires:
- new Authority Protocol version
- replay audit pass
- golden-fixture regression
- migration doc

⸻

## 10. Cost Discipline Law

- All PRIMARY_REASONER calls are budgeted & metered
- Cached replay renders must never re-invoke PRIMARY_REASONER
- Rendering must auto-degrade to gpt-5-mini when budget pressure occurs
- Hard cap per query is enforced at Router level

⸻

## 11. Forbidden Model Classes

| Forbidden | Reason |
|-----------|--------|
| uncensored / jailbreak models | Non-auditable |
| community tuned LLMs | Non-deterministic |
| local ad-hoc LLMs | Replay impossible |
| vendor-rotating LLMs | Authority instability |

⸻

## 12. Frozen Clause

**Syncrade does not "use models".  
Syncrade binds authority to a canonical reasoning engine.**

**Model drift = Authority drift = System invalid.**



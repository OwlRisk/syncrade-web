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

- emitting free-form “judgment text” without a validated object
- asking multi-round questions to compensate



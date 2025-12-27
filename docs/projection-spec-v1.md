# Syncrade Projection Spec v1

**Status: Frozen (Product Layer)**

This spec freezes how an `IntelligenceObject` must be projected into Web UI modules.

⸻

## 0. Principle

**Object → UI is a fixed mapping.**  
UI is a projection of authority, not a layout for “pretty content”.

**Forbidden:** reordering, hiding, or “summarizing away” canonical fields for aesthetics.

⸻

## 1. Object → Module Mapping (Type decides structure)

`type` determines the module identity and required module set:

| Object type | UI module identity | Primary purpose |
|------------|--------------------|-----------------|
| OBSERVATION | Observation module | Deterministic fact projection |
| SIGNAL | Signal module | Conditional, future-facing inference |
| INSIGHT | Insight module | Stable behavior shift summary (non-signal) |
| RISK | Risk module | Risk classification & stability |
| BEHAVIOR | Behavior module | Persona / behavioral profile |

If an object cannot be mapped, it **must not render** as a “free text card”.

⸻

## 2. Canonical Module Order (Non-negotiable)

Every object projection must render sections in this exact order:

1) **Conclusion** (structured inference summary)  
2) **Evidence** (metrics / pointers / source window)  
3) **Uncertainty** (why uncertain, what could invalidate)  
4) **Window / Expiry** (`window.start`, `window.end`, `expires_at`)  
5) **Provenance** (`pipeline_version`, `rule_version`, `scoring_version`, `data_timestamp`)  
6) **Replay** (`judgment_id`, `replay_hash` / `replay_key`, replay parameters)

**UI must not move “Evidence” below “Conclusion”, and must not hide “Window/Expiry/Provenance/Replay”.**

⸻

## 3. Mandatory Fields (Must be visible)

The following must exist in the projection (collapsible is allowed, but **must exist**):

- `window` and `expires_at`
- `data_timestamp`
- `pipeline_version` and/or `rule_version` (if both exist, show both)
- `replay_hash` / `replay_key`
- stable `id` (copyable)

**Collapsing rule:** `Replay` and `Source Trace` may be collapsed, but the user must see that they exist.

⸻

## 4. No “Marketing UI” Transformations

Forbidden UI behaviors:

- Rewriting conclusions into CTAs
- Highlighting trades, entries, targets, “buy/sell”
- Removing uncertainty
- Omitting expiry or time window
- Injecting additional claims not present in object fields

Allowed UI behaviors:

- Neutral typography and layout consistency
- Copy buttons (ID / hash)
- Expand/collapse for trace blocks
- Time-stamped logs

⸻

## 5. Projection Minimal Template (Terminal)

Minimum terminal projection:

```
<Type> — <Subject>

Conclusion
- ...

Evidence
- ...

Uncertainty
- ...

Window / Expiry
- window: ...
- expires_at: ...

Provenance
- pipeline_version: ...
- rule_version: ...
- data_timestamp: ...

Replay
- judgment_id: ...
- replay_hash: ...
```



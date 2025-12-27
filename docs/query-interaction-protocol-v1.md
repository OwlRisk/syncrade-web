# Query Interaction Protocol v1

**Status: Frozen (Product Layer)**

This spec freezes the interaction model so Syncrade does not drift into “ChatGPT-style” behavior.

⸻

## 0. Homepage Interaction Model (唯一主页交互模型)

Homepage is always:

- a **single input field**
- a **system response panel** (not a chat transcript)

After routing, the UI must show a neutral “understood” echo:

- **What** the system understood (intent + entities + window)
- without exposing internal commands/tool calls

Example (UI echo):

- Understood: Wallet analysis · 7d window · address: 0x…

Rule: even on failure, the UI must always provide a **next step** (see Failure states).

⸻

## 1. Single Input Field (Accepted Inputs)

The single input field must accept:

- **wallet address**
- **token contract**
- **tx hash**
- **natural-language question**

No multi-step “wizard” flows.

⸻

## 2. Router Minimum Output (Canonical)

The Router must output a minimal structured object:

```
RouterOutput := {
  intent,
  entities,
  time_window,
  confidence,       // router confidence, not model confidence
  fallback_reason   // if confidence is low
}
```

The UI must render from RouterOutput + downstream deterministic pipeline outputs.

⸻

## 3. Low-Confidence Behavior (唯一允许行为)

If `confidence` is below the threshold (system-configured), the system must:

- **not** ask 3 rounds of follow-up questions
- provide **exactly two** options: “你可能想做的是…”
- allow the user to pick one option to proceed

Example:

- Option A: Analyze this wallet (7d)
- Option B: Analyze this token (30d)

If no reasonable options exist: return an **Unsupported** failure state (see Failure & Feedback Protocol).

⸻

## 4. No-Data / Insufficient-Data States (Fixed UI)

When data is missing or insufficient, the UI must show:

- **One line**: what happened (non-technical)
- **One line**: what you can do
- **Buttons**:
  - Try another window (7d / 30d)
  - Send feedback

Forbidden text: “Error”, “Invalid”, “Not found”.

⸻

## 5. Anti-Chat Drift Rules

Forbidden:

- “Let’s think step by step…”
- open-ended back-and-forth conversational probing
- personality roleplay

Allowed:

- deterministic routing + deterministic judgment + neutral rendering
- structured alternative actions (two options only on low confidence)



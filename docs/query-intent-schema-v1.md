# QueryIntent Schema v1

**Status: Frozen (Engineering Boundary)**

This is the single source of truth for LLM intent parsing output.

⸻

## 1. Schema (v1)

LLM output must validate as JSON with:

```
QueryIntentV1 := {
  intent,            // ENUM (frozen): WALLET_ANALYZE | TOKEN_ANALYZE | TX_ANALYZE | QUESTION
  entities,          // { wallets?: [], tokens?: [], txs?: [] } (strings)
  time_window,       // ENUM (frozen): D7 | D30 | D180 | UNSPECIFIED
  confidence,        // numeric 0..1 (router confidence only)
  fallback_reason?   // string (required when confidence below threshold)
}
```

Hard rules:

- if schema validation fails → discard output and degrade deterministically
- LLM must not output user-visible narrative here



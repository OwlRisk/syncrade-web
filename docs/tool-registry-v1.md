# Tool Registry / Data Domain Map v1

**Status: Frozen (Engineering Boundary)**

Router/Orchestrator behavior must be deterministic. This map defines required vs optional domains per intent.

⸻

## Data Domains

| domain | examples | required? | degrade if missing |
|--------|----------|----------:|--------------------|
| onchain_transfers | token transfers | YES | FAILURE(PARTIAL_DATA/NO_DATA) |
| dex_trades | swaps, fills | OPTIONAL | degrade to OBSERVATION |
| price | spot price, candles | OPTIONAL/YES (depends) | if used for meaning → must snapshot; else omit |
| liquidity | pools, depth | OPTIONAL | degrade to OBSERVATION |
| labels | tags, clustering labels | OPTIONAL | omit |

⸻

## Intent → Required Domains

| intent | required domains | optional domains |
|--------|------------------|-----------------|
| WALLET_ANALYZE | onchain_transfers | labels, price |
| TOKEN_ANALYZE | onchain_transfers | dex_trades, price, liquidity |
| TX_ANALYZE | onchain_transfers | price |
| QUESTION | depends on router resolution | depends |

Hard rule:

- if any required domain is missing → deterministic Failure Object (NO_DATA/PARTIAL_DATA/UNSUPPORTED_DATA_DOMAIN)



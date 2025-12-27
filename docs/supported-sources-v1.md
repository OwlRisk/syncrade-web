# Supported Sources Declaration v1

**Status: Frozen (Product Layer)**

This document defines what data Syncrade v1 can and cannot resolve.  
Unsupported inputs must degrade into explicit failure codes (no silent emptiness).

⸻

## 1. Supported Chains (v1)

v1 supported chains are explicitly declared:

- **Ethereum (mainnet)**: supported
- **Base**: supported
- **Solana**: **not supported** in v1 → return `UNSUPPORTED_CHAIN`

⸻

## 2. Supported Data Domains (v1)

Supported domains per chain (v1):

### Ethereum (mainnet)

- Transactions (tx): supported
- Token transfers: supported
- DEX trades: supported (if indexer/source available)
- Price: supported (snapshotted; required if used in judgment meaning)
- Liquidity: supported (if indexer/source available)

### Base

- Transactions (tx): supported
- Token transfers: supported
- DEX trades: supported (if indexer/source available)
- Price: supported (snapshotted; required if used in judgment meaning)
- Liquidity: supported (if indexer/source available)

### Solana

- Not supported in v1 → return `UNSUPPORTED_CHAIN`

If a domain is missing, it must not be implied by UI wording.

⸻

## 3. Freshness / SLA (v1)

Declare measurable freshness targets:

- **price snapshot**: ≤ 60s staleness (snapshot timestamp must be included)
- **onchain snapshot**: ≤ 1 block behind finalized head (snapshot cutoff must be included)
- **aggregation**: ≤ 5min refresh for derived aggregates (if used)

⸻

## 4. Unsupported Behavior (Failure Codes)

If input is unsupported, return a Failure Object with `error_code`:

- `UNSUPPORTED_CHAIN`
- `UNSUPPORTED_DATA_DOMAIN`
- `UNSUPPORTED_ASSET_TYPE`

See: `docs/error-codes-v1.md`



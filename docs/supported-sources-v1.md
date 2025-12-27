# Supported Sources Declaration v1

**Status: Frozen (Product Layer)**

This document defines what data Syncrade v1 can and cannot resolve.  
Unsupported inputs must degrade into explicit failure codes (no silent emptiness).

⸻

## 1. Supported Chains (v1)

**Declare explicitly in implementation** (v1 must not claim “all chains”).

Example structure (update as you implement):

- Ethereum: TBD
- Base: TBD
- Solana: TBD

⸻

## 2. Supported Data Domains (v1)

Declare explicitly per chain:

- Transactions (tx)
- Token transfers
- DEX trades
- Price
- Liquidity

If a domain is missing, it must not be implied by UI wording.

⸻

## 3. Freshness / SLA (v1)

Declare measurable freshness targets:

- price: TBD (e.g., 30s)
- onchain: TBD (e.g., 1 block)
- aggregation: TBD (e.g., 5min)

⸻

## 4. Unsupported Behavior (Failure Codes)

If input is unsupported, return a Failure Object with `error_code`:

- `UNSUPPORTED_CHAIN`
- `UNSUPPORTED_DATA_DOMAIN`
- `UNSUPPORTED_ASSET_TYPE`

See: `docs/error-codes-v1.md`



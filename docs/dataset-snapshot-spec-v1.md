# Dataset Snapshot Specification v1

**Status: Frozen (Engineering Boundary)**

This document freezes the canonical format for `dataset_snapshot` identifiers, ensuring deterministic replayability.

⸻

## 1. Canonical Format (Frozen)

**Format:**
```
dataset_snapshot := "${source}:${chain}:${block_range}:${generated_at}"
```

**Components:**

| Component | Format | Example |
|-----------|--------|---------|
| `source` | Lowercase identifier | `onchain`, `price`, `derived` |
| `chain` | Chain identifier | `ethereum`, `base`, `solana` |
| `block_range` | Block range or time bucket | `20500000-20501000` or `2026-01-03T02:00:00Z` |
| `generated_at` | ISO-8601 UTC timestamp | `2026-01-03T02:00:00Z` |

⸻

## 2. Source Identifiers (Frozen)

**Legal source values:**

| Source | Meaning | Block Range Format |
|--------|---------|-------------------|
| `onchain` | On-chain data (transactions, balances, logs) | Block height range: `{start}-{end}` |
| `price` | Price data (from price API) | Time bucket: ISO-8601 timestamp |
| `derived` | Derived/computed data (aggregations, metrics) | Time bucket: ISO-8601 timestamp |

⸻

## 3. Chain Identifiers (Frozen)

**Legal chain values:**

| Chain | Identifier | Block Format |
|-------|------------|--------------|
| Ethereum Mainnet | `ethereum` | Block number |
| Base Mainnet | `base` | Block number |
| Solana Mainnet | `solana` | Slot number |

**For Authority Kernel v1:** Only `base` is supported.

⸻

## 4. Block Range Format (Frozen)

**For on-chain data:**

```
block_range := "${start_block}-${end_block}"
```

**Rules:**
- `start_block` and `end_block` are decimal integers
- `start_block <= end_block`
- No leading zeros
- Example: `20500000-20501000`

**For price/derived data:**

```
block_range := "${time_bucket}"
```

**Time bucket format:** ISO-8601 UTC timestamp (minute precision)
- Example: `2026-01-03T02:00:00Z`

⸻

## 5. Generated At Timestamp (Frozen)

**Format:** ISO-8601 UTC timestamp

**Precision:** Minute (for v1)

**Example:** `2026-01-03T02:00:00Z`

**Meaning:** The timestamp when the dataset snapshot was generated/cutoff.

⸻

## 6. Complete Examples (Frozen)

### Example 1: On-chain Data (Base)

```
onchain:base:20500000-20501000:2026-01-03T02:00:00Z
```

**Meaning:**
- Source: On-chain data
- Chain: Base
- Block range: 20500000 to 20501000
- Generated at: 2026-01-03 02:00:00 UTC

### Example 2: Price Data

```
price:base:2026-01-03T02:00:00Z:2026-01-03T02:00:00Z
```

**Meaning:**
- Source: Price data
- Chain: Base (price source context)
- Time bucket: 2026-01-03 02:00:00 UTC
- Generated at: 2026-01-03 02:00:00 UTC

### Example 3: Derived Data

```
derived:base:2026-01-03T02:00:00Z:2026-01-03T02:00:00Z
```

**Meaning:**
- Source: Derived/computed metrics
- Chain: Base
- Time bucket: 2026-01-03 02:00:00 UTC
- Generated at: 2026-01-03 02:00:00 UTC

⸻

## 7. Generation Rules (Frozen)

### 7.1 On-chain Snapshot Generation

**When:** After fetching on-chain data for a window

**Algorithm:**
1. Fetch data for window: `[start_block, end_block]`
2. Record actual block range fetched: `actual_start` to `actual_end`
3. Record generation timestamp: `generated_at` (current time, minute precision)
4. Generate: `onchain:${chain}:${actual_start}-${actual_end}:${generated_at}`

**Hard rule:** `generated_at` must be the timestamp when data fetch completed, not when query started.

### 7.2 Price Snapshot Generation

**When:** After fetching price data

**Algorithm:**
1. Fetch price data for time bucket: `time_bucket` (minute precision)
2. Record generation timestamp: `generated_at` (current time, minute precision)
3. Generate: `price:${chain}:${time_bucket}:${generated_at}`

⸻

## 8. Authority Kernel v1 Scope (Frozen)

**v1 only generates ONE snapshot type:**

- **Source:** `onchain`
- **Chain:** `base`
- **Format:** `onchain:base:${start_block}-${end_block}:${generated_at}`

**Example for Authority Kernel v1:**
```
onchain:base:20500000-20501000:2026-01-03T02:00:00Z
```

⸻

## 9. Replay Compatibility (Frozen)

**Hard rule:** 

A `dataset_snapshot` identifier must be:
- **Deterministic**: Same data → same identifier
- **Unique**: Different data → different identifier
- **Replayable**: Given the identifier, the system must be able to fetch the same data snapshot (if stored) or indicate the snapshot is no longer available

**Storage requirement:**

For replay to work, the system must either:
1. Store the raw data snapshot by identifier, OR
2. Store metadata sufficient to refetch the same data (block range, timestamp, source)

⸻

## 10. Validation Rules (Frozen)

**A `dataset_snapshot` string is valid if:**

1. Matches format: `${source}:${chain}:${block_range}:${generated_at}`
2. `source` is in legal set: `onchain`, `price`, `derived`
3. `chain` is in legal set: `ethereum`, `base`, `solana` (v1: only `base`)
4. `block_range` matches format for source type
5. `generated_at` is valid ISO-8601 UTC timestamp

**Invalid examples:**
- `onchain:base:20500000:2026-01-03T02:00:00Z` (missing end block)
- `onchain:base:20500000-20501000` (missing generated_at)
- `unknown:base:20500000-20501000:2026-01-03T02:00:00Z` (invalid source)


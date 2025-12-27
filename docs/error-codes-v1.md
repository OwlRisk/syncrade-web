# Error Codes Dictionary v1

**Status: Frozen (Product/Engineering Boundary)**

Failure codes must be enumerable and stat-trackable.

⸻

## Categories

- **USER_INPUT**: user supplied unsupported/invalid target
- **DATA_SOURCE**: third-party/onchain data unavailable or partial
- **SYSTEM**: internal errors

⸻

## Codes (v1)

| error_code | category | meaning | suggested HTTP |
|-----------|----------|---------|----------------|
| UNSUPPORTED_CHAIN | USER_INPUT | chain not supported in v1 | 400 |
| UNSUPPORTED_ASSET_TYPE | USER_INPUT | asset type not supported | 400 |
| UNSUPPORTED_DATA_DOMAIN | USER_INPUT | requested domain not supported | 400 |
| NO_DATA | DATA_SOURCE | no data for window/subject | 404 |
| PARTIAL_DATA | DATA_SOURCE | incomplete data; degraded output | 206 |
| RATE_LIMITED | DATA_SOURCE | upstream or system rate limited | 429 |
| INTERNAL_ERROR | SYSTEM | unexpected internal failure | 500 |

Rule: UI copy must not show “Error/Invalid/Not found” even if HTTP status is non-200.



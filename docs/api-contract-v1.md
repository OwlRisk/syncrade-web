# API Contract v1

**Status: Frozen (Engineering Boundary)**

Minimal API contract to prevent schema drift.  
All objects must validate against `docs/intelligence-object-schema-v1.md`.

⸻

## 1. POST /query

**Request**

```
{
  "user_input": "string"
}
```

**Response**

```
{
  "trace_id": "string",
  "objects": [ IntelligenceObjectV1 ],
  "failures": [ FailureObjectV1 ]  // optional
}
```

Rules:

- `objects[]` must pass `io-validator`
- `failures[]` must pass `failure-validator`
- `objects[]` must include replay inputs sufficient to reproduce (`window`, `dataset_snapshot`, versions, `replay_key`)

⸻

## 2. POST /render (optional)

**Request**

```
{
  "trace_id": "string",
  "objects": [ IntelligenceObjectV1 ]
}
```

**Response**

```
{
  "trace_id": "string",
  "render_blocks": [ RenderBlock ]
}
```

Rule: Render output must not add facts beyond object fields.

⸻

## 3. GET /replay/:replay_key

**Response**

```
{
  "trace_id": "string",
  "objects": [ IntelligenceObjectV1 ]
}
```

Hard rule: `/replay/:replay_key` must return the **same objects byte-for-byte** (canonical JSON) for the same key.

⸻

## 4. RenderBlock (v1)

Render blocks are UI projection artifacts (not Intelligence Objects).

```
RenderBlock := {
  "type": "SUMMARY" | "CONCLUSION" | "EVIDENCE" | "UNCERTAINTY" | "PROVENANCE" | "REPLAY",
  "content": {}
}
```

`SUMMARY` is allowed only as RenderBlock.

⸻

## 5. Request/Response Examples (Frozen)

### 5.1 POST /v1/query - Example Request

**Request:**
```json
{
  "user_input": "0x1111111111111111111111111111111111111111"
}
```

**Response (Success):**
```json
{
  "trace_id": "550e8400-e29b-41d4-a716-446655440000",
  "objects": [
    {
      "id": "syncrade:behavior:base:2026-01-03:0x1111:30d:01",
      "type": "BEHAVIOR",
      "subject": {
        "chain": "base",
        "type": "wallet",
        "address": "0x1111111111111111111111111111111111111111"
      },
      "window": {
        "start": "2025-12-04T00:00:00Z",
        "end": "2026-01-03T00:00:00Z"
      },
      "model": {
        "pipeline_version": "JUDGMENT_PIPELINE_v1.0",
        "rule_version": "RULES_v1.0",
        "scoring_version": "SCORING_v1.0"
      },
      "inference": {
        "behavior_pattern": "accumulation",
        "magnitude": "noticeable"
      },
      "uncertainty": 0.27,
      "uncertainty_method": "RULE_CALIBRATED",
      "evidence": [
        {
          "source": "onchain",
          "metric": "net_inflow",
          "value": 1.5,
          "timestamp": "2026-01-03T00:00:00Z",
          "reference_id": "base:20500000-20501000"
        }
      ],
      "data_timestamp": "2026-01-03T00:00:00Z",
      "expires_at": "2026-01-03T06:00:00Z",
      "replay": {
        "replay_key": "abc123...",
        "dataset_snapshot": "onchain:base:20500000-20501000:2026-01-03T02:00:00Z",
        "evidence_hash": "def456...",
        "replay_inputs": {
          "subject_norm": {
            "chain": "base",
            "type": "wallet",
            "address": "0x1111111111111111111111111111111111111111"
          },
          "window": {
            "start": "2025-12-04T00:00:00Z",
            "end": "2026-01-03T00:00:00Z"
          },
          "pipeline_version": "JUDGMENT_PIPELINE_v1.0",
          "rule_version": "RULES_v1.0",
          "scoring_version": "SCORING_v1.0",
          "dataset_snapshot": "onchain:base:20500000-20501000:2026-01-03T02:00:00Z",
          "evidence_hash": "def456..."
        }
      },
      "safety_notice": "⚠️ Informational intelligence only. Not financial advice."
    }
  ],
  "failures": []
}
```

**Response (Failure):**
```json
{
  "trace_id": "550e8400-e29b-41d4-a716-446655440000",
  "objects": [],
  "failures": [
    {
      "error_code": "UNSUPPORTED_CHAIN",
      "what_happened": "Chain 'solana' is not supported in v1",
      "what_user_can_do": [
        "Try a wallet on Ethereum or Base",
        "Send feedback with trace_id: 550e8400-e29b-41d4-a716-446655440000"
      ],
      "trace_id": "550e8400-e29b-41d4-a716-446655440000",
      "feedback_link": "/feedback?trace_id=550e8400-e29b-41d4-a716-446655440000"
    }
  ]
}
```

⸻

### 5.2 POST /v1/render - Example Request

**Request:**
```json
{
  "trace_id": "550e8400-e29b-41d4-a716-446655440000",
  "objects": [
    {
      "id": "syncrade:behavior:base:2026-01-03:0x1111:30d:01",
      "type": "BEHAVIOR",
      ...
    }
  ]
}
```

**Response:**
```json
{
  "trace_id": "550e8400-e29b-41d4-a716-446655440000",
  "render_blocks": [
    {
      "type": "CONCLUSION",
      "content": {
        "text": "Wallet shows accumulation behavior over the last 30 days.",
        "uncertainty": 0.27
      }
    },
    {
      "type": "EVIDENCE",
      "content": {
        "items": [
          {
            "source": "onchain",
            "metric": "net_inflow",
            "value": 1.5,
            "timestamp": "2026-01-03T00:00:00Z"
          }
        ]
      }
    },
    {
      "type": "PROVENANCE",
      "content": {
        "window": "2025-12-04 to 2026-01-03",
        "dataset_snapshot": "onchain:base:20500000-20501000:2026-01-03T02:00:00Z",
        "pipeline_version": "JUDGMENT_PIPELINE_v1.0"
      }
    },
    {
      "type": "REPLAY",
      "content": {
        "replay_key": "abc123...",
        "replay_url": "/v1/replay/abc123..."
      }
    }
  ]
}
```

⸻

### 5.3 GET /v1/replay/:replay_key - Example Response

**Request:**
```
GET /v1/replay/abc123...
```

**Response:**
```json
{
  "trace_id": "550e8400-e29b-41d4-a716-446655440000",
  "objects": [
    {
      "id": "syncrade:behavior:base:2026-01-03:0x1111:30d:01",
      "type": "BEHAVIOR",
      ...
    }
  ]
}
```

**Hard rule:** Response must be byte-identical to original query response for the same `replay_key`.



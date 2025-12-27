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



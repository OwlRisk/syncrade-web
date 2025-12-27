# RenderBlocks Schema v1

**Status: Frozen (Engineering Boundary)**

RenderBlocks are UI projection artifacts. They must be traceable back to validated object fields.

⸻

## 1. Schema (v1)

```
RenderBlocksV1 := {
  trace_id,
  blocks: RenderBlockV1[]
}

RenderBlockV1 := {
  type,               // ENUM: SUMMARY | CONCLUSION | EVIDENCE | UNCERTAINTY | PROVENANCE | REPLAY | FAILURE
  object_id?,         // which IntelligenceObject this block references
  field_paths?,       // array of field paths used, e.g. ["inference", "evidence[0].metric"]
  content             // JSON payload for renderer (must not add facts)
}
```

Hard rules:

- if schema validation fails → discard output and degrade deterministically
- every CONCLUSION/SUMMARY block must include `object_id` + `field_paths`
- renderer must not introduce claims that are not traceable to `field_paths`



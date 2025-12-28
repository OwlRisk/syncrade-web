# Prompt Templates v1

**Status: Frozen (Engineering Boundary)**

This document freezes LLM prompt templates, versioning rules, and hash computation for Authority Kernel v1.

⸻

## 1. Prompt Versioning Rule (Frozen)

**Every prompt template must have:**
- A version identifier (semantic versioning: `v1.0.0`)
- A canonical hash (SHA256 of canonical prompt string)
- A frozen template string (no runtime variable injection that changes meaning)

**Version bump rules:**
- **Major** (`v1.0.0` → `v2.0.0`): Template structure changes, output schema changes
- **Minor** (`v1.0.0` → `v1.1.0`): Template wording changes that may affect output quality
- **Patch** (`v1.0.0` → `v1.0.1`): Whitespace/formatting only (hash may change, but meaning unchanged)

⸻

## 2. Prompt Hash Computation (Canonical)

**Canonical prompt string generation:**

1. **Template string**: Remove all variable placeholders, replace with `{{PLACEHOLDER}}` markers
2. **Normalize whitespace**: Single spaces, no trailing whitespace, Unix line endings (`\n`)
3. **Sort variables**: If template has multiple variable sections, sort by placeholder name
4. **Canonical JSON**: Serialize as JSON string (UTF-8, sorted keys, no whitespace)

**Hash computation:**
```
prompt_hash = SHA256(canonical_prompt_string)
```

**Example:**
```
Template: "Analyze wallet {{wallet_address}} for behavior in {{window}}"
Canonical: "Analyze wallet {{wallet_address}} for behavior in {{window}}"
Hash: SHA256(canonical)
```

⸻

## 3. Prompt Storage (Frozen)

**Location:**
- Prompts must be stored in version-controlled files
- Path: `backend/app/prompts/{role}/{template_name}_v{version}.txt`
- Example: `backend/app/prompts/renderer/behavior_object_v1.0.0.txt`

**Metadata file:**
- Each prompt directory must have `prompts_manifest.json`:
```json
{
  "templates": {
    "behavior_object_v1.0.0": {
      "role": "renderer",
      "version": "1.0.0",
      "hash": "abc123...",
      "output_schema": "render-blocks-v1.schema.json",
      "frozen_at": "2026-01-03T00:00:00Z"
    }
  }
}
```

⸻

## 4. Authority Kernel v1 Prompts (Frozen)

### 4.1 Renderer Prompt (OBSERVATION Object)

**Template:** `renderer/observation_object_v1.0.0.txt`

**Purpose:** Convert OBSERVATION Intelligence Object → RenderBlocks JSON

**Output Schema:** `schemas/render-blocks-v1.schema.json`

**Template (v1.0.0):**
```
You are a neutral narrator for a market intelligence system.

Convert the following Intelligence Object into RenderBlocks for UI display.

Rules:
- Output ONLY valid JSON matching render-blocks-v1.schema.json
- Do not add facts beyond what is in the Intelligence Object
- Use only allowed phrasing (see compliance-output-rules-v1.md)
- Forbidden words: buy, sell, entry, exit, target, long, short, bullish, bearish

Intelligence Object:
{{intelligence_object_json}}

Output RenderBlocks JSON:
```

**Hash:** (computed at template freeze time)

**Version:** `v1.0.0`

**Frozen at:** `2026-01-03T00:00:00Z`

⸻

## 5. Prompt Usage Rules (Frozen)

**Hard rules:**

1. **No runtime prompt modification**: Prompts are loaded from files, not constructed dynamically
2. **Hash verification**: Before using a prompt, verify its hash matches manifest
3. **Version tracking**: Every LLM call must log: `prompt_version`, `prompt_hash`, `model`, `role`
4. **Fallback**: If prompt file missing or hash mismatch → use template fallback (no LLM call)

⸻

## 6. Template Fallback (No LLM)

**When LLM is unavailable or prompt invalid:**

**Observation Object → RenderBlocks fallback:**
```json
{
  "blocks": [
    {
      "type": "CONCLUSION",
      "content": {
        "text": "Wallet behavior: {{inference.behavior_pattern}}",
        "uncertainty": {{uncertainty}}
      }
    },
    {
      "type": "EVIDENCE",
      "content": {
        "items": {{evidence}}
      }
    },
    {
      "type": "PROVENANCE",
      "content": {
        "window": "{{window.start}} to {{window.end}}",
        "dataset_snapshot": "{{dataset_snapshot}}"
      }
    }
  ]
}
```

**This is deterministic template substitution, not LLM output.**

⸻

## 7. Prompt Change Governance (Frozen)

**To change a prompt:**

1. Create new version file: `{template_name}_v{new_version}.txt`
2. Compute canonical hash
3. Update `prompts_manifest.json`
4. Test with golden fixtures
5. Deploy with new `pipeline_version` or `rule_version` bump

**Hard rule:** Old prompt versions must remain accessible for replay compatibility.

⸻

## 8. Authority Kernel v1 Scope (Frozen)

**v1 only uses ONE prompt:**

- **Role:** `renderer`
- **Template:** `observation_object_v1.0.0`
- **Purpose:** Render OBSERVATION Intelligence Objects only

**No other prompts in v1.**

**Intent parsing in v1:** LLM allowed (per `docs/kernel-bring-up-spec-v1.md`), but must output structured JSON only.


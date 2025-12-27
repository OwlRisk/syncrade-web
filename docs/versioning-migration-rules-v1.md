# Versioning & Migration Rules v1

**Status: Frozen (Engineering Boundary)**

Versioning must make replay stable across time and releases.

⸻

## 1. Naming Conventions (Canonical)

- `pipeline_version`: `JUDGMENT_PIPELINE_v{major}.{minor}`
- `rule_version`: `RULES_v{major}.{minor}`
- `scoring_version`: `SCORING_v{major}.{minor}`

⸻

## 2. When to Bump Major vs Minor

Bump **major** when:

- object meaning changes
- thresholds change
- replay input closure changes
- evidence canonicalization changes

Bump **minor** when:

- non-semantic fields added (optional fields)
- performance improvements without meaning change

⸻

## 3. Migration & Replay Guarantees

- Old objects must remain replayable under their original versions.
- New versions must not invalidate old replay keys.

⸻

## 4. Golden Fixtures Gate (Release Blocker)

Golden fixtures must exist for each major version.

Hard rule:

- If fixtures for a major version fail → release is blocked.

See: `docs/golden-fixtures-v1.md`



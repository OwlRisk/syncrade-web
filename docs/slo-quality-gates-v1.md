# SLO / Quality Gates v1

**Status: Frozen (Product Layer)**

If quality gates fail, Syncrade must not “say something anyway”.

⸻

## 1. When to Return Failure Object (Mandatory)

Return Failure Object instead of partial narrative when:

- evidence is missing below minimum requirements
- validation fails (`io-validator` fail)
- data domain required by intent is unsupported
- determinism cannot be guaranteed (missing snapshot/version)
- authority minimum set is missing (dataset_snapshot / pipeline_version / replay_key / trace_id) for a conclusion-capable output

⸻

## 2. Minimum Evidence Requirement (Gate)

If `EvidencePointer` / `Evidence` is insufficient:

- do not generate SIGNAL/INSIGHT/RISK
- either degrade to OBSERVATION (if deterministic facts exist), or
- return Failure Object (NO_DATA / PARTIAL_DATA)

⸻

## 3. Strong Conclusion Gate (Multi-signal Agreement)

“Strong” conclusions require deterministic agreement across multiple dimensions.

If agreement is not satisfied:

- increase uncertainty / downgrade severity, or
- output OBSERVATION only

LLM must not “strengthen” conclusions.



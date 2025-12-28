"""
Replay Hash Generation (Canonical)
Generates deterministic replay hashes for Intelligence Objects.
"""
import hashlib
import json
from typing import Dict, Any


def canonical_json(obj: Dict[str, Any]) -> str:
    """
    Generate canonical JSON string.
    
    Ensures consistent serialization:
    - Sorted keys
    - No extra whitespace
    - Consistent separators
    """
    return json.dumps(
        obj,
        sort_keys=True,
        separators=(',', ':'),
        ensure_ascii=False
    )


def generate_replay_hash(replay_inputs: Dict[str, Any]) -> str:
    """
    Generate SHA256 hash of canonical replay inputs.
    
    This hash must be deterministic: same inputs → same hash.
    
    Args:
        replay_inputs: Dictionary containing:
            - subject_norm: Normalized subject
            - window: Time window
            - pipeline_version: Pipeline version
            - dataset_snapshot: Dataset snapshot identifier
            - evidence_hash: Hash of evidence (optional)
    
    Returns:
        Hexadecimal SHA256 hash string
    """
    canonical = canonical_json(replay_inputs)
    return hashlib.sha256(canonical.encode('utf-8')).hexdigest()


def generate_trace_id() -> str:
    """Generate a unique trace ID for request tracking."""
    import uuid
    return str(uuid.uuid4())


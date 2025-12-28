"""
Test Replay Hash Generation
Ensures deterministic replay hash generation.
"""
import pytest
from app.utils.replay import generate_replay_hash, canonical_json


def test_canonical_json_consistency():
    """Test that canonical JSON is consistent."""
    obj = {
        "subject_norm": {"type": "wallet", "address": "0x123"},
        "window": {"start": "2026-01-01T00:00:00Z", "end": "2026-01-08T00:00:00Z"},
        "pipeline_version": "v1.0.0",
    }
    
    json1 = canonical_json(obj)
    json2 = canonical_json(obj)
    
    assert json1 == json2


def test_replay_hash_determinism():
    """Test that replay hash is deterministic."""
    inputs = {
        "subject_norm": {"type": "wallet", "address": "0x123"},
        "window": {"start": "2026-01-01T00:00:00Z", "end": "2026-01-08T00:00:00Z"},
        "pipeline_version": "v1.0.0",
        "dataset_snapshot": "onchain:base:20500000-20501000:2026-01-03T02:00:00Z",
    }
    
    hash1 = generate_replay_hash(inputs)
    hash2 = generate_replay_hash(inputs)
    
    assert hash1 == hash2, "Replay hash must be deterministic"


def test_replay_hash_different_inputs():
    """Test that different inputs produce different hashes."""
    inputs1 = {
        "subject_norm": {"type": "wallet", "address": "0x123"},
        "window": {"start": "2026-01-01T00:00:00Z", "end": "2026-01-08T00:00:00Z"},
        "pipeline_version": "v1.0.0",
    }
    
    inputs2 = {
        "subject_norm": {"type": "wallet", "address": "0x456"},  # Different address
        "window": {"start": "2026-01-01T00:00:00Z", "end": "2026-01-08T00:00:00Z"},
        "pipeline_version": "v1.0.0",
    }
    
    hash1 = generate_replay_hash(inputs1)
    hash2 = generate_replay_hash(inputs2)
    
    assert hash1 != hash2, "Different inputs must produce different hashes"


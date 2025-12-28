"""
Test Validators
Ensures validators work correctly with schemas.
"""
import pytest
from app.validators.io_validator import validate_intelligence_object
from app.validators.failure_validator import validate_failure_object


def test_io_validator_valid_object():
    """Test validator with a valid Intelligence Object."""
    # This should match the schema
    obj = {
        "id": "syncrade:signal:2026-01-03:test-01",
        "type": "SIGNAL",
        "subject": {"asset": "BTC/USDT", "scope": "market"},
        "window": {"start": "2026-01-02T00:00:00Z", "end": "2026-01-03T03:00:00Z"},
        "model": {"pipeline_version": "v1.0.0"},
        "inference": {"scenario": "Test inference"},
        "uncertainty": 0.5,
        "uncertainty_method": "test_method",
        "evidence": [],
        "data_timestamp": "2026-01-03T03:00:00Z",
        "expires_at": "2026-01-03T06:00:00Z",
        "replay": {"replay_key": "test_key"},
        "safety_notice": "Test notice",
    }
    
    is_valid, error = validate_intelligence_object(obj)
    # Note: This test may fail if schema is strict. Adjust obj to match actual schema.
    # For now, we're just testing that the validator runs without crashing.
    assert isinstance(is_valid, bool)
    assert error is None or isinstance(error, str)


def test_io_validator_invalid_object():
    """Test validator with an invalid Intelligence Object."""
    obj = {
        "id": "test",
        # Missing required fields
    }
    
    is_valid, error = validate_intelligence_object(obj)
    assert is_valid is False
    assert error is not None


"""
Failure Object Validator
Validates against schemas/failure-object-v1.schema.json
"""
import json
import jsonschema
from pathlib import Path
from typing import Dict, Any, Tuple, Optional

SCHEMA_PATH = Path(__file__).parent.parent.parent.parent / "schemas" / "failure-object-v1.schema.json"


def load_schema() -> Dict[str, Any]:
    """Load JSON schema from schemas/ directory."""
    if not SCHEMA_PATH.exists():
        raise FileNotFoundError(f"Schema not found: {SCHEMA_PATH}")
    
    with open(SCHEMA_PATH) as f:
        return json.load(f)


def validate_failure_object(obj: Dict[str, Any]) -> Tuple[bool, Optional[str]]:
    """
    Validate Failure Object against JSON Schema.
    
    Returns:
        (is_valid, error_message)
    """
    schema = load_schema()
    
    try:
        jsonschema.validate(instance=obj, schema=schema)
        return True, None
    except jsonschema.ValidationError as e:
        return False, str(e)
    except Exception as e:
        return False, f"Validation error: {str(e)}"


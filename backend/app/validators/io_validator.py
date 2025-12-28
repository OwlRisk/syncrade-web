"""
Intelligence Object Validator
Validates against schemas/intelligence-object-v1.schema.json
"""
import json
import jsonschema
from pathlib import Path
from typing import Dict, Any, Tuple, Optional

# Path to schema (relative to backend/ directory)
SCHEMA_PATH = Path(__file__).parent.parent.parent.parent / "schemas" / "intelligence-object-v1.schema.json"


def load_schema() -> Dict[str, Any]:
    """Load JSON schema from schemas/ directory."""
    if not SCHEMA_PATH.exists():
        raise FileNotFoundError(f"Schema not found: {SCHEMA_PATH}")
    
    with open(SCHEMA_PATH) as f:
        return json.load(f)


def validate_intelligence_object(obj: Dict[str, Any]) -> Tuple[bool, Optional[str]]:
    """
    Validate Intelligence Object against JSON Schema.
    
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


def validate_intelligence_objects(objects: list[Dict[str, Any]]) -> Tuple[list[Dict[str, Any]], list[Dict[str, Any]]]:
    """
    Validate multiple Intelligence Objects.
    
    Returns:
        (valid_objects, invalid_objects_with_errors)
    """
    valid = []
    invalid = []
    
    for obj in objects:
        is_valid, error = validate_intelligence_object(obj)
        if is_valid:
            valid.append(obj)
        else:
            invalid.append({
                "object": obj,
                "error": error,
            })
    
    return valid, invalid


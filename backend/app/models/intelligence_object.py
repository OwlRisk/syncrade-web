"""
Intelligence Object Pydantic Model
Matches schemas/intelligence-object-v1.schema.json
"""
from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional
from datetime import datetime


class IntelligenceObjectV1(BaseModel):
    """
    Intelligence Object v1 model.
    
    This model matches the JSON Schema exactly.
    See schemas/intelligence-object-v1.schema.json for full specification.
    """
    id: str
    type: str = Field(..., pattern="^(OBSERVATION|SIGNAL|INSIGHT|RISK|BEHAVIOR)$")
    subject: Dict[str, Any]
    window: Dict[str, Any]
    model: Dict[str, Any]
    inference: Dict[str, Any] | str
    uncertainty: float = Field(..., ge=0.0, le=1.0)
    uncertainty_method: str
    evidence: List[Dict[str, Any]]
    data_timestamp: str
    expires_at: str
    replay: Dict[str, Any]
    safety_notice: str
    
    # Optional fields
    confidence: Optional[float] = Field(None, ge=0.0, le=1.0)
    reasoning: Optional[List[Dict[str, Any]]] = None
    metadata: Optional[Dict[str, Any]] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "syncrade:signal:2026-01-03:btc-momentum-01",
                "type": "SIGNAL",
                "subject": {"asset": "BTC/USDT", "scope": "market"},
                "window": {"start": "2026-01-02T00:00:00Z", "end": "2026-01-03T03:00:00Z"},
                "model": {"pipeline_version": "v1.0.0"},
                "inference": {"scenario": "Momentum continuation more likely"},
                "uncertainty": 0.27,
                "uncertainty_method": "multi_signal_agreement",
                "evidence": [],
                "data_timestamp": "2026-01-03T03:00:00Z",
                "expires_at": "2026-01-03T06:00:00Z",
                "replay": {"replay_key": "abc123..."},
                "safety_notice": "Informational intelligence only. Not financial advice.",
            }
        }


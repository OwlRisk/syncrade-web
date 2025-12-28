"""
Replay Endpoint (GET /v1/replay/:replay_key)
"""
from fastapi import APIRouter, HTTPException
from typing import List

# TODO: Import when implemented
# from app.services.replay_service import get_replay_objects

router = APIRouter()


@router.get("/replay/{replay_key}")
async def replay(replay_key: str):
    """
    Replay a judgment by replay_key.
    
    Returns the same Intelligence Objects that were generated for the given replay_key.
    Must be byte-identical to original generation.
    """
    # TODO: Implement replay service
    # objects = await get_replay_objects(replay_key)
    # 
    # if not objects:
    #     raise HTTPException(status_code=404, detail="Replay key not found")
    
    # Placeholder response
    raise HTTPException(status_code=501, detail="Replay endpoint not yet implemented")


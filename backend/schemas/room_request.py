from datetime import datetime
from pydantic import BaseModel, ConfigDict


class RoomRequestResponse(BaseModel):
    id: int

    sender_id: int

    receiver_id: int

    status: str

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )
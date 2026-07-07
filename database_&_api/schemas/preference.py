from datetime import time
from decimal import Decimal
from pydantic import BaseModel, ConfigDict


class PreferenceCreate(BaseModel):
    sleep_time: time
    wake_up_time: time
    study_habit: str
    cleanliness: str
    smoking: bool
    drinking: bool
    guest_preference: bool
    ac_preference: str
    budget: Decimal
    food_preference: str
    personality: str


class PreferenceResponse(PreferenceCreate):
    profile_id: int

    model_config = ConfigDict(from_attributes=True)
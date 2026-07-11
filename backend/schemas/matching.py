from typing import List

class MatchResponse(BaseModel):
    user_id: int
    name: str
    department: str
    match_score: float
    matched_on: List[str]
    common_hobbies: List[str]
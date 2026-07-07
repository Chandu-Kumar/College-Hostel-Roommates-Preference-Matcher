from pydantic import BaseModel
from typing import List


class HobbyCreate(BaseModel):
    hobbies: List[str]


class HobbyResponse(BaseModel):
    hobbies: List[str]
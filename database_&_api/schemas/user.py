from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime


# -----------------------
# Register Request
# -----------------------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


# -----------------------
# Login Request
# -----------------------
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# -----------------------
# Response
# -----------------------
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
from pydantic import BaseModel, ConfigDict


class StudentProfileCreate(BaseModel):
    age: int
    gender: str
    department: str
    year: int
    hostel: str
    phone: str


class StudentProfileResponse(BaseModel):
    user_id: int
    age: int
    gender: str
    department: str
    year: int
    hostel: str
    phone: str

    model_config = ConfigDict(from_attributes=True)
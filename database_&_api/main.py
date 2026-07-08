from fastapi import FastAPI
from sqlalchemy import text
from config.database import engine

from routes.auth import router as auth_router

from routes.profile import router as profile_router

from routes.preference import router as preference_router

from routes.hobby import router as hobby_router

from routes.matching import router as matching_router




app = FastAPI(title="Hostel Matcher API")
app.include_router(auth_router)

app.include_router(profile_router)

app.include_router(preference_router)

app.include_router(hobby_router)

app.include_router(matching_router)


@app.get("/")
def home():
    return {"message": "Hostel Matcher Backend Running 🚀"}

@app.get("/tables")
def get_tables():
    with engine.connect() as conn:
        result = conn.execute(text("SHOW TABLES"))
        return {"tables": [row[0] for row in result]}
    

from models.user import User
from models.student_profile import StudentProfile
from models.preference import Preference
from models.hobby import Hobby
from models.student_hobby import StudentHobby
from models.room_request import RoomRequest


@app.get("/check-models")
def check_models():
    return {
        "User": User.__tablename__,
        "StudentProfile": StudentProfile.__tablename__,
        "Preference": Preference.__tablename__,
        "Hobby": Hobby.__tablename__,
        "StudentHobby": StudentHobby.__tablename__,
        "RoomRequest": RoomRequest.__tablename__,
    }
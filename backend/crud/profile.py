from sqlalchemy.orm import Session

from models.student_profile import StudentProfile
from schemas.student_profile import StudentProfileCreate


def get_profile(db: Session, user_id: int):
    return (
        db.query(StudentProfile)
        .filter(StudentProfile.user_id == user_id)
        .first()
    )


def create_profile(
    db: Session,
    user_id: int,
    profile: StudentProfileCreate
):
    db_profile = StudentProfile(
        user_id=user_id,
        age=profile.age,
        gender=profile.gender,
        department=profile.department,
        year=profile.year,
        hostel=profile.hostel,
        phone=profile.phone
    )

    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)

    return db_profile

def update_profile(
    db: Session,
    db_profile: StudentProfile,
    profile: StudentProfileCreate
):
    db_profile.age = profile.age
    db_profile.gender = profile.gender
    db_profile.department = profile.department
    db_profile.year = profile.year
    db_profile.hostel = profile.hostel
    db_profile.phone = profile.phone

    db.commit()
    db.refresh(db_profile)

    return db_profile


from sqlalchemy.orm import Session

from models.preference import Preference
from schemas.preference import PreferenceCreate


def get_preference(db: Session, profile_id: int):
    return (
        db.query(Preference)
        .filter(Preference.profile_id == profile_id)
        .first()
    )


def create_preference(
    db: Session,
    profile_id: int,
    preference: PreferenceCreate
):
    db_preference = Preference(
        profile_id=profile_id,
        sleep_time=preference.sleep_time,
        wake_up_time=preference.wake_up_time,
        study_habit=preference.study_habit,
        cleanliness=preference.cleanliness,
        smoking=preference.smoking,
        drinking=preference.drinking,
        guest_preference=preference.guest_preference,
        ac_preference=preference.ac_preference,
        budget=preference.budget,
        food_preference=preference.food_preference,
        personality=preference.personality
    )

    db.add(db_preference)
    db.commit()
    db.refresh(db_preference)

    return db_preference


def update_preference(
    db: Session,
    db_preference: Preference,
    preference: PreferenceCreate
):
    db_preference.sleep_time = preference.sleep_time
    db_preference.wake_up_time = preference.wake_up_time
    db_preference.study_habit = preference.study_habit
    db_preference.cleanliness = preference.cleanliness
    db_preference.smoking = preference.smoking
    db_preference.drinking = preference.drinking
    db_preference.guest_preference = preference.guest_preference
    db_preference.ac_preference = preference.ac_preference
    db_preference.budget = preference.budget
    db_preference.food_preference = preference.food_preference
    db_preference.personality = preference.personality

    db.commit()
    db.refresh(db_preference)

    return db_preference
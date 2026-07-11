from sqlalchemy.orm import Session

from models.user import User
from schemas.user import UserCreate

from sqlalchemy.orm import joinedload

from models.student_profile import StudentProfile


from crud.preference import get_preference
from crud.hobby import get_hobby_names


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: UserCreate, hashed_password: str):

    db_user = User(
        name=user.name,
        email=user.email,
        password_hash=hashed_password
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

def authenticate_user(db: Session, email: str):

    return db.query(User).filter(
        User.email == email
    ).first()


def get_all_students(
    db: Session,
    current_user_id: int
):
    return (
        db.query(User)
        .options(
            joinedload(User.profile)
        )
        .filter(User.id != current_user_id)
        .all()
    )



def get_user_profile(
    db: Session,
    user_id: int
):
    user = (
        db.query(User)
        .options(joinedload(User.profile))
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        return None

    preference = get_preference(db, user_id)

    hobbies = get_hobby_names(db, user_id)

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,

        "profile": user.profile,

        "preference": preference,

        "hobbies": hobbies
    }


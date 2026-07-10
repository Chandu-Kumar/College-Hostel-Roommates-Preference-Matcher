from sqlalchemy.orm import Session

from models.user import User
from schemas.user import UserCreate

from sqlalchemy.orm import joinedload

from models.student_profile import StudentProfile


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


from sqlalchemy.orm import Session

from models.hobby import Hobby
from models.student_hobby import StudentHobby


def get_hobby_by_name(
    db: Session,
    hobby_name: str
):
    return (
        db.query(Hobby)
        .filter(Hobby.hobby_name == hobby_name)
        .first()
    )


def create_hobby(
    db: Session,
    hobby_name: str
):

    hobby = Hobby(
        hobby_name=hobby_name
    )

    db.add(hobby)
    db.commit()
    db.refresh(hobby)

    return hobby


def add_student_hobby(
    db: Session,
    profile_id: int,
    hobby_id: int
):

    mapping = StudentHobby(
        profile_id=profile_id,
        hobby_id=hobby_id
    )

    db.add(mapping)
    db.commit()

    return mapping


def get_student_hobbies(
    db: Session,
    profile_id: int
):

    return (
        db.query(StudentHobby)
        .filter(
            StudentHobby.profile_id == profile_id
        )
        .all()
    )

from models.hobby import Hobby

def get_hobby_names(
    db: Session,
    profile_id: int
):
    hobbies = (
        db.query(Hobby.hobby_name)
        .join(
            StudentHobby,
            Hobby.id == StudentHobby.hobby_id
        )
        .filter(
            StudentHobby.profile_id == profile_id
        )
        .all()
    )

    return [hobby[0] for hobby in hobbies]

def delete_student_hobbies(
    db: Session,
    profile_id: int
):
    db.query(StudentHobby).filter(
        StudentHobby.profile_id == profile_id
    ).delete()

    db.commit()






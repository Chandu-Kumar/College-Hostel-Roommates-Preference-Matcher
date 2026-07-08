from sqlalchemy.orm import Session

from models.user import User
from models.preference import Preference
from models.hobby import Hobby
from models.student_hobby import StudentHobby

from matching.engine import calculate_match_score


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

    return [h[0] for h in hobbies]


def find_matches(
    db: Session,
    current_user: User
):

    matches = []

    my_preference = (
        db.query(Preference)
        .filter(
            Preference.profile_id == current_user.id
        )
        .first()
    )

    my_hobbies = get_hobby_names(
        db,
        current_user.id
    )

    users = (
        db.query(User)
        .filter(User.id != current_user.id)
        .all()
    )

    for user in users:

        preference = (
            db.query(Preference)
            .filter(
                Preference.profile_id == user.id
            )
            .first()
        )

        if preference is None:
            continue

        hobbies = get_hobby_names(
            db,
            user.id
        )

        score = calculate_match_score(
            my_preference,
            preference,
            my_hobbies,
            hobbies
        )

        matches.append({
            "user_id": user.id,
            "name": user.name,
            "match_score": score
        })

    matches.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return matches



from sqlalchemy.orm import Session

from crud.preference import get_preference
from crud.hobby import get_hobby_names

from crud.user import get_all_students


def calculate_score(
    my_pref,
    other_pref,
    my_hobbies,
    other_hobbies,
):
    matched_fields = []
    score = 0

    if my_pref.study_habit == other_pref.study_habit:
        score += 10
        matched_fields.append("study_habit")

    if my_pref.cleanliness == other_pref.cleanliness:
        score += 10
        matched_fields.append("cleanliness")
    if my_pref.food_preference == other_pref.food_preference:
        score += 10
        matched_fields.append("food_preference")

    if my_pref.personality == other_pref.personality:
        score += 10
        matched_fields.append("personality")

    if my_pref.ac_preference == other_pref.ac_preference:
        score += 10
        matched_fields.append("ac_preference")

    if my_pref.smoking == other_pref.smoking:
        score += 10
        matched_fields.append("smoking")

    if my_pref.drinking == other_pref.drinking:
        score += 10
        matched_fields.append("drinking")

    if common:
        matched_fields.append(f"{len(common)} Common Hobbies")

    if abs(float(my_pref.budget) - float(other_pref.budget)) <= 2000:
        score += 20

    common = list(
        set(my_hobbies) &
        set(other_hobbies)
    )

    score += min(
        len(common) * 5,
        10
    )

    return score, common, matched_fields




def get_matches(
    db: Session,
    current_user
):
    my_profile = current_user.profile

    if not my_profile:
        return []

    my_pref = get_preference(
        db,
        current_user.id
    )

    if not my_pref:
        return []

    my_hobbies = get_hobby_names(
        db,
        current_user.id
    )

    students = get_all_students(
        db,
        current_user.id
    )

    matches = []

    for student in students:

        if student.profile is None:
            continue

        other_pref = get_preference(
            db,
            student.id
        )

        if other_pref is None:
            continue

        other_hobbies = get_hobby_names(
            db,
            student.id
        )

        score, common, matched_fields = calculate_score(
            my_pref,
            other_pref,
            my_hobbies,
            other_hobbies
        )

        matches.append({
            "user_id": student.id,
            "name": student.name,
            "department": student.profile.department,
            "match_score": score,
            "matched_on": matched_fields,
            "common_hobbies": common
        })

    matches.sort(
        key=lambda x: x["compatibility"],
        reverse=True
    )

    return {

    "user_id": student.id,

    "name": student.name,

    "department": student.profile.department,

    "match_score": score,

    "matched_on": matched_fields,

    "common_hobbies": common

}

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db
from dependencies.auth import get_current_user

from models.user import User

from crud.hobby import get_hobby_names


from schemas.hobby import (
    HobbyCreate,
    HobbyResponse
)

from crud.hobby import (
    get_hobby_by_name,
    create_hobby,
    add_student_hobby,
    get_student_hobbies,
    # get_hobby_names
    delete_student_hobbies
)

router = APIRouter(
    prefix="/hobbies",
    tags=["Hobbies"]
)


@router.post("", response_model=HobbyResponse)
def create_user_hobbies(
    hobby_data: HobbyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    saved_hobbies = []

    for hobby_name in hobby_data.hobbies:

        hobby_name = hobby_name.strip()

        hobby = get_hobby_by_name(
            db,
            hobby_name
        )

        if hobby is None:
            hobby = create_hobby(
                db,
                hobby_name
            )

        add_student_hobby(
            db,
            current_user.id,
            hobby.id
        )

        saved_hobbies.append(
            hobby.hobby_name
        )

    return {
        "hobbies": saved_hobbies
    }


@router.get("/me", response_model=HobbyResponse)
def get_my_hobbies(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    hobbies = get_hobby_names(
        db,
        current_user.id
    )

    return {
        "hobbies": hobbies
    }


@router.put("", response_model=HobbyResponse)
def update_user_hobbies(
    hobby_data: HobbyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Purani mapping delete
    delete_student_hobbies(
        db,
        current_user.id
    )

    saved_hobbies = []

    # Duplicate names hata do
    unique_hobbies = list(dict.fromkeys(hobby_data.hobbies))

    for hobby_name in unique_hobbies:

        hobby_name = hobby_name.strip()

        hobby = get_hobby_by_name(
            db,
            hobby_name
        )

        if hobby is None:
            hobby = create_hobby(
                db,
                hobby_name
            )

        add_student_hobby(
            db,
            current_user.id,
            hobby.id
        )

        saved_hobbies.append(
            hobby.hobby_name
        )

    return {
        "hobbies": saved_hobbies
    }






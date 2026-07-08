from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from config.database import get_db
from dependencies.auth import get_current_user

from models.user import User

from schemas.preference import (
    PreferenceCreate,
    PreferenceResponse
)

from crud.preference import (
    get_preference,
    create_preference,
    update_preference
)

router = APIRouter(
    prefix="/preferences",
    tags=["Preferences"]
)


@router.post("", response_model=PreferenceResponse)
def create_user_preference(
    preference: PreferenceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    existing_preference = get_preference(
        db,
        current_user.id
    )

    if existing_preference:
        raise HTTPException(
            status_code=400,
            detail="Preference already exists"
        )

    return create_preference(
        db=db,
        profile_id=current_user.id,
        preference=preference
    )

@router.get("/me", response_model=PreferenceResponse)
def get_my_preference(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    preference = get_preference(
        db,
        current_user.id
    )

    if not preference:
        raise HTTPException(
            status_code=404,
            detail="Preference not found"
        )
    print("Profile ID:", preference.profile_id)
    print("Preference Object:", preference)
    return preference

@router.put("", response_model=PreferenceResponse)
def edit_preference(
    preference: PreferenceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    db_preference = get_preference(
        db,
        current_user.id
    )

    if not db_preference:
        raise HTTPException(
            status_code=404,
            detail="Preference not found"
        )

    return update_preference(
        db=db,
        db_preference=db_preference,
        preference=preference
    )




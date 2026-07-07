from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from config.database import get_db
from dependencies.auth import get_current_user

from models.user import User



from schemas.student_profile import (
    StudentProfileCreate,
    StudentProfileResponse
)

from crud.profile import (
    get_profile,
    create_profile,
    update_profile
)

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


@router.post("", response_model=StudentProfileResponse)
def create_student_profile(
    profile: StudentProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    existing_profile = get_profile(db, current_user.id)

    if existing_profile:
        raise HTTPException(
            status_code=400,
            detail="Profile already exists"
        )

    return create_profile(
        db=db,
        user_id=current_user.id,
        profile=profile
    )


@router.get("/me", response_model=StudentProfileResponse)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    profile = get_profile(db, current_user.id)

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return profile


@router.put("", response_model=StudentProfileResponse)
def edit_profile(
    profile: StudentProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    db_profile = get_profile(db, current_user.id)

    if not db_profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return update_profile(
        db=db,
        db_profile=db_profile,
        profile=profile
    )




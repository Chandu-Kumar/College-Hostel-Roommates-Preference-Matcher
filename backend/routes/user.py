print("✅ User router loaded")

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from config.database import get_db

from dependencies.auth import get_current_user

from models.user import User

from crud.user import get_user_profile


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/{user_id}")
def get_public_user_profile(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    user = get_user_profile(
        db,
        user_id
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user
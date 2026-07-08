from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db
from dependencies.auth import get_current_user

from models.user import User

from services.matching_service import find_matches

router = APIRouter(
    prefix="/matches",
    tags=["Matching"]
)


@router.get("")
def get_matches(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return find_matches(
        db,
        current_user
    )


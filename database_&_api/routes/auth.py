from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from config.database import get_db
from schemas.user import UserCreate, UserResponse
from crud.user import get_user_by_email, create_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Temporary (next step me hashing karenge)
    hashed_password = user.password

    new_user = create_user(
        db=db,
        user=user,
        hashed_password=hashed_password
    )

    return new_user
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from config.database import get_db
from dependencies.auth import get_current_user

from models.user import User
from schemas.room_request import RoomRequestResponse

from crud.room_request import (
    create_room_request,
    get_existing_request,
    get_sent_requests,
    get_received_requests,
    get_request_by_id,
    update_request_status
)

router = APIRouter(
    prefix="/room-requests",
    tags=["Room Requests"]
)


@router.post("/{receiver_id}", response_model=RoomRequestResponse)
def send_room_request(
    receiver_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # User khud ko request nahi bhej sakta
    if current_user.id == receiver_id:
        raise HTTPException(
            status_code=400,
            detail="You cannot send request to yourself."
        )

    # Duplicate request check
    existing = get_existing_request(
        db,
        current_user.id,
        receiver_id
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Request already sent."
        )

    request = create_room_request(
        db,
        current_user.id,
        receiver_id
    )

    return request


@router.get("/sent", response_model=list[RoomRequestResponse])
def sent_requests(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return get_sent_requests(
        db,
        current_user.id
    )


@router.get("/received", response_model=list[RoomRequestResponse])
def received_requests(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return get_received_requests(
        db,
        current_user.id
    )


@router.put("/{request_id}/accept", response_model=RoomRequestResponse)
def accept_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    request = get_request_by_id(
        db,
        request_id
    )

    if not request:
        raise HTTPException(
            status_code=404,
            detail="Request not found"
        )

    if request.receiver_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    return update_request_status(
        db,
        request,
        "accepted"
    )



@router.put("/{request_id}/reject", response_model=RoomRequestResponse)
def reject_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    request = get_request_by_id(
        db,
        request_id
    )

    if not request:
        raise HTTPException(
            status_code=404,
            detail="Request not found"
        )

    if request.receiver_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    return update_request_status(
        db,
        request,
        "rejected"
    )






from sqlalchemy.orm import Session

from models.room_request import RoomRequest

def create_room_request(
    db: Session,
    sender_id: int,
    receiver_id: int
):

    request = RoomRequest(
        sender_id=sender_id,
        receiver_id=receiver_id
    )

    db.add(request)

    db.commit()

    db.refresh(request)

    return request

def get_existing_request(
    db: Session,
    sender_id: int,
    receiver_id: int
):

    return (
        db.query(RoomRequest)
        .filter(
            RoomRequest.sender_id == sender_id,
            RoomRequest.receiver_id == receiver_id
        )
        .first()
    )

def get_sent_requests(
    db: Session,
    sender_id: int
):
    return (
        db.query(RoomRequest)
        .filter(RoomRequest.sender_id == sender_id)
        .all()
    )

def get_received_requests(
    db: Session,
    receiver_id: int
):
    return (
        db.query(RoomRequest)
        .filter(RoomRequest.receiver_id == receiver_id)
        .all()
    )

def get_request_by_id(
    db: Session,
    request_id: int
):
    return (
        db.query(RoomRequest)
        .filter(RoomRequest.id == request_id)
        .first()
    )

def update_request_status(
    db: Session,
    request: RoomRequest,
    status: str
):
    request.status = status

    db.commit()
    db.refresh(request)

    return request




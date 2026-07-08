from sqlalchemy import Column, Integer, Enum, TIMESTAMP, ForeignKey, func
from sqlalchemy.orm import relationship

from config.database import Base


class RoomRequest(Base):
    __tablename__ = "room_requests"

    id = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    sender_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    receiver_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    status = Column(
        Enum("pending", "accepted", "rejected"),
        default="pending",
        nullable=False
    )

    created_at = Column(
        TIMESTAMP,
        server_default=func.current_timestamp()
    )

    sender = relationship(
        "User",
        foreign_keys=[sender_id],
        back_populates="sent_requests"
    )

    receiver = relationship(
        "User",
        foreign_keys=[receiver_id],
        back_populates="received_requests"
    )
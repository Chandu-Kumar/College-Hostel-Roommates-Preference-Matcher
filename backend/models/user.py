from sqlalchemy import Column, Integer, String, Enum, TIMESTAMP, func
from sqlalchemy.orm import relationship

from config.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, nullable=False, index=True)

    password_hash = Column(String(255), nullable=False)

    role = Column(
        Enum("student", "admin"),
        default="student",
        nullable=False
    )

    created_at = Column(
        TIMESTAMP,
        server_default=func.current_timestamp()
    )

    # Relationships
    profile = relationship(
        "StudentProfile",
        back_populates="user",
        uselist=False,
        cascade="all, delete"
    )

    sent_requests = relationship(
        "RoomRequest",
        foreign_keys="RoomRequest.sender_id",
        back_populates="sender"
    )

    received_requests = relationship(
        "RoomRequest",
        foreign_keys="RoomRequest.receiver_id",
        back_populates="receiver"
    )
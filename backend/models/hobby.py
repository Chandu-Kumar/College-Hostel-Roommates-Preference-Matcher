from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from config.database import Base


class Hobby(Base):
    __tablename__ = "hobbies"

    id = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    hobby_name = Column(
        String(50),
        unique=True,
        nullable=False
    )

    student_hobbies = relationship(
        "StudentHobby",
        back_populates="hobby",
        cascade="all, delete"
    )
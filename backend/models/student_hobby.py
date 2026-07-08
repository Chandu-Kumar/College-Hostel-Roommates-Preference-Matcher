from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from config.database import Base


class StudentHobby(Base):
    __tablename__ = "student_hobbies"

    profile_id = Column(
        Integer,
        ForeignKey("student_profiles.user_id", ondelete="CASCADE"),
        primary_key=True
    )

    hobby_id = Column(
        Integer,
        ForeignKey("hobbies.id", ondelete="CASCADE"),
        primary_key=True
    )

    profile = relationship(
        "StudentProfile",
        back_populates="hobbies"
    )

    hobby = relationship(
        "Hobby",
        back_populates="student_hobbies"
    )
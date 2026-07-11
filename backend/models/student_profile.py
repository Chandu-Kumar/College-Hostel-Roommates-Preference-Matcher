from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import relationship

from config.database import Base


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        primary_key=True
    )

    age = Column(Integer)
    gender = Column(Enum("Male", "Female", "Other"), nullable=False)
    department = Column(String(100))
    year = Column(Integer)
    hostel = Column(String(50))
    phone = Column(String(15))

    user = relationship(
        "User",
        back_populates="profile"
    )

    # Preference aur StudentHobby baad me add karenge

     # Relationship with Preference
    preference = relationship(
        "Preference",
        back_populates="profile",
        uselist=False,
        cascade="all, delete"
    )


    # Relationship with hobbies
    hobbies = relationship(
    "StudentHobby",
    back_populates="profile",
    cascade="all, delete"
)


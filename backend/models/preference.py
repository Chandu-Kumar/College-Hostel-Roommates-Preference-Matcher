from sqlalchemy import Column, Integer, Time, Enum, Boolean, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship

from config.database import Base


class Preference(Base):
    __tablename__ = "preferences"

    profile_id = Column(
        Integer,
        ForeignKey("student_profiles.user_id", ondelete="CASCADE"),
        primary_key=True
    )

    sleep_time = Column(Time)

    wake_up_time = Column(Time)

    study_habit = Column(
        Enum("Morning", "Night", "Flexible")
    )

    cleanliness = Column(
        Enum("High", "Medium", "Low")
    )

    smoking = Column(Boolean, default=False)

    drinking = Column(Boolean, default=False)

    guest_preference = Column(Boolean, default=False)

    ac_preference = Column(
        Enum("AC", "Non-AC", "Any")
    )

    budget = Column(DECIMAL(10, 2))

    food_preference = Column(
        Enum("Veg", "Non-Veg", "Any")
    )

    personality = Column(
        Enum("Introvert", "Extrovert", "Ambivert")
    )

    profile = relationship(
        "StudentProfile",
        back_populates="preference"
    )
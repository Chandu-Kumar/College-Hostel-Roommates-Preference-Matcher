from config.database import SessionLocal

import random

from config.database import SessionLocal

from models.user import User
from models.student_profile import StudentProfile
from models.preference import Preference
from models.hobby import Hobby
from models.student_hobby import StudentHobby

from utils.security import hash_password

from models.room_request import RoomRequest

from datetime import time


names = [
    "Rahul", "Aman", "Priya", "Anjali", "Rohit",
    "Sneha", "Karan", "Neha", "Vikas", "Pooja",
    "Aditya", "Simran", "Arjun", "Nikita", "Yash",
    "Megha", "Abhishek", "Divya", "Harsh", "Sakshi"
]

departments = [
    "CSE",
    "IT",
    "ECE",
    "EEE",
    "Mechanical",
    "Civil",
    "AI & DS"
]

hostels = [
    "BH-1",
    "BH-2",
    "BH-3",
    "BH-4",
    "BH-5"
]

hobby_names = [
    "Coding",
    "Gaming",
    "Reading",
    "Music",
    "Cricket",
    "Football",
    "Chess",
    "Gym",
    "Photography",
    "Movies"
]

def seed_hobbies(db):

    for hobby_name in hobby_names:

        hobby = (
            db.query(Hobby)
            .filter(Hobby.hobby_name == hobby_name)
            .first()
        )

        if hobby is None:

            db.add(
                Hobby(
                    hobby_name=hobby_name
                )
            )

    db.commit()

    print("✅ Hobbies Seeded")


def seed_users(db):

    for i, name in enumerate(names):

        email = f"{name.lower()}{i}@gmail.com"

        existing = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

        if existing:
            continue

        user = User(
            name=name,
            email=email,
            password_hash=hash_password("12345678"),
            role="student"
        )

        db.add(user)

    db.commit()

    print("✅ Users Seeded")

def seed_profiles(db):

    users = db.query(User).all()

    for user in users:

        existing = (
            db.query(StudentProfile)
            .filter(StudentProfile.user_id == user.id)
            .first()
        )

        if existing:
            continue

        profile = StudentProfile(
            user_id=user.id,
            age=random.randint(18, 25),
            gender=random.choice(["Male", "Female"]),
            department=random.choice(departments),
            year=random.randint(1, 4),
            hostel=random.choice(hostels),
            phone=f"98{random.randint(10000000,99999999)}"
        )

        db.add(profile)

    db.commit()

    print("✅ Profiles Seeded")


def seed_preferences(db):

    profiles = db.query(StudentProfile).all()

    for profile in profiles:

        existing = (
            db.query(Preference)
            .filter(Preference.profile_id == profile.user_id)
            .first()
        )

        if existing:
            continue

        preference = Preference(
            profile_id=profile.user_id,
            sleep_time=random.choice([
                time(22,0),
                time(22,30),
                time(23,0),
                time(23,30),
                time(0,0)
            ]),

            wake_up_time=random.choice([
                time(5,30),
                time(6,0),
                time(6,30),
                time(7,0),
                time(8,0)
            ]),
            study_habit=random.choice([
                "Morning",
                "Night",
                "Flexible"
            ]),
            cleanliness=random.choice([
                "High",
                "Medium",
                "Low"
            ]),
            smoking=random.choice([True, False]),
            drinking=random.choice([True, False]),
            guest_preference=random.choice([True, False]),
            ac_preference=random.choice([
                "AC",
                "Non-AC",
                "Any"
            ]),
            budget=random.randint(6000,15000),
            food_preference=random.choice([
                "Veg",
                "Non-Veg",
                "Any"
            ]),
            personality=random.choice([
                "Introvert",
                "Extrovert",
                "Ambivert"
            ])
        )

        db.add(preference)

    db.commit()

    print("✅ Preferences Seeded")






db = SessionLocal()

print("Database Connected!")

seed_hobbies(db)
seed_users(db)
seed_profiles(db)
seed_preferences(db)


db.close()

print("Done!")





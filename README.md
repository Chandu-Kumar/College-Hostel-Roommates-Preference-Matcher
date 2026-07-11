# 🏠 Hostel Matcher

A Full Stack Hostel Roommate Matching Platform built using **React.js, FastAPI, SQLAlchemy, MySQL and Tailwind CSS**.

The application helps students find compatible hostel roommates based on lifestyle preferences, hobbies and personal information while maintaining privacy until both users agree.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Protected APIs

---

## 👤 Student Profile

- Create Profile
- Update Profile
- Personal Information
- Department
- Hostel
- Academic Year

---

## ⚙ Preferences

Students can set

- Sleep Time
- Wake Up Time
- Study Habit
- Cleanliness
- Smoking
- Drinking
- Guest Preference
- AC Preference
- Monthly Budget
- Food Preference
- Personality

---

## 🎯 Hobbies

- Multiple Hobby Selection
- Update Hobbies
- Dynamic Hobby Chips

---

## ❤️ Matching Engine

Students are matched based on

- Preferences
- Common Hobbies

The system calculates a compatibility score and shows the best matches first.

---

## 👥 View Profile

Users can view another student's

- Personal Details
- Preferences
- Hobbies

Phone Number and Email remain hidden until the room request is accepted.

---

## 📨 Room Requests

- Send Request
- Accept Request
- Reject Request
- Sent Requests
- Received Requests

---

## 🔒 Privacy

Contact information remains hidden until a room request has been accepted.

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- React Hook Form
- Sonner

## Backend

- FastAPI
- SQLAlchemy
- JWT Authentication
- Pydantic

## Database

- MySQL

---

# 📂 Project Structure

```
frontend/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── services/
│   ├── layouts/
│   ├── routes/
│   └── context/
│
backend/
│
├── routes/
├── crud/
├── models/
├── schemas/
├── services/
├── matching/
├── dependencies/
└── config/
```

---

# 🚀 Installation

## Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at

```
http://localhost:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 📸 Screenshots

Add screenshots here after deployment.

Example

- Login
- Dashboard
- Matches
- Profile
- View Profile
- Room Requests

---

# 🔮 Future Improvements

- Real-time Chat
- AI Roommate Recommendation
- Email Verification
- Push Notifications
- Profile Pictures
- Admin Dashboard

---

# 👨‍💻 Author

**Ravan**

B.Tech CSE

Lovely Professional University

---

# 📜 License

This project is developed for educational and portfolio purposes.
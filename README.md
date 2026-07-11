# 🏠 Hostel Matcher

> A Full Stack Roommate Matching Platform built using **React.js, FastAPI, MySQL and Tailwind CSS**.

Find compatible hostel roommates based on **lifestyle preferences, hobbies and personal compatibility**, while keeping personal contact information private until both students connect.

---

## 🚀 Features

### 🔐 Authentication

- JWT Login
- Secure Registration
- Protected Routes
- Protected APIs

### 👤 Student Profile

- Personal Information
- Department
- Hostel
- Academic Year
- Phone Number

### ⚙️ Lifestyle Preferences

- Sleep Schedule
- Wake Up Time
- Study Habit
- Cleanliness
- Food Preference
- AC Preference
- Personality
- Monthly Budget
- Smoking & Drinking
- Guest Preference

### 🎯 Hobbies

- Multiple Hobby Selection
- Dynamic Hobby Management

### ❤️ Smart Roommate Matching

- Preference Matching
- Hobby Matching
- Compatibility Score

### 📨 Room Requests

- Send Request
- Accept Request
- Reject Request
- Sent Requests
- Received Requests

### 🔒 Privacy Protection

- Phone Number Hidden
- Email Hidden
- Unlock Contact after Accepted Request

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- React Hook Form
- Sonner Toast

## Backend

- FastAPI
- SQLAlchemy
- JWT Authentication
- Pydantic

## Database

- MySQL

---

# 📂 Folder Structure

```text
Hostel-Matcher
│
├── backend
│   ├── config
│   ├── crud
│   ├── dependencies
│   ├── matching
│   ├── models
│   ├── routes
│   ├── schemas
│   └── services
│
├── frontend
│   ├── api
│   ├── components
│   ├── context
│   ├── layouts
│   ├── pages
│   ├── routes
│   └── services
│
└── README.md
```

---

# 🖥 Screenshots

> Add screenshots after deployment.

| Login | Dashboard |
|-------|-----------|
| Screenshot | Screenshot |

| Matches | View Profile |
|----------|--------------|
| Screenshot | Screenshot |

| Room Requests | Preferences |
|--------------|-------------|
| Screenshot | Screenshot |

---

# ⚡ Installation

## Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Backend `.env`

```env
DATABASE_URL=your_database_url

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

# 📌 Future Improvements

- 💬 Real Time Chat
- 🤖 AI Roommate Recommendation
- 📧 Email Verification
- 🔔 Notifications
- 📷 Profile Picture Upload
- 👨‍💼 Admin Dashboard

---

# 👨‍💻 Author

**Ravan**

B.Tech Computer Science Engineering

Lovely Professional University

---

⭐ If you like this project, consider giving it a star.
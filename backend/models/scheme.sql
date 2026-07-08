CREATE DATABASE IF NOT EXISTS hostel_matcher;
USE hostel_matcher;

-- 1. Users Table (Auth aur Role ke liye)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Student Profiles Table (One-to-One with users)
CREATE TABLE IF NOT EXISTS student_profiles (
    user_id INT PRIMARY KEY,
    age INT,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    department VARCHAR(100),
    year INT,
    hostel VARCHAR(50),
    phone VARCHAR(15),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Preferences Table (One-to-One with student_profiles)
CREATE TABLE IF NOT EXISTS preferences (
    profile_id INT PRIMARY KEY,
    sleep_time TIME,
    wake_up_time TIME,
    study_habit ENUM('Morning', 'Night', 'Flexible'),
    cleanliness ENUM('High', 'Medium', 'Low'),
    smoking BOOLEAN DEFAULT FALSE,
    drinking BOOLEAN DEFAULT FALSE,
    guest_preference BOOLEAN DEFAULT FALSE,
    ac_preference ENUM('AC', 'Non-AC', 'Any'),
    budget DECIMAL(10, 2),
    food_preference ENUM('Veg', 'Non-Veg', 'Any'),
    personality ENUM('Introvert', 'Extrovert', 'Ambivert'),
    FOREIGN KEY (profile_id) REFERENCES student_profiles(user_id) ON DELETE CASCADE
);

-- 4. Hobbies Master Table
CREATE TABLE IF NOT EXISTS hobbies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hobby_name VARCHAR(50) UNIQUE NOT NULL
);

-- 5. Student Hobbies Mapping Table (Many-to-Many relationship)
CREATE TABLE IF NOT EXISTS student_hobbies (
    profile_id INT,
    hobby_id INT,
    PRIMARY KEY (profile_id, hobby_id),
    FOREIGN KEY (profile_id) REFERENCES student_profiles(user_id) ON DELETE CASCADE,
    FOREIGN KEY (hobby_id) REFERENCES hobbies(id) ON DELETE CASCADE
);

-- 6. Room Requests Table (For connecting matching roommates)
CREATE TABLE IF NOT EXISTS room_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);



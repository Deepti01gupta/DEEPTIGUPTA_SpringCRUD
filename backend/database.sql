-- SQL Script for Student Database Setup
-- Run this script on PostgreSQL to create the student table

-- Drop table if it exists (optional, for clean setup)
DROP TABLE IF EXISTS student CASCADE;

-- Create the student table
CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL
);

-- Create indexes for better query performance (optional but recommended)
CREATE INDEX idx_student_email ON student(email);
CREATE INDEX idx_student_course ON student(course);

-- Insert sample data for testing (optional)
INSERT INTO student (name, email, course) VALUES ('John Doe', 'john@example.com', 'Computer Science');
INSERT INTO student (name, email, course) VALUES ('Jane Smith', 'jane@example.com', 'Data Science');
INSERT INTO student (name, email, course) VALUES ('Bob Johnson', 'bob@example.com', 'Web Development');
INSERT INTO student (name, email, course) VALUES ('Alice Williams', 'alice@example.com', 'Artificial Intelligence');
INSERT INTO student (name, email, course) VALUES ('Charlie Brown', 'charlie@example.com', 'Computer Science');

-- Display all students
SELECT * FROM student;

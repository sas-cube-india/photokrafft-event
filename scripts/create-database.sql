-- Create database schema for event registrations
-- MySQL Database Setup

CREATE DATABASE IF NOT EXISTS event_registration;
USE event_registration;

-- Create registrations table
CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    event_name VARCHAR(255) NULL,
    workshop_name VARCHAR(255) NULL,
    investment VARCHAR(255) NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_registered_at (registered_at),
    INDEX idx_event_name (event_name),
    INDEX idx_workshop_name (workshop_name)
);

-- Create admin users table
CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
-- Note: In production, use proper password hashing with bcrypt
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', '$2b$10$rQZ9QmSTnIc8nFO8M8HgUeJ4sQ4rQZ9QmSTnIc8nFO8M8HgUeJ4sQ4');

-- Sample data for testing
INSERT INTO registrations (full_name, email, event_name, workshop_name, investment) VALUES
('John Doe', 'john@example.com', 'Photography Summit 2025', 'Portrait Photography', '₹2500'),
('Jane Smith', 'jane@example.com', 'Maternity Workshop', 'Newborn Photography', '₹5000'),
('Mike Johnson', 'mike@example.com', 'Creative Photography', 'Studio Lighting', '₹1000'),
('Sarah Wilson', 'sarah@example.com', 'Photography Bootcamp', 'Business Photography', 'Free'),
('Alex Brown', 'alex@example.com', 'Advanced Photography', 'Post Processing', '₹3500');

-- Create a view for admin dashboard statistics
CREATE VIEW registration_stats AS
SELECT 
    COUNT(*) as total_registrations,
    COUNT(CASE WHEN DATE(registered_at) = CURDATE() THEN 1 END) as today_registrations,
    COUNT(CASE WHEN DATE(registered_at) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN 1 END) as week_registrations,
    COUNT(CASE WHEN DATE(registered_at) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 END) as month_registrations
FROM registrations;

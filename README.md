# Photokrafft Event Registration System

A modern, responsive event registration system built with Next.js, featuring a clean split-screen design with Poppins font family and MySQL database.

## Features

- ✨ Elegant split-screen design with maternity photography
- 📱 Fully responsive across all devices
- 🎨 Poppins font family (max 16px font size)
- ✅ Form validation with required fields
- 📧 Automatic email confirmation to registrants
- 🔐 Admin authentication and dashboard
- 📊 Registration analytics and statistics
- 📤 CSV export functionality
- 🗑️ Delete registrations from admin panel
- 🔍 Search and filter registrations
- 💾 MySQL database with optimized queries

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: MySQL 8.0+
- **Email**: Nodemailer with SMTP
- **Authentication**: Simple admin authentication

## Quick Start

### 1. Clone and Install

\`\`\`bash
git clone <repository-url>
cd photokrafft-registration
npm install
\`\`\`

### 2. Environment Configuration

Create a \`.env.local\` file in the root directory:

\`\`\`env
# MySQL Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/event_registration"
DB_HOST="localhost"
DB_PORT="3306"
DB_USER="your_mysql_username"
DB_PASSWORD="your_mysql_password"
DB_NAME="event_registration"

# SMTP Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="noreply@photokrafft.com"

# Admin Configuration
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-password"

# Next.js Configuration
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

### 3. MySQL Database Setup

#### Install MySQL

**Ubuntu/Debian:**
\`\`\`bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
\`\`\`

**macOS (using Homebrew):**
\`\`\`bash
brew install mysql
brew services start mysql
\`\`\`

**Windows:**
Download and install from [MySQL Official Website](https://dev.mysql.com/downloads/mysql/)

#### Create Database and User

\`\`\`bash
# Login to MySQL as root
mysql -u root -p

# Create database and user
CREATE DATABASE event_registration;
CREATE USER 'photokrafft_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON event_registration.* TO 'photokrafft_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
\`\`\`

#### Run Database Schema

\`\`\`bash
# Install MySQL client for Node.js
npm install mysql2

# Run the database creation script
mysql -u photokrafft_user -p event_registration < scripts/create-database.sql
\`\`\`

### 4. Email Configuration

#### Gmail SMTP Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
3. Use the generated password in \`SMTP_PASS\`

#### Other SMTP Providers

**SendGrid:**
\`\`\`env
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
\`\`\`

**Mailgun:**
\`\`\`env
SMTP_HOST="smtp.mailgun.org"
SMTP_PORT="587"
SMTP_USER="your-mailgun-username"
SMTP_PASS="your-mailgun-password"
\`\`\`

**AWS SES:**
\`\`\`env
SMTP_HOST="email-smtp.us-east-1.amazonaws.com"
SMTP_PORT="587"
SMTP_USER="your-aws-access-key"
SMTP_PASS="your-aws-secret-key"
\`\`\`

### 5. Run the Application

\`\`\`bash
# Development
npm run dev

# Production
npm run build
npm start
\`\`\`

## Database Schema

### Registrations Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT (Primary Key) | Auto-incrementing ID |
| full_name | VARCHAR(255) | Registrant's full name (Required) |
| email | VARCHAR(255) | Registrant's email address (Required) |
| event_name | VARCHAR(255) | Event name (Optional) |
| workshop_name | VARCHAR(255) | Workshop name (Optional) |
| investment | VARCHAR(255) | Investment amount (Optional) |
| registered_at | TIMESTAMP | Registration timestamp |

### Admin Users Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT (Primary Key) | Auto-incrementing ID |
| username | VARCHAR(100) | Admin username |
| password_hash | VARCHAR(255) | Hashed password |
| created_at | TIMESTAMP | Account creation timestamp |

### Database Indexes

- \`idx_email\` - Index on email for faster lookups
- \`idx_registered_at\` - Index on registration date for analytics
- \`idx_event_name\` - Index on event name for filtering
- \`idx_workshop_name\` - Index on workshop name for filtering

## API Endpoints

### Public Endpoints

- \`POST /api/register\` - Submit registration
- \`GET /\` - Registration form page

### Admin Endpoints

- \`POST /api/admin/login\` - Admin authentication
- \`GET /api/admin/registrations\` - Get all registrations
- \`DELETE /api/admin/registrations/[id]\` - Delete registration
- \`GET /admin\` - Admin dashboard page

## Form Fields

### Required Fields
- **Full Name** - Text input for registrant's complete name
- **Email Address** - Email input with validation

### Optional Fields
- **Event Name** - Text input for event name
- **Workshop Name** - Text input for workshop name
- **Investment Amount** - Text input for investment amount

## Design Features

### Split-Screen Layout
- **Left Side**: Beautiful maternity photography image with overlay text
- **Right Side**: Dark form with elegant underlined inputs
- **Responsive**: Stacks vertically on mobile devices

### Form Styling
- **Underlined Inputs**: Clean, modern input design without borders
- **Orange Accent**: Orange focus states and button color
- **Dark Theme**: Dark background with white text for elegance
- **Smooth Animations**: Hover effects and transitions

### Typography
- **Poppins Font**: Professional, clean typography
- **Maximum 16px**: All text sizes capped at 16px as specified
- **Consistent Hierarchy**: Clear visual hierarchy throughout

## Production Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. For database, use a cloud MySQL service like:
   - **PlanetScale** (recommended for Vercel)
   - **AWS RDS MySQL**
   - **Google Cloud SQL**
   - **DigitalOcean Managed MySQL**

### Manual Server Deployment

\`\`\`bash
# Build the application
npm run build

# Start with PM2 (recommended)
npm install -g pm2
pm2 start npm --name "photokrafft-registration" -- start

# Or start directly
npm start
\`\`\`

## MySQL Configuration

### Connection Pool Settings

For production, configure connection pooling in your database connection:

\`\`\`javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
});
\`\`\`

### Database Maintenance

#### Regular Backups
\`\`\`bash
# Daily backup script (add to cron)
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u photokrafft_user -p event_registration > /backups/event_registration_$DATE.sql

# Keep only last 30 days of backups
find /backups -name "event_registration_*.sql" -mtime +30 -delete
\`\`\`

#### Performance Optimization
\`\`\`sql
-- Analyze table performance
ANALYZE TABLE registrations;
ANALYZE TABLE admin_users;

-- Check index usage
SHOW INDEX FROM registrations;

-- Optimize tables
OPTIMIZE TABLE registrations;
OPTIMIZE TABLE admin_users;
\`\`\`

## Security Considerations

### Production Security Checklist

- [ ] Use strong, unique passwords for admin accounts
- [ ] Enable HTTPS/SSL certificates
- [ ] Use environment variables for all sensitive data
- [ ] Implement rate limiting for API endpoints
- [ ] Use proper database connection pooling
- [ ] Enable CORS protection
- [ ] Implement input validation and sanitization
- [ ] Use secure session management
- [ ] Regular security updates and patches
- [ ] Enable MySQL SSL connections

### MySQL Security

\`\`\`sql
-- Create dedicated database user with limited permissions
CREATE USER 'photokrafft_app'@'localhost' IDENTIFIED BY 'very_secure_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON event_registration.registrations TO 'photokrafft_app'@'localhost';
GRANT SELECT ON event_registration.admin_users TO 'photokrafft_app'@'localhost';
FLUSH PRIVILEGES;

-- Enable SSL (in production)
-- Add to MySQL configuration file (my.cnf)
[mysqld]
ssl-ca=/path/to/ca.pem
ssl-cert=/path/to/server-cert.pem
ssl-key=/path/to/server-key.pem
\`\`\`

## Troubleshooting

### Common Issues

**Database connection failed:**
\`\`\`bash
# Check MySQL service status
sudo systemctl status mysql

# Test connection
mysql -u photokrafft_user -p -h localhost event_registration

# Check MySQL error logs
sudo tail -f /var/log/mysql/error.log
\`\`\`

**Email not sending:**
- Check SMTP credentials
- Verify firewall settings (port 587/465)
- Test with a simple SMTP client
- Check email provider limits

**Admin login not working:**
- Verify admin credentials in database
- Check password hashing implementation
- Clear browser cache and cookies

**Performance issues:**
\`\`\`sql
-- Check for missing indexes
SELECT * FROM registrations WHERE event_name = 'specific_event';
EXPLAIN SELECT * FROM registrations WHERE event_name = 'specific_event';

-- Monitor active connections
SHOW PROCESSLIST;

-- Check table locks
SHOW OPEN TABLES WHERE In_use > 0;
\`\`\`

## Development

### Adding New Fields

1. Update database schema:
\`\`\`sql
ALTER TABLE registrations ADD COLUMN new_field VARCHAR(255) NULL;
\`\`\`

2. Update form component in \`components/event-registration-form.tsx\`
3. Update API routes in \`app/api/register/route.ts\`
4. Update admin dashboard in \`components/admin-dashboard.tsx\`

### Database Migrations

Create numbered migration files:
\`\`\`sql
-- migrations/001_add_phone_field.sql
ALTER TABLE registrations ADD COLUMN phone VARCHAR(20) NULL;

-- migrations/002_add_company_field.sql  
ALTER TABLE registrations ADD COLUMN company VARCHAR(255) NULL;
\`\`\`

## Support

For technical support or questions:
1. Check the GitHub issues page
2. Review the troubleshooting section
3. Contact the development team

## License

This project is licensed under the MIT License. See LICENSE file for details.

---

**Built with ❤️ for Photokrafft**
\`\`\`

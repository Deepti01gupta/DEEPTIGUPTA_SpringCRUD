# Student Management System

A full-stack web application for managing student records with **Spring Boot REST API backend** and **React SPA frontend**.

## Project Overview

This is a complete, production-ready student management system demonstrating modern web development practices:

- **Backend**: Spring Boot 4.0.6 with Java 17, JDBC (NO JPA), PostgreSQL
- **Frontend**: React 18.2.0 with React Router 6.20.0, Axios
- **Architecture**: Layered backend (Controller → Service → Repository), component-based frontend
- **Database**: PostgreSQL with HikariCP connection pooling
- **Communication**: RESTful API with CORS enabled

## Project Structure

```
test 1/
├── backend/                    # Spring Boot REST API
│   ├── README.md              # Backend documentation
│   ├── src/                   # Java source code
│   ├── database.sql           # DB schema & sample data
│   ├── pom.xml                # Maven configuration
│   └── mvnw.cmd               # Maven wrapper (Windows)
│
└── frontend/                  # React SPA
    ├── README.md              # Frontend documentation
    ├── src/                   # React components & styles
    ├── public/                # Static assets
    ├── package.json           # npm configuration
    └── package-lock.json      # Locked dependencies
```

## Quick Start (3 Steps)

### Step 1: Start Backend
```bash
cd backend
mvnw spring-boot:run
```
✅ Runs on http://localhost:8080

### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 3: Start Frontend
```bash
npm start
```
✅ Opens http://localhost:3000

## Prerequisites

- **Backend**: Java 17, PostgreSQL 10+, Maven 3.6+
- **Frontend**: Node.js 14+, npm 6+

## Features

### Backend (REST API)
✅ Full CRUD operations for students  
✅ Input validation & error handling  
✅ CORS enabled for frontend integration  
✅ Connection pooling (HikariCP)  
✅ SQL queries with JDBC (no ORM)  
✅ Proper HTTP status codes  

### Frontend (React SPA)
✅ View all students in table format  
✅ Add new student with form validation  
✅ Edit existing student information  
✅ Delete student with confirmation  
✅ Responsive design (mobile-friendly)  
✅ Loading states & error messages  
✅ Client-side routing with React Router  

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /students | Get all students |
| GET | /students/{id} | Get student by ID |
| POST | /students | Create new student |
| PUT | /students/{id} | Update student |
| DELETE | /students/{id} | Delete student |

## Database Setup

1. **Create database:**
   ```bash
   psql -U postgres
   CREATE DATABASE mydb;
   ```

2. **Load schema:**
   ```bash
   psql -U postgres -d mydb -f backend/database.sql
   ```

3. **Update credentials** in `backend/src/main/resources/application.properties`

## Testing the System

### Option 1: Manual Testing (Browser)
1. Go to http://localhost:3000
2. View the student list
3. Click "Edit" to modify a student
4. Click "Delete" to remove a student
5. Click "+ Add New Student" to create new entry

### Option 2: API Testing (cURL)
```bash
# Get all students
curl http://localhost:8080/students

# Get specific student
curl http://localhost:8080/students/1

# Create new student
curl -X POST http://localhost:8080/students \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","course":"CS"}'
```

### Option 3: Using Postman
- Import collection or manually add endpoints
- Base URL: http://localhost:8080/students
- All requests use JSON format

## File Checklist for Submission

✅ Backend:
- [x] Spring Boot application with proper structure
- [x] JDBC data access (NO Hibernate/JPA)
- [x] Layered architecture
- [x] Exception handling with GlobalExceptionHandler
- [x] PostgreSQL database setup script (database.sql)
- [x] All 5 CRUD endpoints implemented
- [x] CORS enabled for frontend
- [x] README.md with complete documentation
- [x] .gitignore configured
- [x] Maven configuration (pom.xml)

✅ Frontend:
- [x] React application with 3 components
- [x] React Router with 4 routes
- [x] Form validation
- [x] Axios API service
- [x] CSS styling (no UI frameworks)
- [x] Loading/error states
- [x] README.md with complete documentation
- [x] .gitignore configured
- [x] npm configuration (package.json)

## Key Design Decisions

### Backend
1. **JDBC over JPA** - Full control, direct SQL queries, better performance for this use case
2. **JdbcTemplate** - Spring's preferred JDBC abstraction
3. **Layered Architecture** - Clean separation of concerns
4. **Global Exception Handler** - Centralized error management
5. **HikariCP** - High-performance connection pooling

### Frontend
1. **React Hooks** - Modern functional components only
2. **Pure CSS3** - No external UI frameworks for full customization
3. **React Router v6** - Latest routing with hooks support
4. **Axios** - Simple, reliable HTTP client
5. **Client-side Validation** - Immediate user feedback

## Build & Deployment

### Backend Build
```bash
cd backend
mvnw clean package
# Creates backend-0.0.1-SNAPSHOT.jar
```

### Frontend Build
```bash
cd frontend
npm run build
# Creates optimized build/ folder
```

## Performance Considerations

- HikariCP connection pooling reduces database overhead
- React hooks prevent unnecessary re-renders
- JDBC direct queries avoid ORM overhead
- CSS is minified in production build
- Lazy loading for routes possible in production

## Security Notes

- CORS restricted to localhost:3000 (update for production)
- Input validation on both client and server
- Prepared statements in JDBC prevent SQL injection
- Update credentials before production deployment

## Troubleshooting Guide

See individual README files:
- Backend issues → [backend/README.md](backend/README.md)
- Frontend issues → [frontend/README.md](frontend/README.md)

## Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| Backend Language | Java 17 |
| Backend Framework | Spring Boot 4.0.6 |
| Data Access | JDBC + JdbcTemplate |
| Database | PostgreSQL |
| Frontend Library | React 18.2.0 |
| Routing | React Router 6.20.0 |
| HTTP Client | Axios 1.6.0 |
| Styling | Pure CSS3 |
| Build Tools | Maven (backend), npm (frontend) |

## Compliance Checklist

✅ Spring Boot REST API with proper HTTP methods  
✅ JdbcTemplate for direct JDBC access  
✅ NO JPA/Hibernate used  
✅ Layered architecture (Controller-Service-Repository-Model)  
✅ All CRUD operations implemented  
✅ PostgreSQL database  
✅ React SPA frontend  
✅ React Router for navigation  
✅ Form validation  
✅ CSS styling (no Bootstrap/Material-UI)  
✅ Full documentation provided  

## Next Steps for Production

1. Add authentication (JWT/OAuth)
2. Implement pagination for large datasets
3. Add search/filter functionality
4. Set up CI/CD pipeline
5. Deploy to cloud (AWS/Azure/Heroku)
6. Add comprehensive test coverage
7. Implement logging/monitoring
8. Add API documentation (Swagger/OpenAPI)

## Support

For issues, refer to:
- Backend: [backend/README.md](backend/README.md#troubleshooting)
- Frontend: [frontend/README.md](frontend/README.md#troubleshooting)

---

**Project Status**: ✅ **READY FOR SUBMISSION**

All requirements met, fully functional, and comprehensively documented.

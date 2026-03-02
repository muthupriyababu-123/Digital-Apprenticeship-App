# 📡 API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User
**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "firstName": "Rahul",
  "lastName": "Kumar",
  "email": "rahul@example.com",
  "password": "password123",
  "role": "student"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "Rahul",
    "lastName": "Kumar",
    "email": "rahul@example.com",
    "role": "student"
  }
}
```

**Status Codes:**
- `201` - Success
- `400` - Email already registered
- `500` - Server error

---

### Login User
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "rahul@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "Rahul",
    "lastName": "Kumar",
    "email": "rahul@example.com",
    "role": "student",
    "profilePicture": "https://..."
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Invalid credentials
- `400` - Missing email or password

---

### Get Current User
**Endpoint:** `GET /auth/me`

**Authentication:** Required ✓

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstName": "Rahul",
  "lastName": "Kumar",
  "email": "rahul@example.com",
  "role": "student",
  "bio": "Aspiring full-stack developer",
  "skills": ["JavaScript", "React", "Node.js"],
  "interests": ["Web Development"],
  "verified": true
}
```

**Status Codes:**
- `200` - Success
- `401` - No token or invalid token

---

## 👥 User Endpoints

### Get User Profile
**Endpoint:** `GET /users/:id`

**Parameters:**
- `id` - User ID (path parameter)

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstName": "Rahul",
  "lastName": "Kumar",
  "email": "rahul@example.com",
  "role": "student",
  "profilePicture": "https://...",
  "bio": "Aspiring full-stack developer",
  "phone": "+91-9876543210",
  "location": "Bangalore, India",
  "skills": ["JavaScript", "React", "Node.js"],
  "interests": ["Web Development", "Backend"],
  "education": {
    "institution": "IIT Bombay",
    "degree": "B.Tech",
    "field": "Computer Science",
    "startYear": 2020,
    "endYear": 2024
  }
}
```

---

### Update User Profile
**Endpoint:** `PUT /users/:id`

**Authentication:** Required ✓

**Request Body:**
```json
{
  "bio": "Full-stack developer from Bangalore",
  "phone": "+91-9876543210",
  "location": "Bangalore, India",
  "website": "https://example.com",
  "skills": ["JavaScript", "React", "Node.js", "Python"],
  "interests": ["Web Development", "AI"]
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "Rahul",
    "bio": "Full-stack developer from Bangalore",
    "skills": ["JavaScript", "React", "Node.js", "Python"]
  }
}
```

---

### List All Users (Admin Only)
**Endpoint:** `GET /users`

**Authentication:** Required (Admin) ✓

**Query Parameters:**
- `role` - Filter by role (student, company, educator, admin)
- `search` - Search by firstName, lastName, or email

**Example:**
```
GET /users?role=student&search=rahul
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "Rahul",
    "lastName": "Kumar",
    "email": "rahul@example.com",
    "role": "student"
  }
]
```

---

### Delete User (Admin Only)
**Endpoint:** `DELETE /users/:id`

**Authentication:** Required (Admin) ✓

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

---

## 📋 Task Endpoints

### Get All Tasks
**Endpoint:** `GET /tasks`

**Query Parameters:**
- `category` - Filter by category (web-dev, mobile-dev, data-science, design, devops)
- `difficulty` - Filter by difficulty (beginner, intermediate, advanced)
- `search` - Search in title and description

**Example:**
```
GET /tasks?category=web-dev&difficulty=beginner&search=react
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Build a Todo Application with React",
    "description": "Create a fully functional todo app...",
    "category": "web-dev",
    "difficulty": "beginner",
    "skills": ["React", "JavaScript"],
    "postedBy": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "Tech",
      "lastName": "Corp",
      "profilePicture": "https://..."
    },
    "estimatedHours": 8,
    "xpReward": 150,
    "status": "published"
  }
]
```

---

### Get Task Details
**Endpoint:** `GET /tasks/:id`

**Parameters:**
- `id` - Task ID (path parameter)

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Build a Todo Application with React",
  "description": "Create a fully functional todo application with add, edit, delete, and filter functionalities using React hooks.",
  "category": "web-dev",
  "difficulty": "beginner",
  "skills": ["React", "JavaScript", "CSS"],
  "postedBy": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "Tech",
    "lastName": "Corp",
    "email": "techcorp@example.com",
    "profilePicture": "https://..."
  },
  "deliverables": ["GitHub Repository", "Deployed Link", "Code Documentation"],
  "deadline": "2025-02-20",
  "estimatedHours": 8,
  "xpReward": 150,
  "status": "published",
  "submissions": []
}
```

---

### Create Task
**Endpoint:** `POST /tasks`

**Authentication:** Required (Company/Educator) ✓

**Request Body:**
```json
{
  "title": "Build a Todo Application",
  "description": "Create a fully functional todo app...",
  "category": "web-dev",
  "difficulty": "beginner",
  "skills": ["React", "JavaScript", "CSS"],
  "deliverables": ["GitHub Repo", "Live Demo"],
  "deadline": "2025-02-20",
  "estimatedHours": 8,
  "xpReward": 150
}
```

**Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Build a Todo Application",
    "status": "published",
    "postedBy": "507f1f77bcf86cd799439011"
  }
}
```

---

### Update Task
**Endpoint:** `PUT /tasks/:id`

**Authentication:** Required (Task creator/Admin) ✓

**Request Body:**
```json
{
  "title": "Build an Advanced Todo Application",
  "difficulty": "intermediate",
  "xpReward": 200
}
```

**Response:**
```json
{
  "message": "Task updated successfully",
  "task": { /* updated task object */ }
}
```

---

### Delete Task
**Endpoint:** `DELETE /tasks/:id`

**Authentication:** Required (Task creator/Admin) ✓

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

---

### Submit Task
**Endpoint:** `POST /tasks/:taskId/submit`

**Authentication:** Required (Student) ✓

**Parameters:**
- `taskId` - Task ID (path parameter)

**Request Body:**
```json
{
  "description": "I've built a fully functional todo application with all requested features.",
  "githubLink": "https://github.com/user/todo-app",
  "fileLink": "https://drive.google.com/...",
  "videoLink": "https://youtu.be/..."
}
```

**Response:**
```json
{
  "message": "Task submitted successfully",
  "submission": {
    "_id": "507f1f77bcf86cd799439013",
    "task": "507f1f77bcf86cd799439012",
    "student": "507f1f77bcf86cd799439011",
    "status": "submitted",
    "submittedAt": "2025-01-20T10:30:00Z"
  }
}
```

**Status Codes:**
- `201` - Success
- `400` - Already submitted
- `404` - Task not found
- `401` - Not authenticated

---

## 🏥 Health Check

### Server Health
**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "Server is running ✓",
  "timestamp": "2025-01-20T10:30:00.000Z"
}
```

---

## ❌ Error Responses

### Standard Error Format
```json
{
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad request (validation error)
- `401` - Unauthorized (no token or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not found
- `500` - Server error

### Example Error Response
```json
{
  "error": "Email already registered"
}
```

---

## 📝 Role-Based Access Control

| Endpoint | Public | Student | Company | Educator | Admin |
|----------|--------|---------|---------|----------|-------|
| POST /auth/register | ✓ | ✓ | ✓ | ✓ | ✓ |
| POST /auth/login | ✓ | ✓ | ✓ | ✓ | ✓ |
| GET /auth/me | | ✓ | ✓ | ✓ | ✓ |
| GET /users/:id | ✓ | ✓ | ✓ | ✓ | ✓ |
| PUT /users/:id | | ✓ | ✓ | ✓ | ✓ |
| GET /users | | | | | ✓ |
| DELETE /users/:id | | | | | ✓ |
| GET /tasks | ✓ | ✓ | ✓ | ✓ | ✓ |
| GET /tasks/:id | ✓ | ✓ | ✓ | ✓ | ✓ |
| POST /tasks | | | ✓ | ✓ | ✓ |
| PUT /tasks/:id | | | ✓* | ✓* | ✓ |
| DELETE /tasks/:id | | | ✓* | ✓* | ✓ |
| POST /tasks/:id/submit | | ✓ | | | |

*Creator only

---

## 🧪 Testing with Postman

1. **Import Collection:**
   - Create new Postman collection
   - Add base URL: `http://localhost:5000/api`

2. **Set Environment Variables:**
   - `token`: From login response
   - `userId`: User ID
   - `taskId`: Task ID

3. **Test Flow:**
   - Register → Login → Get Token
   - Create Task → Get Task → Update Task
   - Submit Task → Get Submission

---

## 📚 Response Examples

All successful responses include relevant data. List endpoints return arrays. Error responses include error message.

For more details, review the controllers in `server/controllers/` directory.

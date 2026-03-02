# 🚀 Quick Reference Guide

## ⚡ 5-Minute Quick Start

```bash
# Terminal 1 - Backend
cd server
npm install
npm run seed
npm run dev
# Server ready on http://localhost:5000

# Terminal 2 - Frontend  
cd client
npm install
npm start
# App opens on http://localhost:3000
```

**Login:** rahul@example.com / password123

---

## 📁 Key Files to Know

| File | Purpose | Edit When |
|------|---------|-----------|
| `server/server.js` | Express setup | Adding middleware |
| `server/models/User.js` | User schema | Changing user fields |
| `server/controllers/authController.js` | Login logic | Modifying auth |
| `client/src/App.js` | React setup | Adding routes |
| `client/src/pages/Home.js` | Landing page | Changing homepage |
| `client/src/api.js` | API client | Adding endpoints |
| `.env` (server) | Server config | Database URL, secrets |
| `.env.local` (client) | Frontend config | API URL |

---

## 🔧 Common Commands

### Backend
```bash
cd server
npm install          # Install dependencies
npm run seed         # Seed sample data
npm run dev          # Start with auto-reload
npm start            # Start production
npm audit            # Check security
```

### Frontend
```bash
cd client
npm install          # Install dependencies
npm start            # Development server
npm run build        # Production build
npm test             # Run tests
npm audit            # Check security
```

### Docker
```bash
docker-compose build # Build images
docker-compose up    # Start all services
docker-compose down  # Stop services
```

---

## 🧪 Test Accounts

### Students
- Email: `rahul@example.com` | Pass: `password123`
- Email: `priya@example.com` | Pass: `password123`
- Email: `amit@example.com` | Pass: `password123`

### Companies
- Email: `techcorp@example.com` | Pass: `password123`
- Email: `datasys@example.com` | Pass: `password123`

### Educator
- Email: `sharma@college.com` | Pass: `password123`

---

## 📡 Most Used API Endpoints

```bash
# Register
POST /api/auth/register
{ "firstName": "John", "lastName": "Doe", "email": "john@test.com", "password": "pass123", "role": "student" }

# Login
POST /api/auth/login
{ "email": "john@test.com", "password": "pass123" }

# Get Profile
GET /api/users/:id
Header: Authorization: Bearer <token>

# List Tasks
GET /api/tasks?category=web-dev&difficulty=beginner

# Get Task
GET /api/tasks/:taskId

# Submit Task
POST /api/tasks/:taskId/submit
{ "description": "Done!", "githubLink": "https://..." }

# Create Task (Company)
POST /api/tasks
{ "title": "Build App", "description": "...", "category": "web-dev", "difficulty": "intermediate", "skills": ["React"], "estimatedHours": 8, "xpReward": 150 }
```

---

## 📂 Folder Quick Navigation

```
client/src/
├── pages/        ← Add new pages here
├── components/   ← Add reusable components
├── hooks/        ← Add custom hooks
├── api.js        ← Add API calls
└── styles/       ← Global CSS

server/
├── models/       ← Database schemas
├── controllers/  ← Business logic
├── routes/       ← API endpoints
├── middleware/   ← Auth, validation
└── server.js     ← App entry
```

---

## 🎨 UI Component Template

```jsx
// Quick component template
import React from 'react';

const ComponentName = () => {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Title</h2>
      <p className="text-gray-600">Content</p>
      <button className="btn btn-primary mt-4">Action</button>
    </div>
  );
};

export default ComponentName;
```

---

## 🔌 API Endpoint Template

```javascript
// Quick endpoint template
exports.getExample = async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## 🛠 Environment Setup

### Server .env
```env
MONGODB_URI=mongodb://localhost:27017/digital-apprenticeship
JWT_SECRET=dev_secret_key_change_in_prod
PORT=5000
NODE_ENV=development
```

### Client .env.local
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐛 Quick Debugging

| Issue | Solution |
|-------|----------|
| "Cannot find module" | `npm install` |
| Port already in use | `npm run dev` (port 5000) or change PORT |
| MongoDB error | Start MongoDB or update MONGODB_URI |
| API not working | Check Authorization header has token |
| Styles missing | Clear cache (Ctrl+Shift+Del) |
| Component not rendering | Check React DevTools (F12) |

---

## 📊 Database Quick Check

```javascript
// MongoDB shell commands
use digital-apprenticeship
db.users.find().pretty()           // See users
db.tasks.find().pretty()           // See tasks
db.users.deleteMany({})            // Clear users
db.tasks.countDocuments()          // Count tasks
```

---

## 🔐 JWT Token Usage

```javascript
// Add token to requests
const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};

// API client already handles this in client/src/api.js
```

---

## 🎯 Adding a New Feature

### 1. Create Route
```javascript
// server/routes/feature.js
router.post('/', authMiddleware, featureController.create);
```

### 2. Create Controller
```javascript
// server/controllers/featureController.js
exports.create = async (req, res) => { /* logic */ };
```

### 3. Add Model
```javascript
// server/models/Feature.js
const schema = new mongoose.Schema({ /* fields */ });
```

### 4. Add API Call
```javascript
// client/src/api.js
export const featureAPI = {
  create: (data) => api.post('/features', data),
};
```

### 5. Create Component
```jsx
// client/src/pages/FeaturePage.js
import { featureAPI } from '../api';
```

---

## 📈 Performance Tips

- Use MongoDB indexes on frequently queried fields
- Implement pagination for large lists
- Cache data in localStorage when appropriate
- Use React.lazy() for code splitting
- Optimize images (use .webp format)
- Minimize API calls

---

## 🔒 Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS in production
- [ ] Validate all user inputs
- [ ] Never log sensitive data
- [ ] Use environment variables for secrets
- [ ] Set CORS properly for production
- [ ] Update dependencies regularly
- [ ] Monitor error logs

---

## 📚 Documentation Files

| File | Content |
|------|---------|
| README.md | Overview & features |
| INSTALLATION.md | Setup instructions |
| API_DOCS.md | API reference |
| ARCHITECTURE.md | System design |
| PROJECT_SUMMARY.md | Complete summary |
| QUICK_REFERENCE.md | This file |

---

## 🚀 Deployment Checklist

- [ ] Update NODE_ENV to production
- [ ] Change JWT_SECRET
- [ ] Set MONGODB_URI to production DB
- [ ] Update CORS settings
- [ ] Remove console.logs
- [ ] Build frontend: `npm run build`
- [ ] Test all endpoints
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Set up CI/CD

---

## 💡 Useful Links

- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [JWT.io](https://jwt.io)
- [REST API Best Practices](https://restfulapi.net)

---

## 🎯 Keyboard Shortcuts

### Development
- `npm start` - Start frontend
- `npm run dev` - Start backend with auto-reload
- `F12` - Open DevTools
- `Ctrl+Shift+Del` - Clear cache
- `Ctrl+K` - Search in VS Code

### Debugging
- `debugger;` - Pause in Chrome DevTools
- `console.log()` - Log to console
- `console.table()` - Pretty print objects
- `console.error()` - Log errors

---

## 📞 Getting Help

1. **Check docs:** README.md, INSTALLATION.md, API_DOCS.md
2. **Search issues:** GitHub issues
3. **Review code:** Check similar implementation
4. **Ask community:** Stack Overflow, Reddit, Discord
5. **Contact support:** Create GitHub issue

---

## ✅ Daily Development Workflow

```bash
# Morning - Start
cd server && npm run dev        # Terminal 1
cd client && npm start          # Terminal 2
# Visit http://localhost:3000

# Code changes
# Auto-reload in both terminal and browser

# End of day - Clean up
# Commit: git add . && git commit -m "Feature: ..."
# Push: git push origin feature-branch
```

---

**Last Updated:** January 2026
**Status:** ✅ Complete & Production Ready
**Questions?** Check documentation or GitHub issues

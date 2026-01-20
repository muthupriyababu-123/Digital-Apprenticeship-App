# 🚀 Installation & Setup Guide

## System Requirements

- Node.js v16 or higher
- MongoDB v4.4 or higher (or MongoDB Atlas account)
- npm or yarn
- Git
- Docker (optional, for containerized setup)

## 📋 Pre-Installation

1. **Install Node.js:**
   - Download from https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **Install MongoDB (Optional - Use MongoDB Atlas instead):**
   - Download from https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (Cloud): https://www.mongodb.com/cloud/atlas

3. **Clone Repository:**
   ```bash
   git clone https://github.com/yourusername/Digital-Apprenticeship-App.git
   cd Digital-Apprenticeship-App
   ```

## 🔧 Backend Setup (Express Server)

### Step 1: Navigate to Server Directory
```bash
cd server
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file with your settings:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/digital-apprenticeship
DATABASE_NAME=digital-apprenticeship

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_in_production_12345
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (Optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_SERVICE=gmail

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=uploads/
```

### Step 4: Database Setup

**Option A: Local MongoDB**
- Install MongoDB on your system
- Start MongoDB service:
  ```bash
  # Windows
  mongod
  
  # macOS
  brew services start mongodb-community
  
  # Linux
  sudo systemctl start mongod
  ```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/digital-apprenticeship
   ```

### Step 5: Seed Database (Optional)
```bash
npm run seed
```

This creates sample users, tasks, and data for testing:
- 3 students
- 2 companies
- 1 educator
- 8 sample tasks

### Step 6: Start Server
```bash
npm run dev
```

Server runs on `http://localhost:5000`

Verify: Visit `http://localhost:5000/api/health` - should return status OK

## 🎨 Frontend Setup (React App)

### Step 1: Navigate to Client Directory
```bash
cd client
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
```bash
# Create .env.local file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env.local
```

Edit `.env.local`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 4: Start Development Server
```bash
npm start
```

App runs on `http://localhost:3000`

Will automatically open in default browser. If not, visit manually.

## 🐳 Docker Setup (Alternative)

### Prerequisites
- Install Docker: https://www.docker.com/products/docker-desktop
- Install Docker Compose

### Step 1: Build and Run
```bash
docker-compose build
docker-compose up
```

Services:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

### Step 2: Seed Database
```bash
docker-compose exec server npm run seed
```

### Step 3: Stop Services
```bash
docker-compose down
```

## ✅ Verification Checklist

After setup, verify everything works:

1. **Backend API:**
   - [ ] Server starts without errors
   - [ ] Health check endpoint works: `http://localhost:5000/api/health`
   - [ ] Can connect to MongoDB

2. **Frontend:**
   - [ ] App starts without errors
   - [ ] Loads on `http://localhost:3000`
   - [ ] Can see home page with navigation
   - [ ] CSS styles are applied (colors, fonts)

3. **Authentication:**
   - [ ] Can register with test credentials
   - [ ] Can login with registered account
   - [ ] JWT token stored in localStorage
   - [ ] Logout clears token

4. **API Endpoints:**
   - [ ] GET /api/tasks - Returns list of tasks
   - [ ] GET /api/health - Returns status
   - [ ] POST /api/auth/register - Registers user
   - [ ] POST /api/auth/login - Logs in user

## 🧪 Test Login Credentials

After seeding database:

```
Student Account:
Email: rahul@example.com
Password: password123

Company Account:
Email: techcorp@example.com
Password: password123

Educator Account:
Email: sharma@college.com
Password: password123
```

## 🔍 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas, verify IP whitelist allows your connection

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### npm install Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

### React App Not Loading
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)
- Ensure backend is running
- Check REACT_APP_API_URL in .env.local

### Module Not Found Errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Development Workflow

1. **Start Terminal 1 (Backend):**
   ```bash
   cd server
   npm run dev
   ```

2. **Start Terminal 2 (Frontend):**
   ```bash
   cd client
   npm start
   ```

3. **Code Changes:**
   - Both run in watch mode
   - Auto-reload on file changes
   - Check browser/console for errors

4. **Testing:**
   - Use Postman for API testing
   - Use browser DevTools for frontend debugging

## 📦 Building for Production

### Backend Build
```bash
cd server
npm install --production
NODE_ENV=production npm start
```

### Frontend Build
```bash
cd client
npm run build
```

Creates optimized `build/` folder for deployment.

## 🚀 Deployment Options

### Option 1: Heroku
```bash
# Backend
cd server
heroku create your-app-backend
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main

# Frontend (Vercel)
cd client
vercel
```

### Option 2: AWS
- EC2 for backend
- S3 + CloudFront for frontend
- RDS or MongoDB Atlas for database

### Option 3: DigitalOcean
- App Platform for backend
- Spaces for static files
- Managed Database

### Option 4: Docker + Self-Hosted
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📞 Support

If you encounter issues:
1. Check error messages carefully
2. Review logs in console
3. Check GitHub issues
4. Review environment variables
5. Verify all prerequisites installed

## 🎉 You're Ready!

Once setup is complete:
- Visit http://localhost:3000
- Register or login with test credentials
- Explore the platform
- Create tasks, submit solutions
- Track progress

Happy coding! 🚀

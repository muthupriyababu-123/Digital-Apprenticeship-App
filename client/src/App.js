import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskList from './pages/TaskList';
import StudentDashboard from './pages/StudentDashboard';
import useAuth from './hooks/useAuth';
import './styles/index.css';

function App() {
  const { user, token, login, logout, isAuthenticated } = useAuth();
  const [currentUser, setCurrentUser] = useState(user);

  // Sync currentUser with useAuth user state (e.g., after page refresh)
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    // Note: Assuming token is handled inside your useAuth login method
    login(userData, localStorage.getItem('token'));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    logout();
  };

  return (
    <Router>
      <Navbar user={currentUser} onLogout={handleLogout} />
      <div className="pt-16"> {/* Added padding top to prevent content being hidden under Navbar */}
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Home />} />

          {/* Protected Task Route - Added auth check */}
          <Route 
            path="/tasks" 
            element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />} 
          />

          {/* Protected Dashboard Route */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <StudentDashboard user={currentUser} /> : <Navigate to="/login" />}
          />

          {/* Auth Routes */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register onRegisterSuccess={handleLoginSuccess} />}
          />

          {/* Fallback Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
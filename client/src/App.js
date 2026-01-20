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

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    login(userData, localStorage.getItem('token'));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    logout();
  };

  return (
    <Router>
      <Navbar user={currentUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register onRegisterSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <StudentDashboard user={currentUser} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

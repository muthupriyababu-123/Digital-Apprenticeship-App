import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';

// Pages
import Home from './pages/Home';                   // Step 1
import Register from './pages/Register';           // Step 2
import Login from './pages/Login';                 // Step 3
import UnifiedProfile from './pages/UnifiedProfile'; // Step 4
import StudentDashboard from './pages/StudentDashboard'; // Step 5
import CompanyPortal from './pages/CompanyPortal'; // Step 5 (Alternative)
import TaskList from './pages/TaskList';           // Step 6

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync state with localStorage on mount (prevents logout on refresh)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Auth initialization error:", e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  // Prevent "flicker" while checking login status
  if (loading) return null; 

  return (
    <Router>
      {/* GLOBAL NAVBAR: Step 1-7 visibility */}
      <Navbar user={user} onLogout={handleLogout} />
      
      {/* 
         MAIN CONTENT AREA 
         pt-16 ensures content doesn't hide under the fixed Navbar 
      */}
      <div className="pt-16 min-h-screen bg-gray-50">
        <Routes>
          
          {/* STEP 1: Homepage (Redirects to Profile if already logged in) */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/profile" /> : <Home />} 
          />

          {/* STEP 2: Register (Redirects to Profile if already logged in) */}
          <Route 
            path="/register" 
            element={!user ? <Register onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/profile" />} 
          />

          {/* STEP 3: Login (Redirects to Profile if already logged in) */}
          <Route 
            path="/login" 
            element={!user ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/profile" />} 
          />

          {/* STEP 4: Unified Profile (The "Landing Page" after Login/Register) */}
          <Route 
            path="/profile" 
            element={user ? <UnifiedProfile user={user} /> : <Navigate to="/login" />} 
          />

          {/* STEP 5: Student Dashboard (The Stats/XP Page) */}
          <Route 
            path="/student-dashboard" 
            element={user?.role === 'student' ? <StudentDashboard user={user} /> : <Navigate to="/login" />} 
          />

          {/* STEP 5 (Alt): Company Portal */}
          <Route 
            path="/company-portal" 
            element={user?.role === 'company' ? <CompanyPortal user={user} /> : <Navigate to="/login" />} 
          />

          {/* STEP 6: Task List (The Apprenticeship Opportunities) */}
          <Route 
            path="/tasks" 
            element={user ? <TaskList user={user} /> : <Navigate to="/login" />} 
          />

          {/* FALLBACK: Any broken links go back Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      {/* STEP 7: GLOBAL CHATBOT 
          Placed here so it floats over every single page when user is logged in.
      */}
      {user && <Chatbot />} 
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Target, LayoutDashboard, User, LogOut, Menu, X, LogIn, UserPlus } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login'); // Better to send to login after logout
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full h-16 bg-blue-700 text-white shadow-lg flex items-center justify-between px-6 md:px-12 z-50">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
        <Target size={28} />
        <span className="text-2xl font-bold tracking-tight">SkillBridge</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {!user ? (
          <>
            <Link to="/" className="text-sm font-medium hover:text-blue-200 transition">Home</Link>
            <Link to="/login" className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-200 transition">
              <LogIn size={18} /> Login
            </Link>
            <Link to="/register" className="flex items-center gap-1.5 bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition">
              <UserPlus size={18} /> Register
            </Link>
          </>
        ) : (
          <>
            {/* Logic matches exactly with App.js paths */}
            <Link 
              to={user.role === 'company' ? "/company-portal" : "/student-dashboard"} 
              className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-200 transition"
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            
            <Link to="/profile" className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-200 transition">
              <User size={18} /> Me
            </Link>
            
            <div className="h-6 w-[1px] bg-blue-500 mx-2"></div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-light italic">Hi, {user?.name || "User"}</span>
              <button 
                onClick={handleLogoutClick}
                className="bg-red-500 hover:bg-red-600 p-2 rounded-full transition-all shadow-md active:scale-90"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-800 p-4 flex flex-col gap-4 md:hidden shadow-xl border-t border-blue-600">
          {!user ? (
            <>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                <LogIn size={20} /> Login
              </Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                <UserPlus size={20} /> Register
              </Link>
            </>
          ) : (
            <>
              <Link 
                to={user.role === 'company' ? "/company-portal" : "/student-dashboard"} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="flex items-center gap-2"
              >
                <LayoutDashboard size={20} /> Dashboard
              </Link>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                <User size={20} /> My Profile
              </Link>
              <button onClick={handleLogoutClick} className="flex items-center gap-2 text-red-300">
                <LogOut size={20} /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
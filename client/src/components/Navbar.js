import React from 'react';

const Navbar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold">🎯 SkillBridge</div>
        </div>

        <div className="hidden md:flex gap-6">
          <a href="/" className="hover:text-blue-200 transition">Home</a>
          <a href="/tasks" className="hover:text-blue-200 transition">Tasks</a>
          {user?.role === 'student' && (
            <a href="/dashboard" className="hover:text-blue-200 transition">Dashboard</a>
          )}
          {user?.role === 'company' && (
            <a href="/company" className="hover:text-blue-200 transition">Company Portal</a>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm">{user.firstName}</span>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="hover:text-blue-200">Login</a>
              <a href="/register" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                Sign Up
              </a>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 p-4">
          <a href="/" className="block py-2 hover:text-blue-200">Home</a>
          <a href="/tasks" className="block py-2 hover:text-blue-200">Tasks</a>
          {user && <a href="/dashboard" className="block py-2 hover:text-blue-200">Dashboard</a>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Globe, GraduationCap, LayoutDashboard, Award } from 'lucide-react';

const UnifiedProfile = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-10">
      {/* Dashboard Redirect Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {user?.firstName || user?.name?.split(' ')[0] || "Student"}!
          </h1>
          <p className="text-gray-500 text-sm">Manage your profile and explore opportunities.</p>
        </div>
        
        {/* FIXED NAVIGATION: Points to /student-dashboard to match App.js */}
        <button 
          onClick={() => navigate('/student-dashboard')}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 active:scale-95"
        >
          <LayoutDashboard size={20} />
          Go to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Student Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Profile Cover Photo */}
            <div className="h-40 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"></div>
            
            <div className="px-8 pb-8">
              {/* Profile Avatar */}
              <div className="relative -mt-16 mb-6">
                <div className="w-32 h-32 rounded-3xl border-4 border-white bg-white shadow-xl flex items-center justify-center overflow-hidden">
                   <img 
                    src={`https://ui-avatars.com/api/?name=${user?.firstName || user?.name || 'User'}&background=6366f1&color=fff&size=128`} 
                    alt="avatar" 
                    className="w-full h-full object-cover"
                   />
                </div>
              </div>

              {/* Name and Basic Info */}
              <h2 className="text-3xl font-extrabold text-gray-900">
                {user?.firstName} {user?.lastName || user?.name}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-600">
                <p className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  <GraduationCap size={16} />
                  Computer Science Student
                </p>
                <p className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  <Award size={16} />
                  Active Learner
                </p>
              </div>

              {/* About Section */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">About Me</h3>
                <p className="text-gray-600 leading-relaxed">
                  I am a passionate software engineering student specializing in React and modern web technologies. 
                  Currently seeking apprenticeship opportunities at TechCorp to apply my digital skills in a professional environment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Company Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 sticky top-24">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4 shadow-inner">
                <Briefcase size={40} />
              </div>
              <h3 className="font-bold text-xl text-gray-800">TechCorp Solutions</h3>
              <p className="text-sm text-blue-600 font-bold uppercase mt-1 tracking-wider">Official Hiring Partner</p>
            </div>
            
            <div className="space-y-4 text-sm text-gray-600 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg"><MapPin size={18} className="text-gray-400" /></div>
                <span>San Francisco, California</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg"><Globe size={18} className="text-gray-400" /></div>
                <span className="text-blue-600 hover:underline cursor-pointer font-medium">www.techcorp.io</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/tasks')}
              className="w-full mt-8 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl active:scale-95"
            >
              View Open Opportunities
            </button>
            
            <p className="text-center text-xs text-gray-400 mt-4 italic">
              TechCorp is actively recruiting student interns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedProfile;
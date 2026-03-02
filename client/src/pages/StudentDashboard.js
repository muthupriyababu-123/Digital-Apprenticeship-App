import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnifiedProfile = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto mt-10">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Profile Overview</h1>
          {/* NAVIGATION TO STEP 5 */}
          <button 
            onClick={() => navigate('/student-dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all transform hover:scale-105"
          >
            Go to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-sm border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800">
                {user?.firstName} {user?.lastName || 'Sample Student'}
            </h2>
            <p className="text-indigo-600 font-medium text-lg mt-1">Computer Science Student</p>
            
            <div className="my-8 border-b border-gray-100"></div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4">About Me</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              I am a student looking for digital apprenticeship opportunities. I specialize in full-stack development 
              and I am eager to solve real-world industry problems to bridge the gap between theory and practice.
            </p>
          </div>

          {/* Hiring Partner Sidebar */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 h-fit">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">T</div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 leading-tight">TechCorp Inc.</h2>
                    <p className="text-gray-500 font-medium">Hiring Partner</p>
                </div>
            </div>
            <p className="text-gray-600 text-sm mb-6">Actively looking for React and Node.js apprentices.</p>
            <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-md">
              Apply to Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedProfile;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { userAPI } from '../api';

const StudentDashboard = ({ user }) => {
  const navigate = useNavigate(); // Initialize navigation
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    totalXP: 1250,
    level: 5,
    completedTasks: 12,
    internshipReadiness: 75,
  });

  const [badges, setBadges] = useState([
    { name: 'First Task', icon: '⭐', earned: true },
    { name: 'Fast Learner', icon: '🚀', earned: true },
    { name: 'Expert', icon: '🏆', earned: false },
  ]);

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile(user.id);
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header - MODIFIED TO ADD BUTTON */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Welcome, {user?.firstName}!</h1>
            <p className="text-gray-600">Your learning journey awaits</p>
          </div>
          <button 
            onClick={() => navigate('/tasks')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            📋 View Tasks
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total XP', value: stats.totalXP, icon: '⚡' },
            { label: 'Level', value: stats.level, icon: '📊' },
            { label: 'Tasks Done', value: stats.completedTasks, icon: '✅' },
            { label: 'Internship Ready', value: `${stats.internshipReadiness}%`, icon: '💼' },
          ].map((stat, i) => (
            <div key={i} className="card bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-purple-600">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 card bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Skill Progress</h2>
            {[
              { name: 'React.js', progress: 85 },
              { name: 'Python', progress: 70 },
              { name: 'UI/UX Design', progress: 60 },
              { name: 'DevOps', progress: 45 },
            ].map((skill, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-800">{skill.name}</span>
                  <span className="text-purple-600 font-bold">{skill.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="card bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Achievements</h2>
            <div className="space-y-4">
              {badges.map((badge, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg border-2 ${
                    badge.earned
                      ? 'border-yellow-400 bg-yellow-50'
                      : 'border-gray-300 bg-gray-50 opacity-50'
                  }`}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <p className="font-semibold text-sm">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card bg-white p-6 rounded-xl shadow-sm mt-8">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { task: 'React Todo App', status: 'Completed', date: '2 days ago' },
              { task: 'Python Data Analysis', status: 'In Review', date: '5 days ago' },
              { task: 'UI Design Challenge', status: 'Completed', date: '1 week ago' },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">{activity.task}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    activity.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
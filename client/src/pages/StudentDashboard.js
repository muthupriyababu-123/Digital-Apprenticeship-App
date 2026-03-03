import React, { useState, useEffect } from 'react';
import ProgressCircle from '../components/ProgressCircle';
import { taskAPI } from '../api';

const StudentDashboard = ({ user }) => {
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    // API call to get tasks completed by user
    const fetchTasks = async () => {
      try {
        const response = await taskAPI.getUserTasks(user._id);
        setTasksCompleted(response.data.completed);
        setTotalTasks(response.data.total);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, [user]);

  const progressPercent = totalTasks > 0 ? Math.round((tasksCompleted / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-10">Welcome, {user.firstName}</h1>
      
      {/* Progress Circle */}
      <div className="max-w-xs mx-auto mb-12">
        <ProgressCircle progress={progressPercent} />
        <p className="text-center mt-4 text-gray-700 font-semibold">{tasksCompleted}/{totalTasks} Tasks Completed</p>
      </div>

      {/* Task List Button */}
      <div className="text-center">
        <button className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition">
          Go to My Tasks
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
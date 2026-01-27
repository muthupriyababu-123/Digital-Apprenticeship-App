import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../api';

const TaskList = () => {
  const navigate = useNavigate();
  
  // Existing States
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    search: '',
  });

  // New Workflow States: 'list', 'question', 'editor', 'success'
  const [view, setView] = useState('list');
  const [selectedTask, setSelectedTask] = useState(null);
  const [code, setCode] = useState('');

  // Default "Today's Task" if API doesn't provide a specific one
  const todaysTaskFallback = {
    title: "Create a Professional Login Page",
    difficulty: "Beginner",
    description: "Build a responsive login form using React and Tailwind CSS.",
    specs: [
      "Fields for Email and Password",
      "Form validation (Email must contain @)",
      "A 'Submit' button with a hover effect",
      "Forgot Password link styling"
    ]
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await taskAPI.getAllTasks(filters);
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const startTask = (task) => {
    setSelectedTask(task);
    setView('question');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* --- 1. LIST VIEW --- */}
        {view === 'list' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800">Assignments</h1>
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-purple-600 font-semibold hover:text-purple-800 transition"
              >
                &larr; Back to Dashboard
              </button>
            </div>

            {/* Today's Task Section (New Requirement) */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <span className="mr-2">🚀</span> Today's Assignment
              </h2>
              <button 
                onClick={() => startTask(todaysTaskFallback)}
                className="w-full text-left bg-white border-l-8 border-purple-600 rounded-xl shadow-md p-6 hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-md uppercase">Current Task</span>
                    <h3 className="text-2xl font-bold text-gray-800 mt-2">{todaysTaskFallback.title}</h3>
                    <p className="text-gray-600 mt-1">{todaysTaskFallback.description}</p>
                  </div>
                  <div className="bg-purple-600 text-white p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>

            <hr className="border-gray-300 mb-10" />

            {/* Filters (Existing) */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  name="search"
                  placeholder="Search previous tasks..."
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Categories</option>
                  <option value="web-dev">Web Development</option>
                  <option value="mobile-dev">Mobile Development</option>
                  <option value="data-science">Data Science</option>
                  <option value="design">UI/UX Design</option>
                  <option value="devops">DevOps</option>
                </select>
                <select
                  name="difficulty"
                  value={filters.difficulty}
                  onChange={handleFilterChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Previous Task Cards (Existing) */}
            <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
              <span className="mr-2">📚</span> Previous Tasks
            </h2>
            {loading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin text-4xl">⏳</div>
                <p className="text-gray-600 mt-4">Loading tasks...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => (
                  <div key={task._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between opacity-80 hover:opacity-100 transition">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{task.difficulty}</span>
                      </div>
                      <p className="text-gray-500 text-sm mb-4">{task.description?.substring(0, 80)}...</p>
                    </div>
                    <button 
                      onClick={() => startTask(task)}
                      className="w-full py-2 border border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition"
                    >
                      Review Task
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* --- 2. QUESTION VIEW --- */}
        {view === 'question' && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-10">
            <div className="bg-purple-600 p-6 text-white">
              <h2 className="text-2xl font-bold">{selectedTask?.title}</h2>
              <p className="opacity-80">Please read the specifications carefully.</p>
            </div>
            <div className="p-8">
              <div className="prose prose-purple mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Instructions:</h3>
                <p className="text-gray-600 mb-4">{selectedTask?.description}</p>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2">Requirements:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {selectedTask?.specs?.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  )) || <li>Complete the basic implementation of the task.</li>}
                </ul>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setView('editor')}
                  className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg"
                >
                  Get Started
                </button>
                <button 
                  onClick={() => setView('list')}
                  className="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. CODE EDITOR VIEW --- */}
        {view === 'editor' && (
          <div className="flex flex-col h-[85vh] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden mt-4">
            <div className="bg-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-gray-400 font-mono text-sm">solution.js</span>
              </div>
              <button 
                onClick={() => setView('success')}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold transition flex items-center gap-2"
              >
                Submit Task 🚀
              </button>
            </div>
            <textarea
              className="flex-grow w-full p-6 bg-gray-900 text-green-400 font-mono text-lg focus:outline-none resize-none"
              placeholder="// Type your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        )}

        {/* --- 4. SUCCESS VIEW --- */}
        {view === 'success' && (
          <div className="max-w-md mx-auto mt-20 text-center bg-white p-12 rounded-3xl shadow-2xl border border-gray-100">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
              ✓
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Perfect!</h1>
            <p className="text-gray-600 mb-8">Successfully submitted. Your mentor will review your work soon.</p>
            <button 
              onClick={() => {
                setView('list');
                setCode('');
              }}
              className="bg-purple-600 text-white w-full py-4 rounded-xl font-bold hover:bg-purple-700 transition"
            >
              Back to My Tasks
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default TaskList;
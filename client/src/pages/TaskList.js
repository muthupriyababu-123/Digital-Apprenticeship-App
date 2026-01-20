import React, { useState, useEffect } from 'react';
import { taskAPI } from '../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    search: '',
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Available Tasks</h1>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="search"
              placeholder="Search tasks..."
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

        {/* Task Cards */}
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin text-4xl">⏳</div>
            <p className="text-gray-600 mt-4">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-xl">No tasks found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task._id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
                  <span className="badge badge-primary">{task.difficulty}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{task.description.substring(0, 100)}...</p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {task.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">⏱️ {task.estimatedHours || 10} hrs</span>
                  <a href={`/task/${task._id}`} className="btn btn-primary text-sm">
                    View Task
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;

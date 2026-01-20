import React, { useState } from 'react';
import { taskAPI } from '../api';

const CompanyPortal = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'web-dev',
    difficulty: 'intermediate',
    skills: [],
    deliverables: [],
    estimatedHours: 10,
    xpReward: 100,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await taskAPI.createTask(formData);
      setShowCreateForm(false);
      setFormData({
        title: '',
        description: '',
        category: 'web-dev',
        difficulty: 'intermediate',
        skills: [],
        deliverables: [],
        estimatedHours: 10,
        xpReward: 100,
      });
      alert('Task created successfully!');
    } catch (error) {
      alert('Failed to create task: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Company Portal</h1>
            <p className="text-gray-600">Post industry projects and find top talent</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn btn-primary text-lg px-6 py-3"
          >
            + Post New Task
          </button>
        </div>

        {/* Create Task Form */}
        {showCreateForm && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-6">Create New Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <textarea
                name="description"
                placeholder="Task Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px]"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="web-dev">Web Development</option>
                  <option value="mobile-dev">Mobile Development</option>
                  <option value="data-science">Data Science</option>
                  <option value="design">UI/UX Design</option>
                  <option value="devops">DevOps</option>
                </select>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="estimatedHours"
                  placeholder="Estimated Hours"
                  value={formData.estimatedHours}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="number"
                  name="xpReward"
                  placeholder="XP Reward"
                  value={formData.xpReward}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                >
                  Create Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Posted Tasks', value: 12, icon: '📋' },
            { label: 'Submissions', value: 45, icon: '📥' },
            { label: 'Shortlisted', value: 8, icon: '⭐' },
          ].map((stat, i) => (
            <div key={i} className="card">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-gray-600">{stat.label}</p>
              <p className="text-3xl font-bold text-purple-600">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Posted Tasks */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Your Posted Tasks</h2>
          <div className="space-y-4">
            {[
              { title: 'Build E-commerce Platform', submissions: 12, status: 'Active' },
              { title: 'Mobile App UI Design', submissions: 8, status: 'Active' },
              { title: 'Data Analysis Dashboard', submissions: 15, status: 'Active' },
            ].map((task, i) => (
              <div
                key={i}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.submissions} submissions</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="badge badge-success">{task.status}</span>
                  <button className="btn btn-primary text-sm">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPortal;

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (userData) => API.post('/auth/register', userData),
  logout: () => API.post('/auth/logout'),
  getCurrentUser: () => API.get('/auth/me'),
};

// User API
export const userAPI = {
  getProfile: () => API.get('/users/profile'),
  updateProfile: (data) => API.put('/users/profile', data),
  getStudents: () => API.get('/users/students'),
  getUser: (id) => API.get(`/users/${id}`),
};

// Task API
export const taskAPI = {
  getTasks: () => API.get('/tasks'),
  getTask: (id) => API.get(`/tasks/${id}`),
  createTask: (taskData) => API.post('/tasks', taskData),
  updateTask: (id, taskData) => API.put(`/tasks/${id}`, taskData),
  deleteTask: (id) => API.delete(`/tasks/${id}`),
  submitTask: (id, submissionData) => API.post(`/tasks/${id}/submit`, submissionData),
};

// Keep backward compatibility
export const registerUser = (data) => API.post('/auth/register', data);

export default API;
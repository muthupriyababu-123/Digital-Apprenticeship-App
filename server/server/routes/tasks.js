const express = require('express');
const router = express.Router();
const { authMiddleware, authorize } = require('../middleware/auth');
const taskController = require('../controllers/taskController');

// Public routes
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);

// Protected routes
router.post('/', authMiddleware, authorize('company', 'educator', 'admin'), taskController.createTask);
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

// Student submission
router.post('/:taskId/submit', authMiddleware, authorize('student'), taskController.submitTask);

module.exports = router;

const express = require('express');
const router = express.Router();
const { authMiddleware, authorize } = require('../middleware/auth');
const userController = require('../controllers/userController');

// Get user profile
router.get('/:id', userController.getUserProfile);

// Update profile
router.put('/:id', authMiddleware, userController.updateProfile);

// Get all users (admin only)
router.get('/', authMiddleware, authorize('admin'), userController.getAllUsers);

// Delete user (admin only)
router.delete('/:id', authMiddleware, authorize('admin'), userController.deleteUser);

module.exports = router;

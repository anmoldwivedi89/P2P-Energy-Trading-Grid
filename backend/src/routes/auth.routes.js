const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { validateBody } = require('../middleware/validate.middleware');
const { authLimiter, registerLimiter } = require('../middleware/rateLimiter.middleware');

// Public endpoints: Rate limiter aur body validation ke sath register aur login
router.post('/register', registerLimiter, validateBody(['name', 'email', 'password']), authController.register);
router.post('/login', authLimiter, validateBody(['email', 'password']), authController.login);

// Authenticated endpoints: JWT token verify hone ke baad hi access milta hai
router.get('/me', authenticate, authController.getMe);
router.put('/profile', authenticate, authController.updateProfile);
router.post('/logout', authenticate, authController.logout);

// Admin-only user management: Sirf admin role wale user hi grid participants ki list dekh sakte hain
router.get('/users', authenticate, authorize('admin'), authController.getAllUsers);

module.exports = router;

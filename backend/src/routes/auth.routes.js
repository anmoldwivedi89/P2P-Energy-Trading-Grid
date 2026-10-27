const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { validateBody } = require('../middleware/validate.middleware');

// Public routes
router.post('/register', validateBody(['name', 'email', 'password']), authController.register);
router.post('/login', validateBody(['email', 'password']), authController.login);

// Authenticated routes
router.get('/me', authenticate, authController.getMe);
router.post('/logout', authenticate, authController.logout);

module.exports = router;

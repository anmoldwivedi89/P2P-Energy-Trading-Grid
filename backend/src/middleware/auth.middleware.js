const jwt = require('jsonwebtoken');
const config = require('../config/env');
const User = require('../models/User');
const { UnauthorizedError, ForbiddenError } = require('../utils/errors');

/**
 * Incoming request ka Bearer JWT token verify karke user object inject karta hai
 */
const authenticate = async (req, res, next) => {
  try {
    let token = null;
    const authHeader = req.headers.authorization;

    // Header se Bearer token extract kar rahe hain
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedError('Authentication required. No token provided.');
    }

    // JWT secret ke sath token verify kar rahe hain
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwtSecret);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedError('Session expired. Please log in again.');
      }
      throw new UnauthorizedError('Invalid authentication token.');
    }

    // Token ke decoded ID se user ko database mein dhoondh rahe hain
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new UnauthorizedError('User account associated with this token no longer exists.');
    }

    // Verified user ko request context mein bind karte hain
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Role-Based Access Control: Check karta hai ki user ka role allowed roles mein shamil hai ya nahi
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required.'));
    }

    const userRole = (req.user.role || '').toLowerCase();
    const isAllowed = roles.some((r) => r.toLowerCase() === userRole);

    if (!isAllowed) {
      return next(
        new ForbiddenError(
          `Access denied. Role '${req.user.role}' is not authorized to access this resource.`
        )
      );
    }

    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};

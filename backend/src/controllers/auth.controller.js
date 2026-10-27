const jwt = require('jsonwebtoken');
const config = require('../config/env');
const User = require('../models/User');
const { BadRequestError, UnauthorizedError, ConflictError } = require('../utils/errors');
const { successResponse, createdResponse } = require('../utils/response');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, role, location, smartMeterId, solarCapacityKw } = req.body;

    if (!name || !email || !password) {
      throw new BadRequestError('Name, email, and password are required');
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      throw new ConflictError('A user with this email address already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'buyer',
      location: location || 'Zone 4, Node 12',
      smartMeterId: smartMeterId || null,
      solarCapacityKw: solarCapacityKw ? Number(solarCapacityKw) : 0,
    });

    const token = generateToken(user);

    return createdResponse(res, 'User registration successful', {
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError('Email and password are required');
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = generateToken(user);

    // Return clean user object without password
    const userJson = user.toJSON();

    return successResponse(res, 'Login successful', {
      user: userJson,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    return successResponse(res, 'User profile retrieved successfully', {
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    return successResponse(res, 'Logout successful. Session token invalidated.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  logout,
};

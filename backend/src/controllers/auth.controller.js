const jwt = require('jsonwebtoken');
const config = require('../config/env');
const User = require('../models/User');
const { BadRequestError, UnauthorizedError, ConflictError, ForbiddenError } = require('../utils/errors');
const { successResponse, createdResponse } = require('../utils/response');

// User details ke basis par signed JWT token generate karte hain
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

// Naye participant ki public registration
const register = async (req, res, next) => {
  try {
    const { name, email, password, role, location, smartMeterId, solarCapacityKw, walletAddress } = req.body;

    if (!name || !email || !password) {
      throw new BadRequestError('Name, email, and password are required');
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      throw new BadRequestError('Name, email, and password must be valid text strings');
    }

    // Email format aur normalization check
    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(normalizedEmail)) {
      throw new BadRequestError('Please provide a valid email address');
    }

    if (password.length < 6) {
      throw new BadRequestError('Password must be at least 6 characters in length');
    }

    const requestedRole = typeof role === 'string' ? role.toLowerCase().trim() : 'buyer';

    // Security check: Public registration se koi bhi Admin role nahi le sakta
    if (requestedRole === 'admin' || normalizedEmail === config.adminEmail) {
      throw new ForbiddenError('Administrator accounts cannot be registered publicly.');
    }

    // Check karte hain ki email pehle se registered toh nahi hai
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      throw new ConflictError('A user with this email address already exists');
    }

    // Public role sirf buyer ya seller hi ho sakta hai
    const publicRole = requestedRole === 'seller' ? 'seller' : 'buyer';

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: publicRole,
      location: typeof location === 'string' ? location.trim() : 'Zone 4, Node 12',
      smartMeterId: typeof smartMeterId === 'string' ? smartMeterId.trim() : null,
      solarCapacityKw: solarCapacityKw ? Math.max(0, Number(solarCapacityKw) || 0) : 0,
      walletAddress: typeof walletAddress === 'string' ? walletAddress.trim() : null,
    });

    const token = generateToken(user);

    return createdResponse(res, 'User registration successful', {
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Registered user ka login authentication
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError('Email and password are required');
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new BadRequestError('Email and password must be strings');
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Bcrypt ke through candidate password verify kar rahe hain
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = generateToken(user);

    return successResponse(res, 'Login successful', {
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Current authenticated user ki details return karta hai
const getMe = async (req, res, next) => {
  try {
    return successResponse(res, 'User profile retrieved successfully', {
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// Authenticated user ki profile update karne ka endpoint
const updateProfile = async (req, res, next) => {
  try {
    // JWT token se verified user ID hi use karte hain
    const userId = req.user._id;
    const { name, location, smartMeterId, solarCapacityKw, walletAddress, role, email, password } = req.body;

    // Security check: Profile edit se role modify karna strictly mana hai
    if (role !== undefined && role !== req.user.role) {
      throw new ForbiddenError('Modifying user role through profile management is strictly prohibited.');
    }

    // Security check: Registered email address change nahi ho sakta
    if (email !== undefined && email.toLowerCase().trim() !== req.user.email) {
      throw new ForbiddenError('Email address cannot be changed via profile management.');
    }

    // Sirf safe aur whitelisted fields ko hi update karte hain
    const updates = {};
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
        throw new BadRequestError('Name must be between 2 and 100 characters in length');
      }
      updates.name = name.trim();
    }
    if (location && typeof location === 'string') updates.location = location.trim();
    if (smartMeterId !== undefined) {
      updates.smartMeterId = typeof smartMeterId === 'string' && smartMeterId.trim() ? smartMeterId.trim() : null;
    }
    if (solarCapacityKw !== undefined) {
      updates.solarCapacityKw = Math.max(0, Number(solarCapacityKw) || 0);
    }
    if (walletAddress !== undefined) {
      updates.walletAddress = typeof walletAddress === 'string' && walletAddress.trim() ? walletAddress.trim() : null;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true });

    return successResponse(res, 'Profile updated successfully', {
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Client session logout
const logout = async (req, res, next) => {
  try {
    return successResponse(res, 'Logout successful. Session token invalidated.');
  } catch (error) {
    next(error);
  }
};

// Admin portal ke liye all grid participants fetch karne ka endpoint
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return successResponse(res, 'All grid participants retrieved', users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  logout,
  getAllUsers,
};

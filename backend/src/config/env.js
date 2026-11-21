const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from backend/.env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const nodeEnv = process.env.NODE_ENV || 'development';
const adminEmail = (process.env.ADMIN_EMAIL || 'anmoldwivedi2002@gmail.com').toLowerCase().trim();
const adminPassword = process.env.ADMIN_PASSWORD || '';

if (nodeEnv === 'production') {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    throw new Error('Fatal Security Requirement: ADMIN_EMAIL and ADMIN_PASSWORD must be defined in production environment variables.');
  }
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.includes('development')) {
    throw new Error('Fatal Security Requirement: A production JWT_SECRET must be defined.');
  }
}

const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/p2p_energy',
  jwtSecret: process.env.JWT_SECRET || 'fallback_development_secret_key_grid_p2p',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  aiServiceUrl: (process.env.AI_SERVICE_URL || 'http://127.0.0.1:8001').replace(/\/+$/, ''),
  frontendUrl: (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/+$/, ''),
  adminEmail,
  adminPassword,
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12,
};

module.exports = config;

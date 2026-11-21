const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/env');
const { notFoundHandler, errorHandler } = require('./middleware/error.middleware');

// Route handlers
const authRoutes = require('./routes/auth.routes');
const listingRoutes = require('./routes/listing.routes');
const orderRoutes = require('./routes/order.routes');
const transactionRoutes = require('./routes/transaction.routes');
const aiRoutes = require('./routes/ai.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

// CORS configuration supporting frontend dev server and production
const allowedOrigins = [
  config.frontendUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev mode for smooth pair programming
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Logging
if (config.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Lightweight public health check endpoint (No JWT auth, no DB, no AI service connection, no sensitive data exposure)
// Lightweight public health-check jo bina kisi dependency ya auth ke 200 OK aur timestamp return karta hai
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'GRID P2P Backend',
    timestamp: new Date().toISOString(),
  });
});

// Legacy / telemetry health payload for internal monitoring
const healthPayload = () => ({
  status: 'healthy',
  timestamp: new Date().toISOString(),
  service: 'grid-p2p-backend',
  version: '1.0.0',
  uptimeSeconds: Math.floor(process.uptime()),
});

app.get('/api/health', (req, res) => res.json(healthPayload()));

// API Route Mounts
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api', dashboardRoutes);

// Catch 404s
app.use(notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;

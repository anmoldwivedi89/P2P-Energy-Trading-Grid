const config = require('../config/env');
const { AppError, NotFoundError } = require('../utils/errors');

// 404 Route Not Found Middleware
const notFoundHandler = (req, res, next) => {
  next(new NotFoundError(`Endpoint not found: ${req.method} ${req.originalUrl}`));
};

// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  // Log error in development/test
  if (config.nodeEnv === 'development') {
    console.error(`[Error] ${req.method} ${req.url} -> ${err.message}`);
    if (err.stack) console.error(err.stack);
  }

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    error.message = `Invalid resource identifier format: ${err.value}`;
    error.statusCode = 400;
  }

  // Handle Mongoose Duplicate Key Error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    error.message = `A record with that ${field} already exists.`;
    error.statusCode = 409;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    error.message = `Validation Error: ${messages.join('. ')}`;
    error.statusCode = 400;
    error.errors = messages;
  }

  // Handle JSON Syntax Error in Body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    error.message = 'Malformed JSON payload received in request body.';
    error.statusCode = 400;
  }

  const responsePayload = {
    success: false,
    message: error.message || 'Internal Server Error',
  };

  if (error.errors) {
    responsePayload.errors = error.errors;
  }

  if (config.nodeEnv === 'development' && err.stack) {
    responsePayload.stack = err.stack;
  }

  return res.status(error.statusCode).json(responsePayload);
};

module.exports = {
  notFoundHandler,
  errorHandler,
};

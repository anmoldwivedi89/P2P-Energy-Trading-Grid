const rateLimit = require('express-rate-limit');

// Login attempts par brute-force attack rokne ke liye rate limiter (15 minute mein max 20 attempts)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Is IP address se bohot zyada login attempts hue hain. Kripya 15 minute baad dobara koshish karein.',
  },
});

// Naye account creation par spamming rokne ke liye rate limiter (1 ghante mein max 15 registrations)
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Account creation rate limit reach ho gayi hai. Kripya kuch samay baad dobara try karein.',
  },
});

module.exports = {
  authLimiter,
  registerLimiter,
};

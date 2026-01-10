/**
 * Express application setup
 * - Security: helmet
 * - CORS: cors
 * - Rate limiting: express-rate-limit
 * - Sanitization: custom middleware
 * - Routes: /users
 * - Error handling
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const usersRouter = require('./routes/users');
const sanitizeMiddleware = require('./middleware/sanitize');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Basic security headers
app.use(helmet());

// Enable CORS for all origins (adjust for production to restrict origins)
app.use(cors());

// JSON body parsing
app.use(express.json());

// Sanitize incoming request bodies (trim strings, escape HTML)
app.use(sanitizeMiddleware);

// Rate limiter - window and max come from env or default
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10), // 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10), // limit each IP
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// Routes
app.use('/users', usersRouter);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Central error handler (must be last)
app.use(errorHandler);

module.exports = app;
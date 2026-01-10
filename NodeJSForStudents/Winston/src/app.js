/**
 * Express app configuration
 *
 * - Sets up AsyncLocalStorage-based request context middleware to manage correlation IDs.
 * - Configures Winston logger and attaches a request-aware logger to `req.log`.
 * - Adds a request logger that writes a structured JSON line on response finish.
 * - Provides simple CRUD routes under /users using an in-memory array.
 * - Centralized error handling with structured error logs.
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const { requestContextMiddleware, getRequestContext } = require('./requestContext');
const logger = require('./logger');
const usersRouter = require('./routes/users');
const errorHandler = require('./errorHandler');

const app = express();

// Attach global logger to app.locals for use in startup/shutdown
app.locals.logger = logger;

// Security, json parsing and CORS
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting - basic example
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 200,
    standardHeaders: true,
    legacyHeaders: false
  })
);

// Request context (sets requestId in AsyncLocalStorage)
// Must be registered before any middleware that relies on request context
app.use(requestContextMiddleware);

// Attach a request-scoped logger to req (child logger containing requestId)
// This is convenient for route handlers: `req.log.info(...)`
app.use((req, res, next) => {
  const ctx = getRequestContext();
  // Create a child with requestId so every call can include it without manual passing.
  req.log = logger.child({ requestId: ctx.requestId });
  next();
});

// Request logging: logs method, url, status, duration, and some headers in structured format
app.use((req, res, next) => {
  const start = process.hrtime.bigint();

  // When response finishes, log structured entry
  res.on('finish', () => {
    const durationNs = process.hrtime.bigint() - start;
    const durationMs = Number(durationNs) / 1e6;

    // Pull requestId from context so logs remain correlated (redundant with child logger)
    const ctx = getRequestContext();
    const base = {
      event: 'request_complete',
      method: req.method,
      route: req.route ? req.route.path : req.path,
      path: req.path,
      status: res.statusCode,
      duration_ms: Math.round(durationMs),
      remoteAddr: req.ip,
      requestId: ctx.requestId
    };

    // Use the request-scoped logger attached to req for structured output
    req.log.info(base, 'request finished');
  });

  next();
});

// Application routes
app.use('/users', usersRouter);

// Health endpoint
app.get('/health', (req, res) => {
  req.log.info({ event: 'health_check' }, 'health ok');
  res.json({ status: 'ok' });
});

// 404 handler
app.use((req, res) => {
  const ctx = getRequestContext();
  const msg = { event: 'not_found', path: req.path, requestId: ctx.requestId };
  // Use app logger for these
  logger.warn(msg, 'resource not found');
  res.status(404).json({ error: 'Not found', requestId: ctx.requestId });
});

// Centralized error handler (must be last)
app.use(errorHandler);

module.exports = app;
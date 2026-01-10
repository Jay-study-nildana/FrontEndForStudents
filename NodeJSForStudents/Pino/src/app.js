/**
 * Express app: integrates pino-http and AsyncLocalStorage-based request context
 *
 * - pino-http attaches req.log which is a request-aware logger
 * - We store requestId and the logger in AsyncLocalStorage for access from any module
 * - Request/response structured logging with duration is added
 * - Simple users routes exercise the logging
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const pino = require('pino');
const pinoHttp = require('pino-http');

const { requestContextMiddleware, getRequestContext, bindLoggerToContext } = require('./requestContext');
const usersRouter = require('../routes/users');
const errorHandler = require('./errorHandler');

const app = express();

// Configure base pino logger
const baseLogger = pino({
  level: process.env.LOG_LEVEL || 'info',
  base: {
    service: process.env.SERVICE_NAME || 'project-pino',
    env: process.env.NODE_ENV || 'development'
  },
  timestamp: pino.stdTimeFunctions.isoTime
});

// expose logger on app.locals
app.locals.logger = baseLogger;

// Standard middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false
  })
);

// Our AsyncLocalStorage middleware must wrap the request lifecycle so that
// other modules can access requestId and logger via getRequestContext().
app.use(requestContextMiddleware);

// pino-http middleware integrates with Express and populates req.log
// genReqId uses existing header if present, otherwise a UUID will be generated
app.use(
  pinoHttp({
    logger: baseLogger,
    genReqId: (req) => {
      // Use propagated header if present, else let UUID be generated
      return req.headers['x-request-id'] || req.headers['x-correlation-id'];
    },
    // When a req.log is created by pino-http we bind it into AsyncLocalStorage context
    customLogLevel: (res, err) => {
      if (res.statusCode >= 500 || err) return 'error';
      if (res.statusCode >= 400) return 'warn';
      return 'info';
    }
  })
);

// After pino-http creates req.log, bind it into our request context so other modules can use it
app.use(bindLoggerToContext);

// Request/response logger: logs method, path, status, duration
app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const duration = Number(process.hrtime.bigint() - start) / 1e6;
    const ctx = getRequestContext();
    const requestId = ctx.requestId || (req.id || null);

    // Use req.log provided by pino-http which is already request-scoped
    req.log.info(
      {
        event: 'request_complete',
        method: req.method,
        path: req.path,
        route: req.route ? req.route.path : undefined,
        status: res.statusCode,
        duration_ms: Math.round(duration),
        requestId
      },
      'request finished'
    );
  });
  next();
});

// Routes
app.use('/users', usersRouter);

// Health
app.get('/health', (req, res) => {
  req.log.info({ event: 'health_check' }, 'health ok');
  res.json({ status: 'ok' });
});

// 404
app.use((req, res) => {
  const ctx = getRequestContext();
  const requestId = ctx.requestId || null;
  app.locals.logger.warn({ event: 'not_found', path: req.path, requestId }, 'not found');
  res.status(404).json({ error: 'Not found', requestId });
});

// Error handler
app.use(errorHandler);

module.exports = app;
/**
 * Centralized error handler
 *
 * - Logs the error as structured JSON with stack (when available)
 * - Sends a consistent JSON error response with requestId for correlation
 */

const { getRequestContext } = require('./requestContext');
const logger = require('./logger');

module.exports = (err, req, res, next) => {
  const ctx = getRequestContext();
  const requestId = (ctx && ctx.requestId) || null;

  // Log error with stack and requestId
  logger.error(
    {
      event: 'unhandled_error',
      message: err.message,
      stack: err.stack,
      requestId,
      route: req.path,
      method: req.method
    },
    'Unhandled error'
  );

  const status = err.status || 500;
  res.status(status).json({
    error: 'Internal Server Error',
    requestId
  });
};
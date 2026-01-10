/**
 * Centralized error handler for pino project
 *
 * - Logs the error via the request-scoped logger if available, otherwise base logger
 * - Sends JSON response with requestId for correlation
 */

const { getRequestContext } = require('./requestContext');

module.exports = (err, req, res, next) => {
  // Prefer request-scoped logger if available
  const ctx = getRequestContext();
  const logger = (ctx && ctx.logger) || req.log || req.app.locals.logger;
  const requestId = ctx && ctx.requestId;

  logger.error({ event: 'unhandled_error', message: err.message, stack: err.stack, requestId, route: req.path }, 'Unhandled error');

  const status = err.status || 500;
  res.status(status).json({ error: 'Internal Server Error', requestId });
};
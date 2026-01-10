/**
 * Request context for pino project using AsyncLocalStorage
 *
 * Responsibilities:
 * - Create or reuse correlation id (X-Request-Id / X-Correlation-Id)
 * - Store a small context object { requestId, startTime, logger } in ALS
 * - Provide helpers to bind req.log (created by pino-http) into the ALS context so
 *   other modules can do getRequestContext().logger.info(...)
 *
 * We use this so both structured logs (via pino) and other modules can access the current request id.
 */

const { AsyncLocalStorage } = require('async_hooks');
const { v4: uuidv4 } = require('uuid');

const als = new AsyncLocalStorage();

/**
 * Middleware to create the ALS context per incoming request.
 * This runs before pino-http so we can seed a requestId and expose it even
 * if pino-http's genReqId didn't run (pino-http runs during its middleware).
 */
function requestContextMiddleware(req, res, next) {
  const incomingId = req.header('x-request-id') || req.header('x-correlation-id');
  const requestId = incomingId || uuidv4();
  const context = { requestId, startTime: Date.now(), logger: null };

  // Send requestId back to client
  res.setHeader('X-Request-Id', requestId);

  als.run(context, () => next());
}

/**
 * When pino-http creates req.log it does not automatically populate our ALS context.
 * Use this middleware after pino-http to attach the created logger into ALS so other
 * modules can access it via getRequestContext().logger.
 */
function bindLoggerToContext(req, res, next) {
  const ctx = als.getStore();
  if (ctx) {
    // pino-http attaches a `req.log` that is a child logger with request bindings
    ctx.logger = req.log;
    // ensure the requestId in ctx matches generated id from pino (if any)
    if (req.id) {
      ctx.requestId = req.id;
    }
  }
  next();
}

function getRequestContext() {
  return als.getStore() || {};
}

module.exports = {
  requestContextMiddleware,
  bindLoggerToContext,
  getRequestContext
};
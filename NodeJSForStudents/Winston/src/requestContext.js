/**
 * Request context using AsyncLocalStorage
 *
 * - Sets or reuses an incoming correlation id (X-Request-Id or X-Correlation-Id).
 * - Stores a small context object { requestId, startTime } in AsyncLocalStorage.
 * - Exposes helper to read current context (getRequestContext).
 *
 * This pattern lets any module access request-scoped metadata without passing it around.
 * Node's AsyncLocalStorage is stable and preferred over older cls-hooked solutions.
 */

const { AsyncLocalStorage } = require('async_hooks');
const { v4: uuidv4 } = require('uuid');

const als = new AsyncLocalStorage();

function requestContextMiddleware(req, res, next) {
  // Try to reuse a client-provided id (propagation). Common headers:
  // X-Request-Id, X-Correlation-Id, or a traceparent (W3C). We look for the first two.
  const incomingId = req.header('x-request-id') || req.header('x-correlation-id');

  const requestId = incomingId || uuidv4();
  const context = { requestId, startTime: Date.now() };

  // Expose requestId to clients for troubleshooting
  res.setHeader('X-Request-Id', requestId);

  // Run the rest of the request handling within this AsyncLocalStorage context
  als.run(context, () => next());
}

function getRequestContext() {
  return als.getStore() || {};
}

module.exports = { requestContextMiddleware, getRequestContext };
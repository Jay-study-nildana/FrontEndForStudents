/**
 * Centralized error handler middleware.
 * Always send JSON errors with status code and message.
 */

module.exports = (err, req, res, next) => {
  // console.error for server-side troubleshooting (do not leak sensitive info)
  console.error(err);

  const status = err.status || 500;
  const payload = {
    error: err.message || 'Internal Server Error'
  };

  // Optionally include validation errors or stack in development
  if (process.env.NODE_ENV === 'development' && err.stack) {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
};
/**
 * Entry point for Pino project
 *
 * Bootstraps the Express app and starts listening.
 */

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  // pino logger is attached on app.locals
  const logger = app.locals.logger;
  logger.info({ event: 'server_start', port: PORT }, 'Server started');
});

// Graceful shutdown
process.on('SIGINT', () => {
  const logger = app.locals.logger;
  logger.info({ event: 'shutdown_signal' }, 'SIGINT received, shutting down');
  server.close(() => {
    logger.info({ event: 'server_close' }, 'Server closed');
    // allow pino to flush buffers (if any) then exit
    setTimeout(() => process.exit(0), 200);
  });
});
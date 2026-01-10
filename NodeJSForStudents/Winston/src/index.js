/**
 * Entry point — loads env and starts the Express app.
 *
 * This file only bootstraps the server. All logging and middleware are
 * initialized inside app.js and logger modules.
 */

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  // Minimal startup log - logger is available on app.locals
  const logger = app.locals.logger;
  logger.info({ event: 'server_start', port: PORT }, 'Server started');
});

// Graceful shutdown: close server and exit
process.on('SIGINT', () => {
  const logger = app.locals.logger;
  logger.info({ event: 'shutdown_signal' }, 'SIGINT received, shutting down');
  server.close(() => {
    logger.info({ event: 'server_close' }, 'Server closed');
    // Allow transports to flush if necessary, then exit
    setTimeout(() => process.exit(0), 200);
  });
});
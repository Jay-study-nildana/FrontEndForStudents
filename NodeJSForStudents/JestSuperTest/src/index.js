/**
 * Starts the HTTP server. In tests we import `app` directly (not this file),
 * so SuperTest can use the Express app without binding to a network port.
 *
 * This file is useful for local development.
 */

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  const logger = require('./logger');
  logger.info({ event: 'server_start', port: PORT }, 'Server started');
});

// Graceful shutdown
process.on('SIGINT', () => {
  const logger = require('./logger');
  logger.info({ event: 'shutdown' }, 'SIGINT received, shutting down');
  server.close(() => {
    logger.info({ event: 'server_closed' }, 'Server closed');
    process.exit(0);
  });
});
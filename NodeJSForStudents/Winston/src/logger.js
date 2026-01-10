/**
 * Winston logger setup (structured JSON)
 *
 * - Outputs JSON lines to console (suitable for ingestion into ELK / log aggregator).
 * - Includes timestamp and service name.
 * - Adds requestId from AsyncLocalStorage automatically via a custom format.
 *
 * Notes:
 * - We also create child loggers per-request in app.js for convenience.
 * - Winston supports many transports (file, http, etc.). For demo we use Console.
 */

const { createLogger, format, transports } = require('winston');
const { getRequestContext } = require('./requestContext');

const serviceName = process.env.SERVICE_NAME || 'project-winston';

// Custom format that injects requestId (if present) and service metadata into every log record
const requestIdFormat = format((info) => {
  const ctx = getRequestContext();
  if (ctx && ctx.requestId) {
    info.requestId = ctx.requestId;
  }
  info.service = serviceName;
  info.env = process.env.NODE_ENV || 'development';
  return info;
});

// Compose logger: timestamp + requestId injection + JSON output
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(), // adds info.timestamp
    requestIdFormat(),
    format.errors({ stack: true }), // include stack trace when logging errors
    format.json() // output as JSON
  ),
  transports: [
    // Console transport prints structured JSON to stdout
    new transports.Console()
  ],
  exitOnError: false
});

module.exports = logger;
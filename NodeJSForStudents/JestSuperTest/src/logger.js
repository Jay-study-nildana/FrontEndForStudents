/**
 * Small logger wrapper used by the app.
 * Tests can mock or spy on this module easily.
 *
 * In production you can replace this with pino/winston configuration.
 */

const LEVEL = process.env.LOG_LEVEL || 'info';

function info(obj, msg) {
  // Keep logs structured as JSON objects for easy parsing in CI/test environment
  console.log(JSON.stringify({ level: 'info', ...obj, message: msg }));
}

function warn(obj, msg) {
  console.warn(JSON.stringify({ level: 'warn', ...obj, message: msg }));
}

function error(obj, msg) {
  console.error(JSON.stringify({ level: 'error', ...obj, message: msg }));
}

module.exports = { info, warn, error, level: LEVEL };
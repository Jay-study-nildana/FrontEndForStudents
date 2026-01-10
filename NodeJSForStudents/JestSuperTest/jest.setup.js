// Jest setup file - runs before tests
// Silence or mock global logging to keep test output tidy.

const logger = require('./src/logger');

// Mock logger methods to avoid noisy logs in test output
if (logger && typeof logger.info === 'function') {
  jest.spyOn(logger, 'info').mockImplementation(() => {});
  jest.spyOn(logger, 'warn').mockImplementation(() => {});
  jest.spyOn(logger, 'error').mockImplementation(() => {});
}

// Set a longer timeout for slow CI environments (optional)
jest.setTimeout(10000);
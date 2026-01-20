/**
 * Helper to create an ioredis connection from REDIS_URL.
 * Exports:
 *   - createRedis(urlOverride?) -> Redis client (ioredis instance)
 *
 * Uses dotenv (called by scripts) if .env present.
 */

const IORedis = require('ioredis');

function createRedis(url) {
  const redisUrl = url || process.env.REDIS_URL || 'redis://127.0.0.1:6379';
  // ioredis accepts a connection string directly, including rediss://
  const client = new IORedis(redisUrl, {
    // optional generic timeouts / retry strategies could be configured here
    maxRetriesPerRequest: null,
  });

  // attach basic error logging
  client.on('error', err => {
    // keep minimal logging so test outputs are readable
    console.error('[ioredis] error', err.message || err);
  });

  return client;
}

module.exports = { createRedis };
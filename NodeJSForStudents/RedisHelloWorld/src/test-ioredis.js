/**
 * Basic Redis smoke tests:
 *  - PING
 *  - SET / GET
 *  - INFO (first lines)
 *  - PUB/SUB (subscribe -> publish -> receive)
 *
 * Usage:
 *   REDIS_URL=... node src/test-ioredis.js
 */

require('dotenv').config();
const { createRedis } = require('./redisClient');

async function run() {
  const redis = createRedis();

  try {
    console.log('PING ->', await redis.ping()); // expect PONG

    // SET with TTL 60s and GET
    await redis.set('smoke:key', 'hello-from-test', 'EX', 60);
    const value = await redis.get('smoke:key');
    console.log('SET/GET ->', value);

    // INFO (show first few lines to avoid huge output)
    const info = await redis.info();
    console.log('INFO (first lines):');
    console.log(info.split('\n').slice(0, 12).join('\n'));

    // PUB/SUB smoke
    const sub = createRedis();
    await sub.subscribe('smoke-channel');

    // wait for a single message or timeout
    const messagePromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        sub.disconnect();
        resolve(null);
      }, 3000);

      sub.on('message', (channel, message) => {
        clearTimeout(timeout);
        resolve({ channel, message });
      });
    });

    // Publish after a short delay so subscribe is active
    setTimeout(async () => {
      await redis.publish('smoke-channel', 'hi-students');
    }, 200);

    const msg = await messagePromise;
    if (msg) {
      console.log(`PUB/SUB received on ${msg.channel}: ${msg.message}`);
    } else {
      console.warn('PUB/SUB: no message received (timeout)');
    }

    // Cleanup
    try { sub.disconnect(); } catch (e) {}
    redis.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Redis smoke test failed:', err);
    try { redis.disconnect(); } catch (e) {}
    process.exit(1);
  }
}

run();
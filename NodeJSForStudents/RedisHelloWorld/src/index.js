#!/usr/bin/env node
require('dotenv').config();

console.log('');
console.log('Redis + BullMQ Smoke Project');
console.log('');
console.log('Available scripts:');
console.log('  npm run test:ioredis   -> basic Redis (PING, SET/GET, INFO, PUB/SUB)');
console.log('  npm run test:bullmq   -> BullMQ enqueue + worker + events (smoke)');
console.log('  npm run test:all      -> run both tests in sequence');
console.log('');
console.log('Make sure REDIS_URL is set in your environment or .env file.');
console.log('');
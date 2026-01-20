/**
 * Run the ioredis test and the bullmq test in sequence.
 *
 * Usage:
 *   REDIS_URL=... node src/test-all.js
 */

require('dotenv').config();

const { spawn } = require('child_process');
const path = require('path');

function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath], {
      stdio: 'inherit',
      env: process.env,
    });

    child.on('exit', code => {
      if (code === 0) resolve();
      else reject(new Error(`Script ${scriptPath} exited with code ${code}`));
    });

    child.on('error', err => reject(err));
  });
}

(async () => {
  try {
    console.log('Running test-ioredis.js');
    await runScript(path.join(__dirname, 'test-ioredis.js'));

    console.log('\nRunning bullmq-smoke.js');
    await runScript(path.join(__dirname, 'bullmq-smoke.js'));

    console.log('\nAll tests finished successfully');
    process.exit(0);
  } catch (err) {
    console.error('test-all failed:', err);
    process.exit(1);
  }
})();
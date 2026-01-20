import { Worker, QueueEvents } from 'bullmq';
import { createRedisConnection } from '../bullmq/connection';
import { processJob } from './processor';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

async function runWorker() {
  const connection = createRedisConnection();

  // NOTE: QueueScheduler removed per your request (BullMQ v5 removes/deprecates it).
  // This worker will not handle delayed/stalled job promotion/recovery.
  const worker = new Worker(
    'myQueue',
    async (job) => processJob(job),
    {
      connection,
      concurrency: 5,
    },
  );

  const queueEvents = new QueueEvents('myQueue', { connection });

  queueEvents.on('completed', ({ jobId, returnvalue }) => {
    console.log(`Job ${jobId} completed, return:`, returnvalue);
  });

  queueEvents.on('failed', ({ jobId, failedReason }) => {
    console.error(`Job ${jobId} failed:`, failedReason);
  });

  queueEvents.on('waiting', ({ jobId }) => {
    console.log('Job waiting', jobId);
  });

  worker.on('failed', (job, err) => {
    console.error('Worker-level failed event:', job?.id, err);
  });

  worker.on('error', (err) => {
    console.error('Worker error:', err);
  });

  // Graceful shutdown
  const shutdown = async () => {
    console.log('Shutting down worker...');
    try {
      // stop accepting new jobs and wait for current jobs to finish
      await worker.close();
      await queueEvents.close();
      // createRedisConnection() returns ConnectionOptions (not a Redis client),
      // so do not call connection.quit() here.
      console.log('Worker shut down complete');
      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown:', err);
      process.exit(1);
    }
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  console.log('Worker running for queue "myQueue" (QueueScheduler removed)');
}

runWorker().catch((err) => {
  console.error('Worker failed to start', err);
  process.exit(1);
});
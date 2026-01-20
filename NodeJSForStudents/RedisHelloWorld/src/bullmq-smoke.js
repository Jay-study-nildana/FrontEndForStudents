/**
 * BullMQ smoke test:
 *  - starts QueueScheduler (for delayed/stalled jobs)
 *  - creates a Queue
 *  - starts QueueEvents to observe events
 *  - starts a Worker to process jobs
 *  - enqueues a job (delayed 1s) with attempts/backoff and logs lifecycle
 *
 * Usage:
 *   REDIS_URL=... node src/bullmq-smoke.js
 */

require("dotenv").config();

// const { Queue, QueueScheduler, Worker, QueueEvents } = require('bullmq');

const _bullmq = require("bullmq");
const { Queue, JobScheduler, Worker, QueueEvents } = _bullmq.default || _bullmq;

const connectionUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const connection = { url: connectionUrl };
const queueName = "smoke-queue";

// helper: add a timeout to an async operation so the script won't hang forever
function waitWithTimeout(promise, ms, name) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => {
      reject(new Error(`${name} wait timed out after ${ms}ms`));
    }, ms);
    promise
      .then((r) => {
        clearTimeout(t);
        resolve(r);
      })
      .catch((err) => {
        clearTimeout(t);
        reject(err);
      });
  });
}

async function run() {
  console.log(
    "Using Redis URL:",
    connectionUrl.replace(/:\/\/([^@]+)@/, "://***:***@")
  ); // mask credentials

  // Start JobScheduler (required for delayed job promotion)
  console.log("Starting JobScheduler...");
  const scheduler = new JobScheduler(queueName, { connection });
  await waitWithTimeout(scheduler.waitUntilReady(), 8000, "JobScheduler");
  console.log("JobScheduler ready");

  const queue = new Queue(queueName, { connection });

  const events = new QueueEvents(queueName, { connection });
  console.log("Opening QueueEvents...");
  await waitWithTimeout(events.waitUntilReady(), 8000, "QueueEvents");
  console.log("QueueEvents ready");

  events.on("waiting", ({ jobId }) => console.log("[event] waiting", jobId));
  events.on("active", ({ jobId }) => console.log("[event] active", jobId));
  events.on("completed", ({ jobId, returnvalue }) =>
    console.log("[event] completed", jobId, returnvalue)
  );
  events.on("failed", ({ jobId, failedReason }) =>
    console.log("[event] failed", jobId, failedReason)
  );
  events.on("error", (err) => console.error("[QueueEvents] error", err));

  const worker = new Worker(
    queueName,
    async (job) => {
      console.log(
        `Worker processing job ${job.id} (${job.name}) data=`,
        job.data
      );
      // simulate work
      await new Promise((r) => setTimeout(r, 400));
      // purposely returning some metadata
      return { ok: true, processedAt: new Date().toISOString() };
    },
    { connection, concurrency: 1 }
  );

  worker.on("error", (err) => console.error("[Worker] error", err));

  // Add a sample job (delayed 1s)
  const job = await queue.add(
    "test-job",
    { foo: "bar" },
    {
      delay: 1000,
      attempts: 2,
      backoff: { type: "fixed", delay: 500 },
      removeOnComplete: true,
      removeOnFail: false,
    }
  );

  console.log("Enqueued job id=", job.id);

  // Wait for completion/failure for this job and then cleanup
  const done = new Promise((resolve) => {
    events.on("completed", async ({ jobId, returnvalue }) => {
      if (String(jobId) === String(job.id)) {
        console.log("Job completed (returned):", returnvalue);
        resolve();
      }
    });

    events.on("failed", async ({ jobId, failedReason }) => {
      if (String(jobId) === String(job.id)) {
        console.log("Job failed:", failedReason);
        resolve();
      }
    });

    // safety timeout
    setTimeout(() => {
      console.warn("Timeout waiting for job events — continuing cleanup");
      resolve();
    }, 15000);
  });

  await done;

  // cleanup
  await worker.close();
  await events.close();
  await queue.close();
  await scheduler.close();

  console.log("BullMQ smoke test finished");
  process.exit(0);
}

run().catch((err) => {
  console.error("BullMQ smoke test error", err);
  process.exit(1);
});

// Example processor function
//Old Processor.
// export async function processJob(job: any) {
//   // job is a bullmq Job instance; job.data contains the payload
//   console.log(`Worker processing job ${job.id} name=${job.name} data=`, job.data);

//   // Example: simulate processing
//   if (job.name === 'failSometimes') {
//     if (Math.random() > 0.7) {
//       throw new Error('Random failure for demonstration');
//     }
//   }

//   // return whatever you want to persist as the job result
//   return { processedAt: Date.now() };
// }

// Updated Processor with better typing and error handling

import { Job } from 'bullmq';

// Simulate a delay (ms)
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Individual handler functions for each job type
async function handleEmailJob(data: any) {
  // Simulate sending an email
  return `Email sent to ${data.to}`;
}

async function handleResizeImageJob(data: any) {
  // Simulate image processing
  return `Image ${data.filename} resized to ${data.size}`;
}

async function handleDataImportJob(data: any) {
  // Simulate data import
  return `Imported ${data.records} records`;
}

async function handleGenericJob(data: any) {
  return `Processed job with data: ${JSON.stringify(data)}`;
}

export async function processJob(job: Job) {
  try {
    // Log job start
    console.log(`Processing job ${job.id} of type ${job.name}`);

    // Simulate progress
    for (let i = 1; i <= 5; i++) {
      // Simulate work with random duration between 2000ms and 20000ms
      const randomMs = Math.floor(Math.random() * (20000 - 2000 + 1)) + 2000;
      await sleep(randomMs);
      await job.updateProgress(i * 20); // Update progress: 20%, 40%, ...
      console.log(`Job ${job.id} progress: ${i * 20}% (slept ${randomMs}ms)`);
    }

    // Use switch-case to dispatch to handler functions
    let result;
    switch (job.name) {
      case 'email':
        result = await handleEmailJob(job.data);
        break;
      case 'resize-image':
        result = await handleResizeImageJob(job.data);
        break;
      case 'data-import':
        result = await handleDataImportJob(job.data);
        break;
      default:
        result = await handleGenericJob(job.data);
    }

    // Randomly simulate a failure (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('Random processing error!');
    }

    // Log job completion
    console.log(`Job ${job.id} completed: ${result}`);
    return { result };
  } catch (error) {
    // Log error and rethrow for BullMQ to handle retries
    console.error(`Job ${job.id} failed:`, error);
    throw error;
  }
}

// Example processor function
export async function processJob(job: any) {
  // job is a bullmq Job instance; job.data contains the payload
  console.log(`Worker processing job ${job.id} name=${job.name} data=`, job.data);

  // Example: simulate processing
  if (job.name === 'failSometimes') {
    if (Math.random() > 0.7) {
      throw new Error('Random failure for demonstration');
    }
  }

  // return whatever you want to persist as the job result
  return { processedAt: Date.now() };
}
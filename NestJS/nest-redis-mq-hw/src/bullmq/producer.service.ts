import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bullmq';
import { createRedisConnection } from './connection';
import { JobState } from 'bullmq';

@Injectable()
export class ProducerService implements OnModuleDestroy {
  private readonly connection = createRedisConnection();
  private readonly myQueue = new Queue('myQueue', {
    connection: this.connection,
  });

  async addJob(name: string, payload: any, opts?: Parameters<Queue['add']>[2]) {
    return this.myQueue.add(name, payload, opts);
  }

  /**
   * Fetch job metadata/state/result by id.
   * Returns null if job is not found.
   */
  async getJob(jobId: string) {
    const job = await this.myQueue.getJob(jobId);
    if (!job) return null;

    const state = await job.getState();
    const result = await job.returnvalue; // return value after completion
    return {
      id: job.id,
      name: job.name,
      data: job.data,
      state,
      result,
      attemptsMade: job.attemptsMade,
      failedReason: job.failedReason,
      timestamp: job.timestamp,
      finishedOn: job.finishedOn,
      processedOn: job.processedOn,
    };
  }

  async addBulk(
    jobs: Array<{
      name: string;
      data: any;
      opts?: Parameters<Queue['add']>[2];
    }>,
  ) {
    const bulk = jobs.map((j) => ({
      name: j.name,
      data: j.data,
      opts: j.opts,
    }));
    return this.myQueue.addBulk(bulk);
  }

  async getAllJobs() {
    const queue = this.myQueue;
    const states: JobState[] = [
      'completed',
      'failed',
      'waiting',
      'active',
      'delayed',
    ];
    const jobs = await queue.getJobs(states, 0, 100); // adjust range as needed
    return Promise.all(
      jobs.map(async (job) => ({
        id: job.id,
        name: job.name,
        status: await job.getState(),
        data: job.data,
        result: job.returnvalue,
        failedReason: job.failedReason,
        progress: job.progress,
        timestamp: job.timestamp,
        finishedOn: job.finishedOn,
        processedOn: job.processedOn,
      })),
    );
  }

    async getJobsByState(state: JobState | JobState[]) {
    const states = Array.isArray(state) ? state : [state];
    const jobs = await this.myQueue.getJobs(states, 0, 100);
    return Promise.all(
      jobs.map(async (job) => ({
        id: job.id,
        name: job.name,
        status: await job.getState(),
        data: job.data,
        result: job.returnvalue,
        failedReason: job.failedReason,
        progress: job.progress,
        timestamp: job.timestamp,
        finishedOn: job.finishedOn,
        processedOn: job.processedOn,
      })),
    );
  }

  async onModuleDestroy() {
    await this.myQueue.close();
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ProducerService } from './bullmq/producer.service';
import { Param } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { BadRequestException } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly producer: ProducerService,
  ) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('jobs-create-with-type')
  async createJob(
    @Body('name') name: string,
    @Body('type') type: string,
    @Body('payload') payload: any,
  ) {
    const allowedTypes = ['email', 'resize-image', 'data-import'];
    if (!allowedTypes.includes(type)) {
      throw new BadRequestException('Invalid job type');
    }
    // You can use 'type' for validation, and 'name' as the job name
    const job = await this.producer.addJob(name || type, payload ?? {});
    return { id: job.id, name: job.name, type };
  }

  @Post('jobs')
  async addJob(@Body('name') name: string, @Body('payload') payload: any) {
    const job = await this.producer.addJob(name || 'default', payload ?? {});
    return { id: job.id };
  }

  @Post('jobs/bulk')
  async addBulk(@Body() body: { jobs: Array<{ name: string; payload: any }> }) {
    const res = await this.producer.addBulk(
      body.jobs.map((j) => ({ name: j.name, data: j.payload })),
    );
    return { added: res.length ?? res };
  }

  @Get('jobs/:id')
  async getJob(@Param('id') id: string) {
    const job = await this.producer.getJob(id);
    if (!job) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }
    return job;
  }

  @Get('jobs')
  async getAllJobs() {
    // You may want to add pagination for large queues
    const jobs = await this.producer.getAllJobs();
    return jobs;
  }

  @Get('jobs-completed')
  async getCompletedJobs() {
    const jobs = await this.producer.getJobsByState('completed');
    return jobs;
  }

  @Get('jobs-inprogress')
  async getInProgressJobs() {
    const jobs = await this.producer.getJobsByState(['active', 'waiting']);
    return jobs;
  }

  @Get('jobs-failed')
  async getFailedJobs() {
    const jobs = await this.producer.getJobsByState('failed');
    return jobs;
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ProducerService } from './bullmq/producer.service';
import { Param } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly producer: ProducerService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('jobs')
  async addJob(
    @Body('name') name: string,
    @Body('payload') payload: any,
  ) {
    const job = await this.producer.addJob(name || 'default', payload ?? {});
    return { id: job.id };
  }  

  @Post('jobs/bulk')
  async addBulk(@Body() body: { jobs: Array<{ name: string; payload: any }> }) {
    const res = await this.producer.addBulk(body.jobs.map(j => ({ name: j.name, data: j.payload })));
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
}

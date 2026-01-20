import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerService } from './bullmq/producer.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ProducerService],
  exports: [ProducerService],
})
export class AppModule {}

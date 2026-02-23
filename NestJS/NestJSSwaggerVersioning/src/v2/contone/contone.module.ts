import { Module } from '@nestjs/common';
import { ContoneController } from './contone.controller';
import { ContoneService } from './contone.service';
import { InMemoryContoneRepository } from './contone.repository';

@Module({
  controllers: [ContoneController],
  providers: [ContoneService, InMemoryContoneRepository],
})
export class ContoneModule {}
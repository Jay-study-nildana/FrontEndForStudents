import { Module } from '@nestjs/common';
import { ContoneService } from './contone.service';
import { ContoneController } from './contone.controller';
import { InMemoryContoneRepository } from './contone.repository';

@Module({
  controllers: [ContoneController],
  providers: [ContoneService, InMemoryContoneRepository],
  exports: [InMemoryContoneRepository]
})
export class ContoneModule {}

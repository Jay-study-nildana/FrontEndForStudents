import { Module } from '@nestjs/common';
import { ContoneService } from './contone.service';
import { ContoneController } from './contone.controller';
import { InMemoryContoneRepository } from './contone.repository';
import { ContoneV2Controller } from './contonev2.controller';

@Module({
  controllers: [ContoneController, ContoneV2Controller],
  providers: [ContoneService, InMemoryContoneRepository],
  exports: [InMemoryContoneRepository]
})
export class ContoneModule {}

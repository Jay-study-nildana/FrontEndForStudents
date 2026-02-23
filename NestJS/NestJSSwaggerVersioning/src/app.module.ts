import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContoneModule as ContoneV1Module } from './v1/contone/contone.module';
import { ContoneModule as ContoneV2Module } from './v2/contone/contone.module';

@Module({
  imports: [ContoneV1Module, ContoneV2Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContoneModule } from './contone/contone.module';

@Module({
  imports: [ContoneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

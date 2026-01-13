import { Module } from '@nestjs/common';
import { PostsController } from './conttwo.controller';
import { PostsService } from './conttwo.service';
import { PrismaModule } from '../prisma.module';
import { PrismaPostRepository } from './conttwo.repository';

@Module({
  imports: [PrismaModule], // <<-- ensure PrismaService is available here
  controllers: [PostsController],
  providers: [PostsService, PrismaPostRepository],
  exports: [], // export PrismaPostRepository if other modules should reuse it
})
export class ConttwoModule {}

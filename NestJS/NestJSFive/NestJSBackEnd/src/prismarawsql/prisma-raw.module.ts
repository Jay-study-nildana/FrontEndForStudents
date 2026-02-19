import { Module } from '@nestjs/common';
import { PrismaRawService } from './prisma-raw.service';
import { PrismaRawController } from './prisma-raw.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PrismaRawService],
  controllers: [PrismaRawController],
})
export class PrismaRawModule {}

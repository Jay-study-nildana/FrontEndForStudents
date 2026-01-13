import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // optional: makes PrismaService available app-wide without importing PrismaModule everywhere
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

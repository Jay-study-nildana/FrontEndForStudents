import { Module } from '@nestjs/common';
import { FilesService } from './filesforuser.service';
import { FilesController } from './filesforuser.controller';
import { PrismaFileRepository } from './repositories/prisma-fileupload.repository';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FilesController],
  providers: [FilesService, PrismaFileRepository],
  exports: [PrismaFileRepository, FilesService],
})
export class FilesforuserModule {}

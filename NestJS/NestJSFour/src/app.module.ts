import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContoneModule } from './contone/contone.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { ConttwoModule } from './conttwo/conttwo.module';
import { AuthModule } from './auth/auth.module';
import { AdminpanelModule } from './adminpanel/adminpanel.module';
import { FilesforuserModule } from './filesforuser/filesforuser.module';

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }), 
    ContoneModule, 
    ConttwoModule,
    AuthModule,
    AdminpanelModule,
    FilesforuserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

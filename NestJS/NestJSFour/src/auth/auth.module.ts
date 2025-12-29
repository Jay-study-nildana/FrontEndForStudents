import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { PrismaAuthRepository } from './repositories/prisma-auth.repository';
import { RolesGuard } from './roles.guard';
import { PrismaModule } from 'src/prisma.module';

@Module({

  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): JwtModuleOptions => {
        const secret = cfg.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET environment variable is not set');
        }
        const expiresIn = cfg.get<string>('JWT_EXPIRES_IN') || '15m';
        return {
          secret,
          // cast expiresIn to bypass mismatch between jwt lib types and ConfigService<string>
          signOptions: { expiresIn: expiresIn as any },
        };
      },
    }),
  ],    

  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PrismaAuthRepository,
    RolesGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
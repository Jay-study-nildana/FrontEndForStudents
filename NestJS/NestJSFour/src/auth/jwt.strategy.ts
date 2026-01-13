import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private cfg: ConfigService) {
    const secret = cfg.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  //   constructor(private cfg: ConfigService) {
  //     super({
  //       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //       ignoreExpiration: false,
  //       secretOrKey: cfg.get<string>('JWT_SECRET'),
  //     });
  //   }

  async validate(payload: any) {
    // payload contains: { sub: userId, email, roles }
    return {
      id: payload.sub,
      email: payload.email,
      roles: payload.roles ?? [],
    };
  }
}

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // use 'email' as the usernameField
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUserForPassport(
      email,
      password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user; // attached to req.user
  }
}

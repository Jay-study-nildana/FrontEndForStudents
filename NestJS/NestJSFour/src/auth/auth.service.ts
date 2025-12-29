import { Injectable, UnauthorizedException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaAuthRepository } from './repositories/prisma-auth.repository';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { TokensDto } from './dto/TokensDto';
import { UserResponseDto } from './repositories/auth.repository.interface';

@Injectable()
export class AuthService {
  private jwtExpiresIn: string;
  private jwtSecret: string;
  private refreshTokenDays: number;
  private bcryptRounds: number;

  constructor(
    private readonly repo: PrismaAuthRepository,
    private readonly jwtService: JwtService,
    private readonly cfg: ConfigService,
  ) {
    this.jwtSecret = this.cfg.get<string>('JWT_SECRET') || (() => { throw new Error('JWT_SECRET is not set'); })();
    //8 hours X 60 minutes = 480 minutes
    //to help with testing, set default to 8 hours instead of 15 minutes
    // change back to 15m in production or whatever you prefer
    this.jwtExpiresIn = this.cfg.get<string>('JWT_EXPIRES_IN') || '480m';
    this.refreshTokenDays = Number(this.cfg.get<number>('REFRESH_TOKEN_EXPIRES_DAYS') ?? 7);
    this.bcryptRounds = Number(this.cfg.get<number>('BCRYPT_SALT_ROUNDS') ?? 12);

    //I want to display all the env values that are being used here

    console.log('AuthService initialized with:');
    console.log(`JWT_SECRET: ${this.jwtSecret}`);
    console.log(`JWT_EXPIRES_IN: ${this.jwtExpiresIn}`);
    console.log(`REFRESH_TOKEN_EXPIRES_DAYS: ${this.refreshTokenDays}`);
    console.log(`BCRYPT_SALT_ROUNDS: ${this.bcryptRounds}`);
  }

  async register(input: RegisterUserDto): Promise<UserResponseDto> {
    // Basic validation
    if (!input.email || !input.password) {
      throw new BadRequestException('email and password are required');
    }

    const hashed = await bcrypt.hash(input.password, this.bcryptRounds);
    const roleName = input.role ?? 'user';
    // ensure role exists first
    await this.repo.ensureRoleExists(roleName);
    const user = await this.repo.createUser({ ...input, password: hashed }, roleName);
    return user;
  }

  // returns the full Prisma user object (including password) for validation
  async validateUserForPassport(email: string, pass: string) {
    const userRow = await this.repo.findUserByEmail(email);
    if (!userRow) return null;
    const ok = await bcrypt.compare(pass, userRow.password);
    if (!ok) return null;

    // Map to safe user object (used by LocalStrategy -> attached to req.user)
    const safe = {
      id: userRow.id,
      email: userRow.email,
      name: userRow.name,
      roles: (userRow.userRoles ?? []).map((ur: any) => ur.role.name),
    };
    return safe;
  }

  async login(user: { id: string; email: string; roles?: string[] }): Promise<TokensDto> {
    const payload = { sub: user.id, email: user.email, roles: user.roles ?? [] };
    // const accessToken = this.jwtService.sign(payload, { expiresIn: this.jwtExpiresIn });
    const accessToken = this.jwtService.sign(payload, { expiresIn: this.jwtExpiresIn as any });

    // generate refresh token (random), hash it, store
    const refreshTokenPlain = crypto.randomBytes(64).toString('hex');
    const refreshTokenHash = crypto.createHash('sha256').update(refreshTokenPlain).digest('hex');
    const expiresAt = new Date(Date.now() + this.refreshTokenDays * 24 * 60 * 60 * 1000);
    await this.repo.saveRefreshToken(user.id, refreshTokenHash, expiresAt);

    return { access_token: accessToken, refresh_token: refreshTokenPlain };
  }

  async refresh(refreshTokenPlain: string): Promise<TokensDto> {
    const hash = crypto.createHash('sha256').update(refreshTokenPlain).digest('hex');
    const tokenRow = await this.repo.findRefreshTokenByHash(hash);
    if (!tokenRow) throw new UnauthorizedException('Invalid refresh token');

    if (tokenRow.revoked) {
      // token reuse detected — revoke all tokens for this user
      await this.repo.revokeAllRefreshTokensForUser(tokenRow.userId);
      throw new ForbiddenException('Refresh token revoked');
    }

    if (new Date(tokenRow.expiresAt) < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    // rotate: create a new refresh token and mark the old one replaced
    const newRefreshPlain = crypto.randomBytes(64).toString('hex');
    const newHash = crypto.createHash('sha256').update(newRefreshPlain).digest('hex');
    const expiresAt = new Date(Date.now() + this.refreshTokenDays * 24 * 60 * 60 * 1000);
    const newId = await this.repo.saveRefreshToken(tokenRow.userId, newHash, expiresAt);

    // mark old token as revoked and link replacedBy
    await this.repo.revokeRefreshTokenById(tokenRow.id);
    await this.repo.findRefreshTokenById(tokenRow.id).then(async (r) => {
      // set replacedById (if you need, use prisma directly)
      // we will update replacedById using prisma client exposed via repo by calling prisma directly is fine here:
      try {
        await (this.repo as any).prisma.passPortAuthRefreshToken.update({
          where: { id: tokenRow.id },
          data: { replacedById: newId },
        });
      } catch {
        // ignore if not available; replacedById is optional
      }
    });

    // build new access token (include roles from user join rows)
    const user = tokenRow.user;
    const roles = (user.userRoles ?? []).map((ur: any) => ur.role.name);
    const payload = { sub: user.id, email: user.email, roles };
    // const accessToken = this.jwtService.sign(payload, { expiresIn: this.jwtExpiresIn });
    const accessToken = this.jwtService.sign(payload, { expiresIn: this.jwtExpiresIn as any });

    return { access_token: accessToken, refresh_token: newRefreshPlain };
  }

  async logout(refreshTokenPlain: string | undefined, userId?: string) {
    if (refreshTokenPlain) {
      const hash = crypto.createHash('sha256').update(refreshTokenPlain).digest('hex');
      const tokenRow = await this.repo.findRefreshTokenByHash(hash);
      if (!tokenRow) throw new UnauthorizedException('Invalid refresh token');
      await this.repo.revokeRefreshTokenById(tokenRow.id);
      return;
    }

    if (userId) {
      await this.repo.revokeAllRefreshTokensForUser(userId);
      return;
    }

    throw new BadRequestException('refreshToken or userId required to logout');
  }

  // optional helper to get user DTO by id
  async getUserById(id: string): Promise<UserResponseDto | null> {
    return this.repo.findUserById(id);
  }
}
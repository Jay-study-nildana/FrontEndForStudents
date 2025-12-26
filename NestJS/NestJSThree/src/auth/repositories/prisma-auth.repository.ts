import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  RegisterUserDto,
  UserResponseDto,
  AuthRepository,
} from './auth.repository.interface';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(input: RegisterUserDto, roleName?: string): Promise<UserResponseDto> {
    const created = await this.prisma.passPortAuthUser.create({
      data: {
        email: input.email,
        password: input.password,
        name: input.name ?? null,
      },
    });

    if (roleName) {
      await this.ensureRoleExists(roleName);
      const role = await this.prisma.passPortAuthRole.findUnique({ where: { name: roleName } });
      if (role) {
        await this.prisma.passPortAuthUserRole.create({
          data: {
            userId: created.id,
            roleId: role.id,
          },
        });
      }
    }

    const reloaded = await this.prisma.passPortAuthUser.findUnique({
      where: { id: created.id },
      include: {
        userRoles: { include: { role: true } },
      },
    });

    return this.mapUserToDto(reloaded);
  }

  async findUserByEmail(email: string) {
    return this.prisma.passPortAuthUser.findUnique({
      where: { email },
      include: {
        userRoles: { include: { role: true } },
        refreshTokens: true,
      },
    });
  }

  async findUserById(id: string): Promise<UserResponseDto | null> {
    const row = await this.prisma.passPortAuthUser.findUnique({
      where: { id },
      include: {
        userRoles: { include: { role: true } },
      },
    });
    return row ? this.mapUserToDto(row) : null;
  }

  async ensureRoleExists(name: string, description?: string): Promise<void> {
    await this.prisma.passPortAuthRole.upsert({
      where: { name },
      update: { description: description ?? undefined },
      create: { name, description: description ?? null },
    });
  }

//   async listRoles() {
//     return this.prisma.passPortAuthRole.findMany();
//   }

  async listRoles(): Promise<{ id: string; name: string; description?: string }[]> {
    const rows = await this.prisma.passPortAuthRole.findMany();
    return rows.map(r => ({
      id: r.id,
      name: r.name,
      description: r.description ?? undefined,
    }));
  }  

  async saveRefreshToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
    meta?: { ip?: string; userAgent?: string },
  ) {
    const created = await this.prisma.passPortAuthRefreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
        ip: meta?.ip ?? null,
        userAgent: meta?.userAgent ?? null,
      },
    });
    return created.id;
  }

  async findRefreshTokenByHash(tokenHash: string) {
    return this.prisma.passPortAuthRefreshToken.findFirst({
      where: { tokenHash },
      include: {
        user: {
          include: { userRoles: { include: { role: true } } },
        },
      },
    });
  }

  async findRefreshTokenById(id: string) {
    return this.prisma.passPortAuthRefreshToken.findUnique({
      where: { id },
      include: {
        user: {
          include: { userRoles: { include: { role: true } } },
        },
      },
    });
  }

  async revokeRefreshTokenById(id: string) {
    await this.prisma.passPortAuthRefreshToken.update({
      where: { id },
      data: { revoked: true },
    });
  }

  async revokeAllRefreshTokensForUser(userId: string) {
    await this.prisma.passPortAuthRefreshToken.updateMany({
      where: { userId, revoked: false },
      data: { revoked: true },
    });
  }

  async assignRoleToUser(userId: string, roleName: string) {
    await this.ensureRoleExists(roleName);
    const role = await this.prisma.passPortAuthRole.findUnique({ where: { name: roleName } });
    if (!role) return;
    // avoid duplicate assignment
    await this.prisma.passPortAuthUserRole.upsert({
      where: { userId_roleId: { userId, roleId: role.id } },
      update: {},
      create: { userId, roleId: role.id },
    });
  }

  async removeRoleFromUser(userId: string, roleName: string) {
    const role = await this.prisma.passPortAuthRole.findUnique({ where: { name: roleName } });
    if (!role) return;
    await this.prisma.passPortAuthUserRole.deleteMany({
      where: { userId, roleId: role.id },
    });
  }

  private mapUserToDto(row: any): UserResponseDto {
    return {
      id: row.id,
      email: row.email,
      name: row.name ?? null,
      isActive: row.isActive,
      emailVerifiedAt: row.emailVerifiedAt ?? null,
      lastLoginAt: row.lastLoginAt ?? null,
      roles: (row.userRoles ?? []).map((ur: any) => ur.role.name),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt ?? null,
    };
  }
}
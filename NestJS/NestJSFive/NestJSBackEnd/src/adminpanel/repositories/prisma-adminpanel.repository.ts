import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { AdminUserService } from './adminpanel.repository.interface';
import { ListUsersDto } from '../dto/ListUsersDto';
import { PaginatedUsersDto } from '../dto/PaginatedUsersDto';
import { UserListItemDto } from '../dto/UserListItemDto';
/**
 * Adapter-based implementation of the AdminUserService contract.
 *
 * - Uses the PrismaService (import path: 'src/prisma.service') you provided.
 * - Returns paginated results with basic filters: search, role, isActive.
 *
 * Notes:
 * - The implementation expects the Prisma schema relations similar to your schema:
 *   PassPortAuthUser -> userRoles (PassPortAuthUserRole) -> role (PassPortAuthRole)
 * - If your relation field names differ, adjust the includes/where clauses accordingly.
 */
@Injectable()
export class AdminUserServiceImpl implements AdminUserService {
  constructor(private readonly prisma: PrismaService) {}

  async listUsers(query: ListUsersDto): Promise<PaginatedUsersDto> {
    const page = Math.max(1, query.page ?? 1);
    const pageSize = Math.min(200, query.pageSize ?? 25);
    const skip = (page - 1) * pageSize;

    // Build Prisma where clause
    const where: any = {};

    // search by email or name (case-insensitive contains)
    if (query.search && query.search.trim().length > 0) {
      const term = query.search.trim();
      where.OR = [
        { email: { contains: term, mode: 'insensitive' } },
        { name: { contains: term, mode: 'insensitive' } },
      ];
    }

    // isActive filter (if explicitly provided)
    if (typeof query.isActive === 'boolean') {
      where.isActive = query.isActive;
    }

    // role filter via the join table relation
    if (query.role && query.role.trim().length > 0) {
      // expects relation: userRoles -> role -> name
      where.userRoles = {
        some: {
          role: {
            name: query.role.trim(),
          },
        },
      };
    }

    // Execute count + findMany in parallel
    const [total, users] = await Promise.all([
      this.prisma.passPortAuthUser.count({ where }),
      this.prisma.passPortAuthUser.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { updatedAt: 'desc' },
        include: {
          // include join-table entries and the linked role so we can map to role names
          userRoles: {
            include: {
              role: true,
            },
          },
        },
      }),
    ]);

    // Map Prisma results to DTOs
    const data: UserListItemDto[] = users.map((u) => {
      const dto = new UserListItemDto();
      dto.id = u.id;
      dto.email = u.email;
      dto.name = u.name ?? null;
      dto.isActive = u.isActive;
      dto.emailVerifiedAt = u.emailVerifiedAt ?? null;
      dto.lastLoginAt = u.lastLoginAt ?? null;
      dto.createdAt = u.createdAt;
      dto.updatedAt = u.updatedAt ?? null;

      // collect distinct role names
      const names = (u.userRoles ?? [])
        .map((ur: any) => ur.role?.name)
        .filter(Boolean) as string[];
      dto.roles = Array.from(new Set(names));

      return dto;
    });

    const result = new PaginatedUsersDto();
    result.data = data;
    result.total = total;
    result.page = page;
    result.pageSize = pageSize;

    return result;
  }

  /**
   * Return a single user (mapped to UserListItemDto) or null if not found.
   */
  async getUserById(id: string): Promise<UserListItemDto | null> {
    const u = await this.prisma.passPortAuthUser.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!u) return null;

    const dto = new UserListItemDto();
    dto.id = u.id;
    dto.email = u.email;
    dto.name = u.name ?? null;
    dto.isActive = u.isActive;
    dto.emailVerifiedAt = u.emailVerifiedAt ?? null;
    dto.lastLoginAt = u.lastLoginAt ?? null;
    dto.createdAt = u.createdAt;
    dto.updatedAt = u.updatedAt ?? null;

    const names = (u.userRoles ?? [])
      .map((ur: any) => ur.role?.name)
      .filter(Boolean) as string[];
    dto.roles = Array.from(new Set(names));

    return dto;
  }

  /**
   * Return all users (no query params). Maps results to UserListItemDto[].
   * Note: This method returns all users — callers should be cautious in production
   * if the table is large; consider adding server-side caps if needed.
   */
  async listAllUsers(): Promise<UserListItemDto[]> {
    const users = await this.prisma.passPortAuthUser.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    return users.map((u) => {
      const dto = new UserListItemDto();
      dto.id = u.id;
      dto.email = u.email;
      dto.name = u.name ?? null;
      dto.isActive = u.isActive;
      dto.emailVerifiedAt = u.emailVerifiedAt ?? null;
      dto.lastLoginAt = u.lastLoginAt ?? null;
      dto.createdAt = u.createdAt;
      dto.updatedAt = u.updatedAt ?? null;

      const names = (u.userRoles ?? [])
        .map((ur: any) => ur.role?.name)
        .filter(Boolean) as string[];
      dto.roles = Array.from(new Set(names));

      return dto;
    });
  }

  async assignRoleToUser(
    id: string,
    role: string,
  ): Promise<UserListItemDto | null> {
    // ensure user exists
    const user = await this.prisma.passPortAuthUser.findUnique({
      where: { id },
    });
    if (!user) return null;

    // find or create role by name
    let roleRecord = await this.prisma.passPortAuthRole.findUnique({
      where: { name: role },
    });
    if (!roleRecord) {
      roleRecord = await this.prisma.passPortAuthRole.create({
        data: { name: role },
      });
    }

    // ensure link exists (idempotent)
    const existingLink = await this.prisma.passPortAuthUserRole.findFirst({
      where: { userId: id, roleId: roleRecord.id },
    });
    if (!existingLink) {
      await this.prisma.passPortAuthUserRole.create({
        data: {
          userId: id,
          roleId: roleRecord.id,
        },
      });
    }

    // return updated user projection
    return this.getUserById(id);
  }

  async listRoles(): Promise<string[]> {
    const roles = await this.prisma.passPortAuthRole.findMany({
      select: { name: true },
      orderBy: { name: 'asc' },
    });
    return roles.map((r) => r.name).filter(Boolean);
  }
}

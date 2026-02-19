import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaRawService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    // safe parameterization via Prisma.sql tagged template
    const rows = await this.prisma.$queryRaw<
      Array<{ id: string; email: string; name: string | null; createdAt: Date }>
    >(Prisma.sql`
      SELECT id, email, name, "createdAt"
      FROM "PassPortAuthUser"
      WHERE email = ${email}
      LIMIT 1
    `);
    return rows[0] ?? null;
  }

  async countUsers(): Promise<number> {
    const rows = await this.prisma.$queryRaw<{ count: number }>(Prisma.sql`
      SELECT COUNT(*)::int AS count FROM "PassPortAuthUser"
    `);
    return rows?.[0]?.count ?? 0;
  }

  async updateUserName(id: string, name: string) {
    // use $executeRaw for UPDATE (returns affected rows)
    const result = await this.prisma.$executeRaw(Prisma.sql`
      UPDATE "PassPortAuthUser"
      SET name = ${name}, "updatedAt" = now()
      WHERE id = ${id}
    `);
    return result;
  }
}

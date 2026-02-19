import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';

/**
 * PrismaService wraps the generated PrismaClient so it can be injected
 * as a Nest provider and properly connected/disconnected on module lifecycle.
 *
 * NOTE:
 * - The Prisma TypeScript types may not include the experimental `adapter`/`datasources`
 *   shape. We cast to `any` to satisfy the compiler while still passing the runtime
 *   adapter object to Prisma.
 * - If you prefer to avoid casts, you can simply call `super()` and rely on
 *   process.env.DATABASE_URL (recommended for typical setups).
 */

// const connectionString = process.env.DATABASE_URL; //this will not work
var connectionString = new ConfigService().get<string>('DATABASE_URL');

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private configService: ConfigService) {
    // If you want to use the PrismaPg adapter, construct it here and pass it to the client.
    // Casting to `any` suppresses TypeScript complaints about unknown properties.
    connectionString = process.env.DATABASE_URL;
    console.log('PrismaService connectionString:', connectionString);
    const adapter = new PrismaPg({ connectionString });

    // Pass adapter to PrismaClient. Cast to any to avoid TS errors when generated types
    // don't include the adapter option.
    // If you prefer, replace the next line with `super()` and rely on process.env.DATABASE_URL.
    super({ adapter } as any);
  }

  async onModuleInit() {
    //add an error if connection string is undefined
    if (!connectionString) {
      throw new Error('DATABASE_URL is not defined');
    }
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

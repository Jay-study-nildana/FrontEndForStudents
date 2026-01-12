import 'dotenv/config';

// Optional: prefer binary engine locally
process.env.PRISMA_CLIENT_ENGINE_TYPE =
  process.env.PRISMA_CLIENT_ENGINE_TYPE ?? 'binary';

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
// import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({
  adapter,
  log: ['info', 'warn', 'error'],
} as any);

async function main() {
  await prisma.user.create({
    data: { email: 'alice@example.com', name: 'Alice' },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
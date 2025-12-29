import 'dotenv/config';

// Optional: prefer binary engine locally
process.env.PRISMA_CLIENT_ENGINE_TYPE = process.env.PRISMA_CLIENT_ENGINE_TYPE ?? 'binary';

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter, log: ['info', 'warn', 'error'] } as any);

async function main() {
  const bcryptRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 12);

  // Roles to ensure exist
  const roles = [
    { name: 'user', description: 'Default end user role' },
    { name: 'admin', description: 'Administrator role' },
  ];

  console.log('Seeding roles...');
  for (const r of roles) {
    await prisma.passPortAuthRole.upsert({
      where: { name: r.name },
      update: { description: r.description ?? null },
      create: { name: r.name, description: r.description ?? null },
    });
  }
  console.log('Roles seeded.');

  // Seed user
  const seedEmail = process.env.SEED_USER_EMAIL ?? 'seed@example.com';
  const seedPassword = process.env.SEED_USER_PASSWORD ?? 'Password123!';
  const seedName = process.env.SEED_USER_NAME ?? 'Seed User';

  const hashed = await bcrypt.hash(seedPassword, bcryptRounds);

  console.log(`Seeding user ${seedEmail}...`);
  const user = await prisma.passPortAuthUser.upsert({
    where: { email: seedEmail },
    update: {
      // Update password so running the seed again refreshes password to the configured one
      password: hashed,
      name: seedName,
      isActive: true,
    },
    create: {
      email: seedEmail,
      password: hashed,
      name: seedName,
      isActive: true,
    },
  });

  console.log('User upserted:', { id: user.id, email: user.email });

  // Ensure the user has both roles via the join table
  console.log('Assigning roles to user...');
  for (const r of roles) {
    const roleRow = await prisma.passPortAuthRole.findUnique({ where: { name: r.name } });
    if (!roleRow) {
      // Should not happen because of upsert above
      console.warn('Role not found (unexpected):', r.name);
      continue;
    }

    // Check if join row exists
    const existing = await prisma.passPortAuthUserRole.findFirst({
      where: { userId: user.id, roleId: roleRow.id },
    });

    if (!existing) {
      await prisma.passPortAuthUserRole.create({
        data: {
          userId: user.id,
          roleId: roleRow.id,
        },
      });
      console.log(`Assigned role "${r.name}" to user ${seedEmail}`);
    } else {
      console.log(`User already has role "${r.name}"`);
    }
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error('Seed error', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
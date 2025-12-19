require('dotenv').config();
const app = require('./app');
const prisma = require('./prisma');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    // Try connecting Prisma to DB (optional but useful to fail-fast)
    if (process.env.DATABASE_URL) {
      await prisma.$connect();
      console.log('Connected to Postgres via Prisma');
    } else {
      console.warn('DATABASE_URL not set; skipping DB connect (set .env DATABASE_URL for full features)');
    }

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
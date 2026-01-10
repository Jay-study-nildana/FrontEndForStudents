require('dotenv').config();

const connection = process.env.DATABASE_URL || {
  host: process.env.PGHOST || '127.0.0.1',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || '',
  database: process.env.PGDATABASE || 'mydb'
};

module.exports = {
  development: {
    client: 'pg',
    connection,
    migrations: {
      directory: './migrations'
    },
    pool: {
      min: 0,
      max: 10
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations'
    },
    pool: {
      min: 2,
      max: 20
    }
  }
};
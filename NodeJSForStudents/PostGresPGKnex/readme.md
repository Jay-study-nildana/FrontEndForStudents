# Node + Express + Knex + pg Example

A minimal Node.js + Express project using Knex (query builder) and pg (Postgres driver) with basic CRUD endpoints for a `users` resource.

Features:
- Express server with REST endpoints: GET /users, GET /users/:id, POST /users, PUT /users/:id, DELETE /users/:id
- Knex configured for PostgreSQL (uses `pg`)
- Migration for `users` table
- Example .env file and npm scripts for running & migrating

Quick start:
1. Copy files into a project directory.
2. Create a `.env` file from `.env.example` and set `DATABASE_URL`.
3. Install dependencies:
   npm install
4. Run migrations:
   npx knex migrate:latest --knexfile knexfile.js
5. Start server:
   npm run dev

Endpoints:
- GET /users
- GET /users/:id
- POST /users  { "name": "Alice", "email": "a@example.com" }
- PUT /users/:id { "name": "New name", "email": "new@email.com" }
- DELETE /users/:id
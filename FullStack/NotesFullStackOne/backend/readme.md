# Notes API (Node + Express + Prisma + Postgres)

A minimal RESTful Web API example using PostgreSQL and Prisma.

## Quick start

1. Copy `.env.example` to `.env` and set `DATABASE_URL` to your Postgres connection string. Example:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/notesdb?schema=public"
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Generate Prisma client and run migrations (creates the DB tables):
   ```
   npm run prisma:generate
   npm run prisma:migrate
   ```
   Alternatively, run:
   ```
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. Run dev server:
   ```
   npm run dev
   ```

5. API root: `http://localhost:4000/api/notes`

## Endpoints

- GET /api/notes — list notes
- GET /api/notes/:id — get single note
- POST /api/notes — create note { title, content }
- PUT /api/notes/:id — update note
- DELETE /api/notes/:id — delete note

## Swagger

available at http://localhost:4000/docs/

## Postman Collection

postman collection included in the project folder.

## Example cURL

Create:
```bash
curl -X POST http://localhost:4000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk","content":"2 liters"}'
```

List:
```bash
curl http://localhost:4000/api/notes
```

## Prisma notes

- Schema file: `prisma/schema.prisma`
- Prisma commands:
  - `npx prisma generate` — generate client
  - `npx prisma migrate dev --name init` — run migration & create tables
  - `npx prisma studio` — open DB web UI

# book a session with me

1. [calendly](https://calendly.com/jaycodingtutor/30min)

# hire and get to know me

find ways to hire me, follow me and stay in touch with me.

1. [github](https://github.com/Jay-study-nildana)
1. [personal site](https://thechalakas.com)
1. [upwork](https://www.upwork.com/fl/vijayasimhabr)
1. [fiverr](https://www.fiverr.com/jay_codeguy)
1. [codementor](https://www.codementor.io/@vijayasimhabr)
1. [stackoverflow](https://stackoverflow.com/users/5338888/jay)
1. [Jay's Coding Channel on YouTube](https://www.youtube.com/channel/UCJJVulg4J7POMdX0veuacXw/)
1. [medium blog](https://medium.com/@vijayasimhabr)

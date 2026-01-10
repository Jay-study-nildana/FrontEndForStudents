```markdown
# Project Two — Express + class-validator (TypeScript)

This project demonstrates:
- Input validation with class-validator + class-transformer (DTO approach)
- Input sanitization (custom middleware)
- Security headers with Helmet
- CORS enabled
- Rate limiting with express-rate-limit
- Simple in-memory CRUD endpoints for `users` (no database)
- TypeScript setup (tsconfig) and dev script

Files of interest:
- src/app.ts — Express app setup
- src/server.ts — Server bootstrap
- src/routes/users.ts — CRUD endpoints for users
- src/dtos/CreateUserDto.ts, UpdateUserDto.ts — DTOs with decorators
- src/middleware/validation.ts — validate DTO middleware
- src/middleware/sanitize.ts — simple sanitization middleware
- src/middleware/errorHandler.ts — central error handler

Quick start
1. Copy files into a directory.
2. Create a `.env` from `.env.example`.
3. Install dependencies:
   npm install
4. Start dev server:
   npm run dev
5. Endpoints:
   - GET /users
   - GET /users/:id
   - POST /users
   - PUT /users/:id
   - DELETE /users/:id

Notes
- Data store is in-memory; restart resets users.
- DTOs use @Transform to trim input. Sanitizer also trims and escapes strings.
```
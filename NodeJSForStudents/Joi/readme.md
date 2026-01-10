```markdown
# Project One — Express + Joi (JavaScript)

This is a minimal Express example demonstrating:
- Input validation with Joi
- Input sanitization (custom middleware)
- Security headers with Helmet
- CORS enabled
- Rate limiting with express-rate-limit
- Simple in-memory CRUD endpoints for `users` (no database)

Files of interest:
- src/app.js — Express app setup (middleware + routes)
- src/index.js — Server bootstrap
- src/routes/users.js — CRUD endpoints for users
- src/validation/schemas.js — Joi schemas for request validation
- src/middleware/validate.js — Joi validation middleware
- src/middleware/sanitize.js — Input sanitization middleware
- src/middleware/errorHandler.js — Central error handler

Quick start
1. Copy the files into a directory.
2. Create a `.env` from `.env.example` and adjust PORT if needed.
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
- This project uses an in-memory array for users. Restarting the server resets data.
- Validation prevents invalid payloads; sanitization trims and escapes strings.
```
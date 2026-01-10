
````markdown name=project-pino/README.md
```markdown
# Project Pino — Structured Logging + Correlation IDs (Express + pino)

This example demonstrates:

- High-performance structured logging using pino
- Per-request correlation IDs (generated or propagated from incoming headers)
- Integration with pino-http so each request has `req.log`
- Use of AsyncLocalStorage to expose request context (requestId) to other modules
- Request and response logging with duration and structured fields
- Error logging and a central error handler
- Simple in-memory CRUD API for `users` (no database) to exercise logging

How to run
1. Copy the files into `project-pino/`.
2. Create `.env` from `.env.example` (optional).
3. Install deps:
   npm install
4. Start:
   npm start
5. Example requests:
   curl -i http://localhost:4000/users
   curl -i -H "X-Request-Id: my-id-abc" http://localhost:4000/users

Notes
- pino is designed for production: it outputs JSON logs by default and has low overhead.
- Use pino transports or a log aggregator to collect and examine logs.
```
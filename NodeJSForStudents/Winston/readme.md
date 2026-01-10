```markdown
# Project Winston — Structured Logging + Correlation IDs (Express)

This example demonstrates:

- Structured JSON logging using Winston
- Per-request correlation IDs (generated or propagated from incoming headers)
- Request-context storage via AsyncLocalStorage so any code can access the current request id
- Attaching a request-aware logger to `req.log`
- Request/response logging with duration and structured fields
- Error logging and a central error handler
- Simple in-memory CRUD API for `users` (no database) to exercise logging

How to run
1. Copy the files into `project-winston/`.
2. Create `.env` from `.env.example` (optional).
3. Install deps:
   npm install
4. Start:
   npm start
5. Example requests:
   curl -i http://localhost:3000/users
   curl -i -H "X-Request-Id: my-id-123" http://localhost:3000/users

Notes
- This is intentionally simple: Winston outputs structured JSON logs to the console.
- Use a log aggregator (ELK, Datadog, Azure, etc.) to consume JSON logs in production.
```
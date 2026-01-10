```markdown
# Jest + SuperTest Example Project

This project is a small, self-contained Express app that demonstrates how to write HTTP integration tests using Jest and SuperTest.

Features
- Minimal Express app with in-memory CRUD endpoints for `users`.
- Request correlation id middleware (X-Request-Id propagation + generation).
- Clean test setup using Jest + SuperTest:
  - How to import the Express app (without starting a server).
  - How to reset in-memory state between tests.
  - How to silence or mock logging during tests.
- Example tests that cover validation, happy paths, error cases, and correlation header behavior.
- Coverage setup and recommended test scripts.

Table of contents
- Requirements
- Install
- Run the app
- Run tests
- Files of interest
- Testing patterns & tips
- CI recommendations

Requirements
- Node 14+ (AsyncLocalStorage used in many examples; Node 14+ recommended)
- npm

Install
1. Copy project files into a directory.
2. Install dependencies:
   npm install

Run the app (development)
1. Create a `.env` from `.env.example` if you want to change the port:
   cp .env.example .env
2. Start:
   npm start
3. The server will run on the port in `.env` or default 3000.

Run tests
- Run the test suite and collect coverage:
  npm test

- Run tests in watch mode:
  npm run test:watch

Files of interest
- src/app.js — Express application (exports the app for testing)
- src/index.js — starts the HTTP listener (not used by tests)
- src/routes/users.js — users router and an exported resetStore() helper used by tests
- src/logger.js — small logger wrapper (easy to mock in tests)
- tests/users.test.js — example integration tests using Jest + SuperTest
- jest.config.js and jest.setup.js — Jest config and test setup helpers

Testing patterns & tips
1. Export the Express app (not the server)
   - This allows SuperTest to call request(app) without binding to a network port.
   - Our app is exported from `src/app.js`. `src/index.js` starts a listener for manual runs.

2. Reset state between tests
   - If your app uses in-memory stores in tests, reset them between tests.
   - This project exports `resetStore()` from the users module; tests call it in a beforeEach/afterEach hook.

3. Silence or mock logs
   - Tests can be noisy if the app logs to console. Use jest.spyOn to mock logger methods.
   - This project includes `jest.setup.js` which silences the logger by default.

4. Use --runInBand when sharing global resources
   - Jest runs test files in parallel by default. If tests interact with the same global resource (file, port, DB) you can run with `--runInBand`.
   - The `npm test` script here sets `--runInBand` to avoid conflicts in CI.

5. Correlation ID assertions
   - The app sets/echoes `X-Request-Id`. Tests demonstrate asserting the header is returned and respected when provided by the client.

CI recommendations
- Run tests with coverage: npm test
- Use environment variables for test configuration (e.g., NODE_ENV=test)
- If using external resources (DB), use a separated test database or mocking fixtures

FAQ
Q: Should I use supertest or spinning up the service and making HTTP calls?
A: Prefer SuperTest (request(app)) for integration tests — it's faster and avoids port conflicts. Use end-to-end tests with the actual service/process for smoke tests or external integrations.

Q: How do I test DB-backed routes?
A: For DB-backed apps, either:
- Use a test database (Docker) and run migrations before tests, cleaning between tests, or
- Mock database calls in unit tests and have separate integration tests exercising a test DB.

If you want, I can:
- Add an example GitHub Actions workflow that runs tests and reports coverage,
- Convert the project to TypeScript with ts-jest,
- Add examples that test middleware (rate limiter, CORS, validation).
Which would you like next?
```
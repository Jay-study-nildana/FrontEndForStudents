/**
 * Express application exported for tests.
 *
 * - Exports `app` so SuperTest can call request(app) without opening a real port.
 * - Includes a small request-correlation middleware that:
 *    - Reads X-Request-Id or X-Correlation-Id from incoming requests and re-uses it
 *    - Otherwise generates a new id (simple timestamp-based id for demo)
 *    - Echoes X-Request-Id back on the response
 * - Registers /users routes (in-memory store). The users module exports resetStore()
 *   which tests use to reset state between tests.
 *
 * Keep this file minimal and pure (no global state) so tests are reliable.
 */

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const usersModule = require("../routes/users");
const strUtilsModule = require("../routes/stroperations");
const fileOperationsModule = require("../routes/fileoperations");

const app = express();

// Security Headers
app.use(helmet());

// CORS (open by default for demo)
app.use(cors());

// Body parser
app.use(express.json());

// Simple request correlation middleware
app.use((req, res, next) => {
  const incoming = req.header("x-request-id") || req.header("x-correlation-id");
  const requestId = incoming || uuidv4();
  // Expose to tests/clients
  res.setHeader("X-Request-Id", requestId);

  // Also attach to req for handlers
  req.requestId = requestId;
  next();
});

// Routes
app.use("/users", usersModule.router);
app.use("/str", strUtilsModule.router);
app.use("/files", fileOperationsModule.router);

// Health endpoint
app.get("/health", (req, res) =>
  res.json({ status: "ok", requestId: req.requestId }),
);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found", requestId: req.requestId });
});

module.exports = app;

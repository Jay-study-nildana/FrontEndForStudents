/**
 * Users router (in-memory) with helper to reset state for tests.
 *
 * Exported shape:
 *  module.exports = { router, resetStore }
 *
 * Handlers:
 * - GET /users
 * - GET /users/:id
 * - POST /users
 * - PUT /users/:id
 * - DELETE /users/:id
 *
 * Simple validation is performed inline for clarity. In production,
 * prefer a validation library (Joi/Zod/class-validator).
 */

const express = require('express');
const router = express.Router();
const logger = require('../src/logger');

// In-memory store (module-scoped for demo). Tests call resetStore() to clear it.
let users = [];
let nextId = 1;

function resetStore() {
  users = [];
  nextId = 1;
}

// Helper to find user
function findUser(id) {
  return users.find((u) => u.id === id);
}

// GET /users - list
router.get('/', (req, res) => {
  logger.info({ route: '/users', requestId: req.requestId }, 'list users');
  res.json(users);
});

// GET /users/:id - get one
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  logger.info({ route: '/users/:id', id, requestId: req.requestId }, 'get user');
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'invalid id', requestId: req.requestId });
  }
  const user = findUser(id);
  if (!user) return res.status(404).json({ error: 'User not found', requestId: req.requestId });
  res.json(user);
});

// POST /users - create
router.post('/', (req, res) => {
  const { name, email } = req.body || {};
  logger.info({ route: '/users', requestId: req.requestId }, 'create user attempt');

  if (!name || !email) {
    logger.warn({ route: '/users', requestId: req.requestId }, 'create user invalid payload');
    return res.status(400).json({ error: 'name and email required', requestId: req.requestId });
  }

  // Unique email check
  if (users.some((u) => u.email === email)) {
    logger.warn({ route: '/users', email, requestId: req.requestId }, 'email already exists');
    return res.status(409).json({ error: 'Email already exists', requestId: req.requestId });
  }

  const created = { id: nextId++, name, email, createdAt: new Date().toISOString() };
  users.push(created);
  logger.info({ route: '/users', id: created.id, requestId: req.requestId }, 'user created');
  res.status(201).json(created);
});

// PUT /users/:id - update
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body || {};
  logger.info({ route: '/users/:id', id, requestId: req.requestId }, 'update user attempt');

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'invalid id', requestId: req.requestId });
  }

  const user = findUser(id);
  if (!user) return res.status(404).json({ error: 'User not found', requestId: req.requestId });

  if (email && users.some((u) => u.email === email && u.id !== id)) {
    return res.status(409).json({ error: 'Email already exists', requestId: req.requestId });
  }

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  user.updatedAt = new Date().toISOString();

  res.json(user);
});

// DELETE /users/:id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  logger.info({ route: '/users/:id', id, requestId: req.requestId }, 'delete user attempt');

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'invalid id', requestId: req.requestId });
  }

  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return res.status(404).json({ error: 'User not found', requestId: req.requestId });

  users.splice(idx, 1);
  res.status(204).send();
});

// Export router and test helper
module.exports = { router, resetStore };
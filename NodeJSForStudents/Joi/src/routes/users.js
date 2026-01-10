/**
 * Users routes (in-memory)
 *
 * Endpoints:
 * - GET /users
 * - GET /users/:id
 * - POST /users
 * - PUT /users/:id
 * - DELETE /users/:id
 *
 * Uses Joi validation middleware to validate inputs.
 *
 * Data store: simple in-memory array `users`. For demo only.
 */

const express = require('express');
const validate = require('../middleware/validate');
const {
  createUserSchema,
  updateUserSchema,
  idParamSchema
} = require('../validation/schemas');

const router = express.Router();

// In-memory store for demo purposes
let users = [];
let nextId = 1;

/**
 * Helper: find user by id numeric
 */
function findUser(id) {
  return users.find((u) => u.id === id);
}

/**
 * GET /users
 * Returns list of users (paginated in-memory not implemented for simplicity)
 */
router.get('/', (req, res) => {
  res.json(users);
});

/**
 * GET /users/:id
 * Validate :id param
 */
router.get('/:id', validate(idParamSchema, 'params'), (req, res) => {
  const id = Number(req.params.id);
  const user = findUser(id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

/**
 * POST /users
 * Create new user after validation
 */
router.post('/', validate(createUserSchema, 'body'), (req, res) => {
  const { name, email, active = true } = req.body;

  // Unique email check (in-memory)
  if (users.some((u) => u.email === email)) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  const created = {
    id: nextId++,
    name,
    email,
    active,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  users.push(created);
  res.status(201).json(created);
});

/**
 * PUT /users/:id
 * Full/partial update allowed (updateUserSchema requires at least one field)
 */
router.put('/:id', validate(idParamSchema, 'params'), validate(updateUserSchema, 'body'), (req, res) => {
  const id = Number(req.params.id);
  const user = findUser(id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { name, email, active } = req.body;

  // Handle unique email constraint
  if (email && users.some((u) => u.email === email && u.id !== id)) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (active !== undefined) user.active = active;
  user.updatedAt = new Date().toISOString();

  res.json(user);
});

/**
 * DELETE /users/:id
 */
router.delete('/:id', validate(idParamSchema, 'params'), (req, res) => {
  const id = Number(req.params.id);
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;
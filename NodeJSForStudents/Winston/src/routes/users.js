/**
 * Simple in-memory CRUD for `users` to exercise logging and correlation IDs.
 *
 * - GET /users
 * - GET /users/:id
 * - POST /users
 * - PUT /users/:id
 * - DELETE /users/:id
 *
 * Each handler uses `req.log` which is a request-scoped Winston child logger.
 */

const express = require('express');
const router = express.Router();

// In-memory store (demo only)
let users = [];
let nextId = 1;

/**
 * Helper to find user by numeric id
 */
function findUser(id) {
  return users.find((u) => u.id === id);
}

router.get('/', (req, res) => {
  req.log.info({ event: 'list_users' }, 'listing users');
  res.json(users);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  req.log.info({ event: 'get_user', id }, 'getting user');
  const user = findUser(id);
  if (!user) {
    req.log.warn({ event: 'user_not_found', id }, 'user not found');
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

router.post('/', (req, res) => {
  const { name, email } = req.body || {};
  req.log.info({ event: 'create_user_attempt', name, email }, 'attempting to create user');

  if (!name || !email) {
    req.log.warn({ event: 'create_user_invalid_payload' }, 'name and email are required');
    return res.status(400).json({ error: 'name and email are required' });
  }

  if (users.some((u) => u.email === email)) {
    req.log.warn({ event: 'create_user_conflict', email }, 'email already exists');
    return res.status(409).json({ error: 'Email already exists' });
  }

  const created = {
    id: nextId++,
    name,
    email,
    createdAt: new Date().toISOString()
  };
  users.push(created);
  req.log.info({ event: 'create_user_success', id: created.id }, 'user created');
  res.status(201).json(created);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body || {};
  req.log.info({ event: 'update_user_attempt', id, name, email }, 'attempting update');

  const user = findUser(id);
  if (!user) {
    req.log.warn({ event: 'update_user_not_found', id }, 'user not found');
    return res.status(404).json({ error: 'User not found' });
  }

  if (email && users.some((u) => u.email === email && u.id !== id)) {
    req.log.warn({ event: 'update_user_conflict', id, email }, 'email conflict');
    return res.status(409).json({ error: 'Email already exists' });
  }

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  user.updatedAt = new Date().toISOString();

  req.log.info({ event: 'update_user_success', id }, 'user updated');
  res.json(user);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  req.log.info({ event: 'delete_user_attempt', id }, 'attempting delete');
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) {
    req.log.warn({ event: 'delete_user_not_found', id }, 'user not found');
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(idx, 1);
  req.log.info({ event: 'delete_user_success', id }, 'user deleted');
  res.status(204).send();
});

module.exports = router;
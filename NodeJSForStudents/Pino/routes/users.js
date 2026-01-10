/**
 * Simple in-memory users endpoints to exercise logging (pino).
 *
 * Each handler uses `req.log` (provided by pino-http), and we also show
 * how to access requestId via getRequestContext() if needed.
 */

const express = require('express');
const { getRequestContext } = require('../src/requestContext');

const router = express.Router();

let users = [];
let nextId = 1;

function findUser(id) {
  return users.find((u) => u.id === id);
}

router.get('/', (req, res) => {
  // Structured log - include an event name and any useful metadata
  req.log.info({ event: 'list_users' }, 'listing users');
  res.json(users);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const ctx = getRequestContext();
  req.log.info({ event: 'get_user', id, requestId: ctx.requestId }, 'get user attempt');

  const user = findUser(id);
  if (!user) {
    req.log.warn({ event: 'user_not_found', id }, 'user not found');
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

router.post('/', (req, res) => {
  const { name, email } = req.body || {};
  req.log.info({ event: 'create_user_attempt', name, email }, 'create user');

  if (!name || !email) {
    req.log.warn({ event: 'create_user_invalid' }, 'invalid payload');
    return res.status(400).json({ error: 'name and email required' });
  }

  if (users.some((u) => u.email === email)) {
    req.log.warn({ event: 'create_user_conflict', email }, 'email exists');
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
  req.log.info({ event: 'update_user_attempt', id }, 'update user');

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
  req.log.info({ event: 'delete_user_attempt', id }, 'delete user');
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
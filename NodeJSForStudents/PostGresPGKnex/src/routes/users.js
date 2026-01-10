const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// GET /users - list all users
router.get('/', async (req, res, next) => {
  try {
    const users = await knex('users').select('*').orderBy('id', 'asc');
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /users/:id - get single user
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await knex('users').where({ id }).first();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// POST /users - create user
router.post('/', async (req, res, next) => {
  try {
    const { name, email, active = true } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'name and email are required' });
    }
    // returning works in Postgres
    const [created] = await knex('users')
      .insert({ name, email, active })
      .returning('*');
    res.status(201).json(created);
  } catch (err) {
    // Handle unique email constraint error (Postgres error code 23505)
    if (err && err.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    next(err);
  }
});

// PUT /users/:id - update user
router.put('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updates = {};
    const { name, email, active } = req.body;
    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;
    if (active !== undefined) updates.active = active;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const [updated] = await knex('users')
      .where({ id })
      .update(updates)
      .returning('*');

    if (!updated) return res.status(404).json({ error: 'User not found' });

    res.json(updated);
  } catch (err) {
    if (err && err.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    next(err);
  }
});

// DELETE /users/:id - delete user
router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await knex('users').where({ id }).del();
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
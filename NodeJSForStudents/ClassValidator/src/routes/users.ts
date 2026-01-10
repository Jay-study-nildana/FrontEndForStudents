/**
 * Users routes (TypeScript) — in-memory store
 *
 * Endpoints:
 * - GET /users
 * - GET /users/:id
 * - POST /users
 * - PUT /users/:id
 * - DELETE /users/:id
 *
 * Demonstrates use of DTO validation middleware and basic checks.
 */

import { Router, Request, Response } from 'express';
import { validateDto } from '../middleware/validation';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';

const router = Router();

// In-memory store for demo purposes
type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

const users: User[] = [];
let nextId = 1;

// GET /users
router.get('/', (req: Request, res: Response) => {
  res.json(users);
});

// GET /users/:id
router.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST /users - create new user
router.post('/', validateDto(CreateUserDto), (req: Request, res: Response) => {
  const body = req.body as CreateUserDto;

  // Enforce unique email at application level (in-memory)
  if (users.some((u) => u.email === body.email)) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  const created: User = {
    id: nextId++,
    name: body.name,
    email: body.email,
    active: body.active ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  users.push(created);
  res.status(201).json(created);
});

// PUT /users/:id - partial update
router.put('/:id', validateDto(UpdateUserDto), (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const body = req.body as UpdateUserDto;

  // Ensure at least one property provided (optional - could also be enforced differently)
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  // Unique email check
  if (body.email && users.some((u) => u.email === body.email && u.id !== id)) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  if (body.name !== undefined) user.name = body.name;
  if (body.email !== undefined) user.email = body.email;
  if (body.active !== undefined) user.active = body.active;
  user.updatedAt = new Date().toISOString();

  res.json(user);
});

// DELETE /users/:id
router.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(idx, 1);
  res.status(204).send();
});

export default router;
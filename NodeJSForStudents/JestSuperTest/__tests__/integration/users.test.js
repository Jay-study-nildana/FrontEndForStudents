/**
 * Integration tests for /users endpoints using Jest + SuperTest
 *
 * - Uses the exported app from src/app.js (no real network listener)
 * - Resets the in-memory store between tests using resetStore()
 * - Asserts correlation id behavior: server echoes X-Request-Id and uses client-provided id
 */

const request = require('supertest');
const app = require('../../src/app');
const usersModule = require('../../routes/users');
const logger = require('../../src/logger');

beforeAll(() => {
  // Optional: additional global setup
  // logger methods are mocked in jest.setup.js, but you could add more spies here.
});

afterAll(() => {
  // Optional: cleanup if necessary
});

beforeEach(() => {
  // Ensure a fresh store for each test
  usersModule.resetStore();
});

describe('Users API - integration', () => {
  test('GET /users initially returns empty array', async () => {
    const res = await request(app).get('/users').expect(200).expect('Content-Type', /json/);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
    // Response includes a request id header
    expect(res.headers['x-request-id']).toBeDefined();
  });

  test('POST /users with invalid payload returns 400', async () => {
    const res = await request(app).post('/users').send({ name: 'OnlyName' }).expect(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body).toHaveProperty('requestId');
  });

  test('POST /users creates a user and GET /users/:id returns it', async () => {
    const payload = { name: 'Alice', email: 'alice@example.com' };
    const postRes = await request(app).post('/users').send(payload).expect(201).expect('Content-Type', /json/);

    expect(postRes.body).toHaveProperty('id');
    expect(postRes.body.name).toBe(payload.name);
    const id = postRes.body.id;

    const getRes = await request(app).get(`/users/${id}`).expect(200);
    expect(getRes.body.email).toBe(payload.email);
  });

  test('Server echoes client-provided X-Request-Id header', async () => {
    const providedId = 'test-id-123';
    const res = await request(app).get('/users').set('X-Request-Id', providedId).expect(200);
    expect(res.headers['x-request-id']).toBe(providedId);
  });

  test('Server generates X-Request-Id when client does not provide one', async () => {
    const res = await request(app).get('/users').expect(200);
    expect(res.headers['x-request-id']).toBeDefined();
    // Should be a non-empty string
    expect(res.headers['x-request-id'].length).toBeGreaterThan(0);
  });

  test('POST duplicate email returns 409', async () => {
    const payload = { name: 'Bob', email: 'bob@example.com' };
    await request(app).post('/users').send(payload).expect(201);
    const second = await request(app).post('/users').send(payload).expect(409);
    expect(second.body).toHaveProperty('error');
  });

  test('GET /users/:id returns 404 for missing user', async () => {
    await request(app).get('/users/999').expect(404);
  });
});
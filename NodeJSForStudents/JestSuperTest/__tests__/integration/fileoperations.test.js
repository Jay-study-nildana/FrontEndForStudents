/**
 * SuperTest + Jest integration tests for fileoperations router (POST /files/upload, GET /files)
 *
 * - Uses multer memory storage so no disk writes occur
 * - Mocks logger to assert metadata propagation without noisy console output
 * - Uses an express app with middleware that sets req.requestId (reads X-Request-Id or generates deterministic id)
 * - Resets the in-memory files store before each test
 *
 * Run: npx jest tests/integration/fileoperations.test.js
 */

const express = require('express');
const request = require('supertest');

// Mock logger before requiring the router so router receives mocked logger
jest.mock('../../src/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
}));
const logger = require('../../src/logger');

// After mocking logger, require the router module
const { router } = require('../../routes/fileoperations');
const filesStore = require('../../src/fileStoreUtils');

describe('Fileoperations router (/files)', () => {
  let app;

  beforeEach(() => {
    // Reset store to ensure test isolation
    filesStore.resetStore();

    // Build fresh express app for each test
    app = express();

    // multer requires no json parser for multipart uploads, but having it is fine for other routes
    app.use(express.json());

    // middleware to attach requestId (used by router error responses & logger)
    app.use((req, res, next) => {
      req.requestId = req.get('X-Request-Id') || 'generated-test-id';
      next();
    });

    // mount router at /files
    app.use('/files', router);

    // Clear mocks
    jest.clearAllMocks();
  });

  test('GET /files returns empty list when none uploaded', async () => {
    const res = await request(app)
      .get('/files')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('files');
    expect(Array.isArray(res.body.files)).toBe(true);
    expect(res.body.files.length).toBe(0);

    expect(logger.info).toHaveBeenCalledWith(
      expect.objectContaining({ route: '/files', requestId: 'generated-test-id' }),
      'list files',
    );
  });

  test('POST /files/upload uploads a file and GET /files lists it', async () => {
    const fileContents = 'Hello file content';
    const uploadRes = await request(app)
      .post('/files/upload')
      .attach('file', Buffer.from(fileContents), 'greeting.txt')
      .expect(201)
      .expect('Content-Type', /json/);

    expect(uploadRes.body).toHaveProperty('file');
    const uploaded = uploadRes.body.file;
    expect(uploaded).toHaveProperty('id');
    expect(uploaded.originalname).toBe('greeting.txt');
    expect(typeof uploaded.mimetype).toBe('string');
    expect(typeof uploaded.size).toBe('number');
    expect(uploaded.size).toBe(Buffer.from(fileContents).length);
    expect(uploaded).toHaveProperty('uploadDate');

    // list should return the same metadata (no buffer)
    const listRes = await request(app).get('/files').expect(200);
    expect(Array.isArray(listRes.body.files)).toBe(true);
    expect(listRes.body.files.length).toBe(1);
    expect(listRes.body.files[0].id).toBe(uploaded.id);
    expect(listRes.body.files[0].originalname).toBe('greeting.txt');

    // logger called for upload and list
    expect(logger.info).toHaveBeenCalledWith(
      expect.objectContaining({ route: '/files/upload', requestId: 'generated-test-id' }),
      'file upload',
    );
    expect(logger.info).toHaveBeenCalledWith(
      expect.objectContaining({ route: '/files', requestId: 'generated-test-id' }),
      'list files',
    );
  });

  test('POST /files/upload returns 400 when no file provided', async () => {
    const res = await request(app)
      .post('/files/upload')
      // sending JSON (not multipart) - route expects multipart; multer will not populate req.file
      .send({ notAFile: true })
      .expect(400);

    expect(res.body).toHaveProperty('error', 'file is required (multipart/form-data field "file")');
    expect(res.body).toHaveProperty('requestId', 'generated-test-id');

    // logger.info still invoked (the route logs at start)
    expect(logger.info).toHaveBeenCalledWith(
      expect.objectContaining({ route: '/files/upload', requestId: 'generated-test-id' }),
      'file upload',
    );
  });

  test('multiple uploads appear in list and preserve order of addition', async () => {
    const fileA = Buffer.from('A');
    const fileB = Buffer.from('B');

    const resA = await request(app).post('/files/upload').attach('file', fileA, 'a.txt').expect(201);
    const resB = await request(app).post('/files/upload').attach('file', fileB, 'b.txt').expect(201);

    const listRes = await request(app).get('/files').expect(200);
    expect(listRes.body.files.length).toBe(2);
    expect(listRes.body.files[0].originalname).toBe('a.txt');
    expect(listRes.body.files[1].originalname).toBe('b.txt');

    // distinct ids
    expect(listRes.body.files[0].id).not.toBe(listRes.body.files[1].id);
  });

  test('client-provided X-Request-Id is used in logger and error responses', async () => {
    const providedId = 'client-id-xyz';

    // successful upload with provided id
    await request(app)
      .post('/files/upload')
      .set('X-Request-Id', providedId)
      .attach('file', Buffer.from('ok'), 'ok.txt')
      .expect(201);

    expect(logger.info).toHaveBeenCalledWith(
      expect.objectContaining({ route: '/files/upload', requestId: providedId }),
      'file upload',
    );

    // missing file with provided id -> error JSON includes requestId
    const errRes = await request(app)
      .post('/files/upload')
      .set('X-Request-Id', providedId)
      .send({}) // no file field
      .expect(400);

    expect(errRes.body).toHaveProperty('requestId', providedId);
  });

  test('upload of large-ish buffer still works (memory storage) and size reported correctly', async () => {
    const big = Buffer.alloc(1024 * 50, 'a'); // 50KB
    const res = await request(app).post('/files/upload').attach('file', big, 'big.bin').expect(201);
    expect(res.body.file.size).toBe(big.length);
  });
});
/**
 * SuperTest + Jest integration tests for the string utility router
 *
 * - Mocks the logger to avoid noisy output and to assert logging calls
 * - Creates a small express app that installs a tiny middleware to set req.requestId
 *   (the router expects req.requestId to exist and also uses it in error responses)
 * - Mounts the router under /str and exercises all endpoints with success and failure cases
 *
 * This test file aims to maximize coverage of the router's branches (success, validation errors,
 * logging behavior and requestId propagation).
 */

const express = require('express');
const request = require('supertest');

// Mock logger BEFORE requiring the router so the router receives the mocked logger instance
jest.mock('../../src/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
}));
const logger = require('../../src/logger');

// Now import the router (it will use the mocked logger)
const { router } = require('../../routes/stroperations'); // adjust path if your router file is elsewhere

describe('String utils router (/str)', () => {
  let app;

  beforeAll(() => {
    // nothing here; keep global setup minimal
  });

  beforeEach(() => {
    // Fresh express app for each test to avoid shared state and to reset any middleware side-effects
    app = express();
    app.use(express.json());

    // Simple middleware to provide req.requestId to the router.
    // It reads X-Request-Id header if present, otherwise generates a deterministic id for tests.
    app.use((req, res, next) => {
      req.requestId = req.get('X-Request-Id') || 'generated-test-id';
      next();
    });

    // mount router at /str
    app.use('/str', router);

    // clear logger mocks between tests
    jest.clearAllMocks();
  });

  afterAll(() => {
    // no global teardown needed
  });

  describe('POST /str/reverse', () => {
    test('returns reversed string on valid input and logs request', async () => {
      const payload = { str: 'hello' };
      const providedId = 'req-1';
      const res = await request(app)
        .post('/str/reverse')
        .set('X-Request-Id', providedId)
        .send(payload)
        .expect(200)
        .expect('Content-Type', /json/);

      expect(res.body).toHaveProperty('result', 'olleh');

      // logger.info should have been called once with an object containing route and requestId,
      // and the second arg should be the message string used in the router.
      expect(logger.info).toHaveBeenCalledTimes(1);
      expect(logger.info).toHaveBeenCalledWith(
        expect.objectContaining({ route: '/str/reverse', requestId: providedId }),
        'reverse request',
      );
    });

    test('returns 400 and includes requestId when str is missing or not a string', async () => {
      const res1 = await request(app).post('/str/reverse').send({}).expect(400);
      expect(res1.body).toHaveProperty('error', 'str must be a string');
      expect(res1.body).toHaveProperty('requestId', 'generated-test-id');

      const res2 = await request(app).post('/str/reverse').send({ str: 123 }).expect(400);
      expect(res2.body).toHaveProperty('error', 'str must be a string');
      expect(res2.body).toHaveProperty('requestId', 'generated-test-id');
    });
  });

  describe('POST /str/capitalize', () => {
    test('capitalizes words and preserves multiple spaces', async () => {
      const res = await request(app)
        .post('/str/capitalize')
        .send({ str: 'hELLo  woRLd' })
        .expect(200);
      // double space in input should remain double space in output because router uses simple split/join
      expect(res.body).toHaveProperty('result', 'Hello  World');
      expect(logger.info).toHaveBeenCalledWith(
        expect.objectContaining({ route: '/str/capitalize', requestId: 'generated-test-id' }),
        'capitalize request',
      );
    });

    test('returns 400 for non-string input', async () => {
      const res = await request(app).post('/str/capitalize').send({ str: null }).expect(400);
      expect(res.body).toHaveProperty('error', 'str must be a string');
      expect(res.body).toHaveProperty('requestId', 'generated-test-id');
    });
  });

  describe('POST /str/isPalindrome', () => {
    test('detects palindrome ignoring case/punctuation/spacing', async () => {
      const payload = { str: 'A man, a plan, a canal: Panama' };
      const res = await request(app).post('/str/isPalindrome').send(payload).expect(200);
      expect(res.body).toHaveProperty('result', true);
      expect(logger.info).toHaveBeenCalledWith(
        expect.objectContaining({ route: '/str/isPalindrome', requestId: 'generated-test-id' }),
        'palindrome check',
      );
    });

    test('returns false for non-palindrome', async () => {
      const res = await request(app).post('/str/isPalindrome').send({ str: 'hello' }).expect(200);
      expect(res.body).toHaveProperty('result', false);
    });

    test('returns 400 when input is not a string', async () => {
      const res = await request(app).post('/str/isPalindrome').send({ str: 42 }).expect(400);
      expect(res.body).toHaveProperty('error', 'str must be a string');
      expect(res.body).toHaveProperty('requestId', 'generated-test-id');
    });
  });

  describe('POST /str/truncate', () => {
    test('truncates when string length exceeds maxLength', async () => {
      const res = await request(app)
        .post('/str/truncate')
        .send({ str: 'Hello World', maxLength: 5 })
        .expect(200);
      expect(res.body).toHaveProperty('result', 'Hello...');
      expect(logger.info).toHaveBeenCalledWith(
        expect.objectContaining({ route: '/str/truncate', requestId: 'generated-test-id' }),
        'truncate request',
      );
    });

    test('returns original string when length <= maxLength', async () => {
      const res = await request(app).post('/str/truncate').send({ str: 'Hello', maxLength: 5 }).expect(200);
      expect(res.body).toHaveProperty('result', 'Hello');
    });

    test('maxLength 0 returns ellipsis-only', async () => {
      const res = await request(app).post('/str/truncate').send({ str: 'Hello', maxLength: 0 }).expect(200);
      // Implementation returns slice(0,0) + '...' -> '...'
      expect(res.body).toHaveProperty('result', '...');
    });

    test('returns 400 when maxLength is missing or invalid', async () => {
      // missing maxLength -> router treats it as invalid and returns 400
      const res1 = await request(app).post('/str/truncate').send({ str: 'Hello' }).expect(400);
      expect(res1.body).toHaveProperty('error', 'maxLength must be a non-negative number');
      expect(res1.body).toHaveProperty('requestId', 'generated-test-id');

      // negative maxLength -> 400
      const res2 = await request(app).post('/str/truncate').send({ str: 'Hello', maxLength: -1 }).expect(400);
      expect(res2.body).toHaveProperty('error', 'maxLength must be a non-negative number');

      // non-number maxLength -> 400
      const res3 = await request(app).post('/str/truncate').send({ str: 'Hello', maxLength: 'five' }).expect(400);
      expect(res3.body).toHaveProperty('error', 'maxLength must be a non-negative number');
    });

    test('returns 400 when str is not a string', async () => {
      const res = await request(app).post('/str/truncate').send({ str: 123, maxLength: 2 }).expect(400);
      expect(res.body).toHaveProperty('error', 'str must be a string');
    });
  });

  describe('POST /str/countOccurrences', () => {
    test('counts single-character occurrences correctly', async () => {
      const res = await request(app).post('/str/countOccurrences').send({ str: 'hello world', substring: 'l' }).expect(200);
      expect(res.body).toHaveProperty('count', 3);
      expect(logger.info).toHaveBeenCalledWith(
        expect.objectContaining({ route: '/str/countOccurrences', requestId: 'generated-test-id' }),
        'countOccurrences request',
      );
    });

    test('counts multi-character substring occurrences', async () => {
      const res = await request(app).post('/str/countOccurrences').send({ str: 'banana', substring: 'na' }).expect(200);
      expect(res.body).toHaveProperty('count', 2);
    });

    test('returns 0 when substring is empty string (allowed by router)', async () => {
      // Note: router validates substring is a string but allows empty string; underlying util returns 0
      const res = await request(app).post('/str/countOccurrences').send({ str: 'hello', substring: '' }).expect(200);
      expect(res.body).toHaveProperty('count', 0);
    });

    test('returns 0 when str is empty', async () => {
      const res = await request(app).post('/str/countOccurrences').send({ str: '', substring: 'a' }).expect(200);
      expect(res.body).toHaveProperty('count', 0);
    });

    test('returns 400 when inputs are not strings', async () => {
      const res1 = await request(app).post('/str/countOccurrences').send({ str: 123, substring: 'a' }).expect(400);
      expect(res1.body).toHaveProperty('error', 'str and substring must be strings');

      const res2 = await request(app).post('/str/countOccurrences').send({ str: 'abc', substring: 5 }).expect(400);
      expect(res2.body).toHaveProperty('error', 'str and substring must be strings');
    });
  });

  describe('POST /str/toCamelCase', () => {
    test('converts hyphenated, underscored and spaced strings to camelCase', async () => {
      const res1 = await request(app).post('/str/toCamelCase').send({ str: 'hello-world' }).expect(200);
      expect(res1.body).toHaveProperty('result', 'helloWorld');

      const res2 = await request(app).post('/str/toCamelCase').send({ str: 'hello_world' }).expect(200);
      expect(res2.body).toHaveProperty('result', 'helloWorld');

      const res3 = await request(app).post('/str/toCamelCase').send({ str: 'hello world test' }).expect(200);
      expect(res3.body).toHaveProperty('result', 'helloWorldTest');
    });

    test('handles already camelCase by lowercasing first part and removing separators (implementation detail)', async () => {
      // According to the implementation used by the project (toLowerCase() + replace),
      // 'helloWorld' will become 'helloworld' (lowercased, because it lowercases then doesn't uppercase any char)
      const res = await request(app).post('/str/toCamelCase').send({ str: 'helloWorld' }).expect(200);
      expect(res.body).toHaveProperty('result', 'helloworld');
    });

    test('returns 400 for non-string input', async () => {
      const res = await request(app).post('/str/toCamelCase').send({ str: 123 }).expect(400);
      expect(res.body).toHaveProperty('error', 'str must be a string');
    });
  });

  describe('POST /str/removeWhitespace', () => {
    test('removes spaces, tabs and newlines', async () => {
      const res = await request(app).post('/str/removeWhitespace').send({ str: 'hello\tworld\n' }).expect(200);
      expect(res.body).toHaveProperty('result', 'helloworld');
      expect(logger.info).toHaveBeenCalledWith(
        expect.objectContaining({ route: '/str/removeWhitespace', requestId: 'generated-test-id' }),
        'removeWhitespace request',
      );
    });

    test('returns empty string when input is whitespace-only', async () => {
      const res = await request(app).post('/str/removeWhitespace').send({ str: '   \n\t' }).expect(200);
      expect(res.body).toHaveProperty('result', '');
    });

    test('returns 400 for non-string input', async () => {
      const res = await request(app).post('/str/removeWhitespace').send({ str: null }).expect(400);
      expect(res.body).toHaveProperty('error', 'str must be a string');
    });
  });

  describe('requestId propagation and logger behavior', () => {
    test('when client provides X-Request-Id it is used in logger calls and in error bodies', async () => {
      const providedId = 'client-id-123';
      await request(app)
        .post('/str/truncate')
        .set('X-Request-Id', providedId)
        .send({ str: 'abc', maxLength: 1 })
        .expect(200);

      // logger should be informed with the provided requestId
      expect(logger.info).toHaveBeenCalledWith(
        expect.objectContaining({ route: '/str/truncate', requestId: providedId }),
        'truncate request',
      );

      // trigger an error path and assert requestId appears in JSON error body
      const res = await request(app)
        .post('/str/truncate')
        .set('X-Request-Id', providedId)
        .send({ str: 'abc' }) // missing maxLength -> validation error
        .expect(400);

      expect(res.body).toHaveProperty('requestId', providedId);
    });

    test('when no X-Request-Id header provided middleware-generated id is used', async () => {
      // send invalid request to provoke an error json that includes requestId
      const res = await request(app).post('/str/reverse').send({}).expect(400);
      expect(res.body).toHaveProperty('requestId', 'generated-test-id');
    });
  });
});
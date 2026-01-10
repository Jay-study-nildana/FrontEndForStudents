/**
 * Express application setup (TypeScript)
 * - Helmet, CORS, rate limit
 * - Sanitization middleware
 * - Users routes
 * - Error handling
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import usersRouter from './routes/users';
import sanitizeMiddleware from './middleware/sanitize';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Sanitizer: trims and escapes strings
app.use(sanitizeMiddleware);

// Rate limiter
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

app.use('/users', usersRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Central error handler must be last
app.use(errorHandler);

export default app;
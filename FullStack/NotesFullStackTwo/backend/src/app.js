const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const notesRouter = require('./routes/notes');
const authRouter = require('./routes/auth');
const testrolesRouter = require("./routes/testroles");

const app = express();

// Global middleware
app.use(helmet());
app.use(cors());
app.use(cookieParser()); // <--- enable cookies
app.use(express.json());
app.use(morgan('dev'));

// API routes
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);
app.use('/api/testroles', testrolesRouter);

// Swagger UI and raw JSON
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/docs.json', (req, res) => res.json(swaggerSpec));

// Health-check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
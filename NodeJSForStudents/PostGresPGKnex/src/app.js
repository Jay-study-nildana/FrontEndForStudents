const express = require('express');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Users routes
app.use('/users', usersRouter);

// Generic 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
/**
 * Server bootstrap for Project One (JavaScript + Joi).
 * - Loads environment variables
 * - Starts Express app from ./app.js
 */

require('dotenv').config(); // load .env
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // Friendly startup message
  console.log(`Project One (Joi JS) running at http://localhost:${PORT}`);
});
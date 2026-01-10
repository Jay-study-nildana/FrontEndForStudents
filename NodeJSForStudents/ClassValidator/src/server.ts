/**
 * Server bootstrap (TypeScript)
 * Loads environment variables and starts Express app
 */

import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Project Two (class-validator TS) running at http://localhost:${PORT}`);
});
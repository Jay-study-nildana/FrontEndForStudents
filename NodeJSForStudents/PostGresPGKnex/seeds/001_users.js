/**
 * Seeds users table with sample data.
 * Run: npx knex seed:run --knexfile knexfile.js
 */

exports.seed = async function (knex) {
  // For Postgres, TRUNCATE resets the serial id sequence as well.
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');

  await knex('users').insert([
    { name: 'Alice Johnson', email: 'alice@example.com', active: true },
    { name: 'Bob Martinez', email: 'bob@example.com', active: true },
    { name: 'Carol Ng', email: 'carol@example.com', active: false },
    { name: 'Diego Silva', email: 'diego@example.com', active: true },
    { name: 'Eve Thompson', email: 'eve@example.com', active: true }
  ]);
};
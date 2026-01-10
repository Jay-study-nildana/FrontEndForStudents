/**
 * Migration: create users table
 * Run: npx knex migrate:latest --knexfile knexfile.js
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.boolean('active').notNullable().defaultTo(true);
    table.timestamps(true, true); // created_at, updated_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
// Knex instance used by the app
const knexLib = require('knex');
const env = process.env.NODE_ENV || 'development';
const config = require('../../knexfile');

const knex = knexLib(config[env]);

module.exports = knex;
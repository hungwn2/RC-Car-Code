const { Pool } = require('pg');

const pool = new Pool({
  user: 'hungwn2',
  host: 'localhost',
  database: 'pokemon_inventory',
  password: 'hibanyin420Z',
  port: 5432,
});
//steal all u want

module.exports = pool;

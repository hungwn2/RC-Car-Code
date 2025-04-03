// filepath: c:\Users\User\NodeJs\mini-message-boards\db.js (or wherever you manage your DB connection)
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432, // Default PostgreSQL port
  ssl: {
    rejectUnauthorized: false // For Neon, you might need this in development
  }
});

module.exports = pool;
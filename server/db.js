const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5434,
  database: process.env.DB_NAME || "idwd_db",
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 20
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;

require('dotenv').config();

const { Pool } = require('pg');

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT)
};

console.log('POOL HOST:', config.host);
console.log('POOL PORT:', config.port);
console.log('POOL USER:', config.user);
console.log('POOL DATABASE:', config.database);

const pool = new Pool(config);

module.exports = pool;
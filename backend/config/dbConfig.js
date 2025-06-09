const { Pool } = require('pg');
require('dotenv').config();

// const connectionString = process.env.DB_CONNECTION_STRING;

const db = new Pool({

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // connectionString  

});


module.exports = db;

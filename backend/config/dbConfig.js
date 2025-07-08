const { Pool } = require('pg');
// require('dotenv').config();

// const connectionString = process.env.DB_CONNECTION_STRING;

const db = new Pool({

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true,

    // connectionString  

});

// (async function test() {
//     const result = await db.query(`SELECT NOW()`);
//     console.log(result.rows);
// })()


module.exports = db;

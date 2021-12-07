const mysql = require("mysql2");
require("dotenv").config();
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const poolPromise = pool.promise();
module.exports = poolPromise;

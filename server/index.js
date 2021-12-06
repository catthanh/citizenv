const express = require('express')
const app = express()
const port = 3000

app.use(express.json())


const mysql = require('mysql2')
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '2512',
    database: 'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


app.get('/', (req, res) => {
    pool.getConnection(function (err, conn) {
        // Do something with the connection
        conn.query('select * from test.user', function (err, rows, fields) {
            // Connection is automatically released when query resolves
            res.send(rows)
        });

        pool.releaseConnection(conn);
    })
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
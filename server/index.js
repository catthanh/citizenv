const express = require('express')
const app = express()
const port = 3000
const pool = require('./db/db.js')

app.use(express.json())


app.get('/', (req, res) => {
    pool.getConnection((err, conn) => {
        // Do something with the connection
        conn.query('select * from test.user', function (err, rows, fields) {
            // Connection is automatically released when query resolves
            res.send(rows)
        });

        pool.releaseConnection(conn);
    })
})
// aaaa
// pool.getConnection((err, conn) => {
//     // Do something with the connection
//     conn.query('select * from test.user', function (err, rows, fields) {
//         // Connection is automatically released when query resolves
//         console.log(rows)
//     });

//     pool.releaseConnection(conn);
// })



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const routesHandler = require("./routes/handler");

const port = 5000;
const pool = require("./config/pool.js");

app.use(express.json());

app.use("/", routesHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

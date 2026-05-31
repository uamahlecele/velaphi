require("dotenv").config();
const mysql = require("mysql2");

// Create the Database Connection
const pool = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
});

// Connection is verified

pool.connect((err) => {
    if (err) {
        console.log("Connection failed:", err);
        return;
    }

    console.log("CONNECTION SUCCESSFUL!");

    // Query runs AFTER connection is established

    pool.query("SELECT * FROM surnames", (err, res) => {
        if (err) {
            console.log("Query failed:", err);
            return;
        }
        console.log(res);
    });
});

// Exporting connection for other modules to use

module.exports = pool;
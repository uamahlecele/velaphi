// Imports
require("dotenv").config();
const mysql = require("mysql2");

// Create the Database Connection
const pool = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

}).promise() // using the promise api for mySQL. 

// Connection is verified
pool.connect((err) => {
    if (err) {
        console.log("Connection failed:", err);
        return;
    }

    console.log("CONNECTION SUCCESSFUL!");

    // Query runs AFTER connection is established

    // pool.query("SELECT * FROM surnames", (err, res) => {
    //     if (err) {
    //         console.log("Query failed:", err);
    //         return;
    //     }
    //     console.log(res);
    // });
});

async function getSurname(surname) {
    const [returnRowOfInformation] = await pool.query(
        `SELECT * 
        FROM surnames
        WHERE isibongo= ? 
        `, [surname] // We pass in a ? in our query and then pass the actual query value as the second parameter seperately so that we prevent SQL Injections
    )
    return returnRowOfInformation[0];
}

// Quick async function that allows me to use await

// (async () => {
//     const surname = await getSurname('Dladla');
//     console.log(surname);
// })();

// Exporting connection for other modules to use

module.exports = { getSurname };
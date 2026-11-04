// Imports
require("dotenv").config();
const mysql = require("mysql2");

// Create the Database Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 5
});

async function getSurname(surname) {
    const [rows] = await pool.promise().query(
        `SELECT * 
        FROM surnames
        WHERE isibongo = ?`,
        [surname]
    );

    const record = rows[0];
    if (!record) return null;

    // Normalize JSON well_known_people column (handles both string and parsed object/array)
    if (typeof record.well_known_people === 'string') {
        try {
            record.well_known_people = JSON.parse(record.well_known_people);
        } catch (err) {
            console.error("Failed to parse well_known_people JSON:", err);
            record.well_known_people = [];
        }
    } else if (!record.well_known_people) {
        record.well_known_people = [];
    }

    return record;
}

async function getAllSurnames() {
    const [rows] = await pool.promise().query(
        `SELECT isibongo 
        FROM surnames 
        ORDER BY isibongo ASC`
    );
    return rows.map(r => r.isibongo);
}

// Exporting functions and pool for other modules to use
module.exports = { getSurname, getAllSurnames, pool };
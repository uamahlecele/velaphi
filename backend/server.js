// this will be for expressjs, building my server

// 1. Express.js setup
const express = require('express');
const app = express();

// 2. Defining my routes

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html'); // This returns the about.html
});


app.listen(process.env.PORT);
console.log("Running!");
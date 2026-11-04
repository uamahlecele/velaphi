
/**
 * This file will be my server and its responsibility is to route requests
 *  with the corresponding actions
 * 
 * To build my server I'll make use of Express.js (Web Framework. Think Flask in python)
 */


// 1. Express.js setup
require("dotenv").config({ quiet: true });
const path = require('path');

const express = require('express');
const dbConnection = require('./config/database.js');
const app = express();

// this is middleware that will return a static file

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, 'public')));

/**  Sets EJS as the view engine 
 * A view engine is a software component that allows 
 * the rendering of dynamic content onto a web page. 
*/

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Defining my routes

//this is the home directory
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/about.html')); // This returns about.html
});

/** 
 * This line below is responsible for generating the html file built 
 * from the data in the surname found
 */

app.get('/surname', async (req, res) => { //:isibongo is the placeholder for the actual surname
    const surname = (req.query.inputSearch || '').trim(); // e.g cele will be stored in the variable surname
    const foundSurname = surname ? await dbConnection.getSurname(surname) : null;

    if (!foundSurname) {
        const availableSurnames = await dbConnection.getAllSurnames();
        return res.render('not-found', {
            searchedSurname: surname,
            surnames: availableSurnames
        });
    }

    const { id, isibongo, izithakazelo, umlando, well_known_people } = foundSurname;
    res.render('index', {
        surname: isibongo,
        izithakazelo: izithakazelo,
        umlando: umlando,
        well_known_people: well_known_people

    });

});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`PORT IS RUNNING at PORT ${PORT}!!`);
    });
}

module.exports = app;


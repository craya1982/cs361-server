const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const pool = require('./database');
const app = express();

app.listen(5893, onListening);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

function onListening() {
    pool.query("show tables like 'usersDB'", function (err, result, fields) {
        if (err || result.length === 0) {
            console.log("No table")
        }
        else {
            console.log("Table already exists")
        }
    });}


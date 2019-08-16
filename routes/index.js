const express = require('express');
const router = express.Router({});
const _ = require('lodash');
const pool = require('../database');

router.post('/', function (req, res, next) {
    //These are values that come in from the POST request, i.e. JSON format:  { 'username': 'chris', 'password' : 'pass1234' }
    let body = _.pick(req.body, ['username', 'password']);

    pool.query("select * from usersDB WHERE username = ? AND password = ?", [body.username, body.password], function (err, result) {
        res.setHeader('Content-Type', 'application/json');
        //This returns JSON in the format { 'success': 'true' } or { 'success' : 'false' }
        res.send(JSON.stringify({success: result !== null && result.length !== 0, user_id: result[0].user_id}));
    })

});

router.post('/otc', function (req, res, next) {
    //These are values that come in from the POST request, i.e. JSON format:  { 'username': 'chris', 'password' : 'pass1234' }
    let body = _.pick(req.body, ['user_id', 'drug_name']);

    pool.query("INSERT INTO DrugDB (drug_name, user_id) VALUES (?)", [[body.drug_name, body.user_id]], function (err, result) {
        if (err) {
            next(err);
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({success: result.affectedRows === 1, id: result.insertId}));
    })

});

module.exports = router;

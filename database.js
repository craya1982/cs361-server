var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_pardakhr',
    password: '4597',
    database: 'cs340_pardakhr'
});

module.exports = pool;

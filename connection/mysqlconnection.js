const MYSQL = require('mysql2');

const CONN = MYSQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sakila'
});

module.exports = CONN;
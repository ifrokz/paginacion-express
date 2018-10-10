const CONN = require('../mysqlconnection');

const Films = {};

Films.fetchAll = (callback) => {
    if(!CONN) return callback('No se ha podido conectar a la base de datos');

    const SQL = "SELECT * FROM film LIMIT 5;";
    CONN.query(SQL, (error, rows) => {
        if(error) return callback(error);

        else return callback(null, rows);
    });
}

Films.insert = (film, callback) => {
    if(!CONN) return callback('No se ha podido conectar a la base de datos');
  
    CONN.query('INSERT INTO film SET ?', [film], (error, result) => {
        if(error) return callback(error);
        return callback(null, result.insertId);
    })
}

module.exports = Films;

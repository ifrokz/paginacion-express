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


Films.paginate = (offset, limit, callback) => {
    if(!CONN) return callback('No se ha podido conectar a la base de datos');

    CONN.query('SELECT * FROM film LIMIT ?, ?', [offset, limit], (error, rows) => {
        if(error){
            return callback(error);
        } else {
            CONN.query('SELECT COUNT(*) as total FROM film', (error, count) => {
                if(error) return callback(error);
                return callback(null, {count, rows})
            })
        }
    })
}

// console.log(Films.paginate(500, 5, (error, result) => {
//     console.log(result)
// }))



module.exports = Films;

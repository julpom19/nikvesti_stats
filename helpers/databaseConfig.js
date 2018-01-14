const mysql = require('mysql');


let connection;

function createConnection() {
    return mysql.createConnection({
        host: "localhost",
        port: '3306',
        // user: "nikvesti",
        user: "root",
        // password: "w5HDKhC4cJEfbWUS",
        password: "",
        database: 'nikvesti'
    });
}

module.exports.getConnection = function () {
    if (!connection) {
        connection = createConnection();
    }
    return connection;
}
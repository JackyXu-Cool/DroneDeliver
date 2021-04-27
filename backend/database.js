var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.Mysql_host,
    user: process.env.Mysql_user,
    password: process.env.Mysql_password,
    database: process.env.Mysql_database
});

module.exports = pool;
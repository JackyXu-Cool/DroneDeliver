var mysql = require("mysql");

var con = mysql.createConnection({
    host: process.env.Mysql_host,
    user: process.env.Mysql_user,
    password: process.env.Mysql_password,
    database: process.env.Mysql_database
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
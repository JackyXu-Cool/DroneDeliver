const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// MySQL database connection setup
const connection = mysql.createConnection({
    host: process.env.Mysql_host,
    user: process.env.Mysql_user,
    password: process.env.Mysql_password,
    database: process.env.Mysql_database
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
    try {
        app.listen(5000);
        console.log("Listenning on Localhost:5000")
    } catch(err) {
        throw err;
    }
});

// Rest API setup

// Parse the request body from json to object format 
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

app.get("/test", async(req, res, next) => {
    let sql = `CALL admin_create_grocery_chain(?)`;
    connection.query(sql, "Hema food", (error) => {
        if (error) {
          next(error);
        }
        return res.json({"success": true});
    });
});

app.use((req, res, next) => {
    const error = new Error("Could not find the route", 404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.code || 500)
    .json({message: error.message || "An unknown error occurs"})
});


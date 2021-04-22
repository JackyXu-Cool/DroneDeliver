const express = require("express");
const bodyParser = require("body-parser");

const userRoute = require("./routes/user-route");

const app = express();

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

app.use("/user", userRoute);

app.use((req, res, next) => {
    const error = new Error("Could not find the route", 404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.code || 500)
    .json({message: error.message || "An unknown error occurs"})
});

app.listen(5000, () => {
    console.log('Listenning on Localhost:5000');
});


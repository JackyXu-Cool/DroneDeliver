const pool = require("../database");

const signupCustomer = async (req, res, next) => {
    let sql = `CALL register_customer(?,?,?,?,?,?,?,?,?,?,?)`;
    const { username, password, fname, lname, street, city, state, zipcode, ccnumber, cvv, exp_date } = req.body;
    pool.query(sql, [username, password, fname, lname, street, city, state, zipcode, ccnumber, cvv, exp_date], (err, result) => {
        if (err) return next(new Error("Customer creation error"));
        return res.status(201)
                  .json({ success: true });
    });
};

const signupDroneTech = async (req, res, next) => {
    let sql = `CALL register_drone_technician(?,?,?,?,?,?,?,?,?,?)`;
    const { username, password, fname, lname, street, city, state, zipcode, storeName, chainName } = req.body;
    pool.query(sql, [username, password, fname, lname, street, city, state, zipcode, storeName, chainName], (err, result) => {
        if (err) return next(new Error("Input chainName or storeName does not exist"));
        return res.status(201)
                  .json({ success: true });
    });
};

const signUpManager = async (req, res, next) => {
    let sql = `CALL register_manager(?,?,?,?,?,?,?,?,?)`;
    const { username, password, fname, lname, street, city, state, zipcode, chainName } = req.body;
    pool.query(sql, [username, password, fname, lname, street, city, state, zipcode, chainName], (err, result) => {
        if (err) {
            return next(new Error("Incorrect chain name or chainname has already been assigned a manager"));
        }
        return res.status(201)
                  .json({ success: true });
    });
};

const login = async (req, res, next) => {
    let sql = `CALL user_login(?,?)`;
    const { username, password } = req.body;
    pool.query(sql, [username, password], (err, result) => {
        if (err) return next(err);
        let count = result[0][0]["count"];
        if (count == 1) {
            return res.status(201)
                  .json({success: true});
        } else {
            return next(new Error("Wrong Credentials"));
        }
    });
};

exports.signupCustomer = signupCustomer;
exports.signupDroneTech = signupDroneTech;
exports.signUpManager = signUpManager;
exports.login = login;
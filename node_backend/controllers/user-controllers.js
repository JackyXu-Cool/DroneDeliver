const pool = require("../database");

const signup = async (req, res, next) => {
    let sql = `CALL register_customer(?,?,?,?,?,?,?,?,?,?,?)`;
    const { username, password, fname, lname, street, city, state, zipcode, ccnumber, cvv, exp_date } = req.body;
    pool.query(sql, [username, password, fname, lname, street, city, state, zipcode, ccnumber, cvv, exp_date], (err, result) => {
        if (err) throw err;
        return res.status(201)
                  .json({success: true});
    })
};

const login = async (req, res, next) => {

};

exports.signup = signup;
exports.login = login;
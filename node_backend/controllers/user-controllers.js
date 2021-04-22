const pool = require("../database");

const signup = async (req, res, next) => {
    let sql = `CALL register_customer(?,?,?,?,?,?,?,?,?,?,?)`;
    const { username, password, fname, lname, street, city, state, zipcode, ccnumber, cvv, exp_date } = req.body;
    pool.query(sql, [username, password, fname, lname, street, city, state, zipcode, ccnumber, cvv, exp_date], (err, result) => {
        if (err) return next(err);
        return res.status(201)
                  .json({success: true});
    })
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

exports.signup = signup;
exports.login = login;
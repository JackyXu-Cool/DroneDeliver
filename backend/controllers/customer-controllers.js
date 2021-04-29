const pool = require("../database");
const HttpError = require("../model/http-error");

const get_customer_full_name = async (req, res, next) => {
    const { username } = req.body;
    let sql = `select FirstName, LastName from USERS join CUSTOMER on USERS.Username = CUSTOMER.Username where CUSTOMER.Username = '${username}'`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(200).json({response: result});
    })
};

exports.get_customer_full_name = get_customer_full_name;

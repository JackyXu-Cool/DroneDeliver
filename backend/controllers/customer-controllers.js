const pool = require("../database");
const HttpError = require("../model/http-error");

const get_customer_full_name = async (req, res, next) => {
    const { username } = req.query;
    let sql = `select FirstName, LastName from USERS join CUSTOMER on USERS.Username = CUSTOMER.Username where CUSTOMER.Username = '${username}'`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(200).json({FirstName: result[0]["FirstName"], LastName: result[0]["LastName"]});
    })
};

const change_credit_card_info = async (req, res, next) => {
    const { username, ccNumber, cvv, exp_date } = req.body;

    let sql = `call customer_change_credit_card_information(?,?,?,?)`
    pool.query(sql, [username, ccNumber, cvv, exp_date], (err) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(201).json({success: true});
    })
};

exports.get_customer_full_name = get_customer_full_name;
exports.change_credit_card_info = change_credit_card_info;
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

const get_order_ids_by_customer = async (req, res, next) => {
    const { username } = req.query;
    let sql = `select ID from ORDERS where CustomerUsername='${username}'`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(200).json({res: result});
    })
};

const get_order_info = async (req, res, next) => {
    let sql = `call customer_view_order_history(?,?)`;
    let { username, orderId } = req.query;

    pool.query(sql, [ username, orderId ], (err) => {
        if (err) return next(new HttpError("Fail to get order information", 500));

        // Select from manager_view_drones_result table
        pool.query("select * from customer_view_order_history_result", (err, r) => {
            if (err) return next(new HttpError("Fail to select table", 500));
            res.status(200).json({result: r});
        });
    })
}

exports.get_customer_full_name = get_customer_full_name;
exports.change_credit_card_info = change_credit_card_info;
exports.get_order_ids_by_customer = get_order_ids_by_customer;
exports.get_order_info = get_order_info;
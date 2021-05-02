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
};

const view_store_item = async (req, res, next) => {
    let sql = `CALL customer_view_store_items(?,?,?,?)`;
    let { username, chainName, storeName, type } = req.query;
    chainName = chainName.replace("-", " ");
    storeName = storeName.replace("-", " ");
    pool.query(sql, [username, chainName, storeName, type], (err) => {
        if (err) return next(new HttpError(err.message, 500));
        pool.query("select * from customer_view_store_items_result", (err, result) => {
            if (err) return next(new HttpError(err.message, 500));
            res.status(200).json({result});
        });
    });
};

const pre_place_order = async (req, res, next) => {
    let sql = `call customer_select_items(?,?,?,?,?)`;
    let { username, chainName, storeName, itemName, quantity } = req.body;
    pool.query(sql, [username, chainName, storeName, itemName, quantity], (err) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(201).json({ success: true });
    })
};

const review_order = async (req, res, next) => {
    let sql = `CALL customer_review_order(?)`;
    let { username } = req.query;
    pool.query(sql, [username], (err) => {
        if (err) return next(new HttpError(err.message, 500));
        pool.query('SELECT * FROM grocery_drone_delivery.customer_review_order_result', (err, result) => {
            if (err) return next(new HttpError(err.message, 500));
            res.status(200).json({result});
        });
    });
};

const update_order = async (req, res, next) => {
    let { username, itemName, quantity } = req.body;
    let sql = `CALL customer_update_order(?,?,?)`;
    pool.query(sql, [username, itemName, quantity], (err) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(201).json({ success: true });
    })
};

const confirm_order = async (req, res, next) => {
    let { username } = req.body;
    let sql = `call order_confirm(?)`;
    pool.query(sql, [username], (err) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(201).json({ success: true });
    })
};

const get_chain_in_zipcode = async (req, res, next) => {
    const { zipcode } = req.query;
    let sql = `select distinct chainName from store where zipcode = ${zipcode}`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(200).json({ result });
    })
};

const get_store_in_zipcode = async (req, res, next) => {
    const { zipcode, chainName } = req.query;
    let sql = `select distinct storeName from store where zipcode = ${zipcode} and chainName="${chainName}"`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(200).json({ result });
    })
}

const get_zipcode = async(req, res, next) => {
    let { username } = req.query;
    let sql = `select zipcode from users where username = "${username}"`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(200).json({ zip: result[0]["zipcode"] });
    });
}

exports.get_customer_full_name = get_customer_full_name;
exports.change_credit_card_info = change_credit_card_info;
exports.get_order_ids_by_customer = get_order_ids_by_customer;
exports.get_order_info = get_order_info;
exports.view_store_item = view_store_item;
exports.pre_place_order = pre_place_order;
exports.review_order = review_order;
exports.update_order = update_order;
exports.confirm_order = confirm_order;
exports.get_chain_in_zipcode = get_chain_in_zipcode;
exports.get_zipcode = get_zipcode;
exports.get_store_in_zipcode = get_store_in_zipcode;
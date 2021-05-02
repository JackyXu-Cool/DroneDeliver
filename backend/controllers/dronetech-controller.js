const pool = require("../database");
const HttpError = require("../model/http-error");

const get_order_details = async (req, res, next) => {
    const username = req.query.username;
    const id = req.query.id;
    let getOrderInfo = `CALL dronetech_order_details(?, ?)`;
    let getItemInfo = `CALL dronetech_order_items(?, ?)`;
    let orderDetails = {};
    pool.query(getOrderInfo, [username, id], (err) => {
        if (err) return next(new HttpError("Fail to get order information", 500));
        pool.query(getItemInfo, [username, id], (err) => {
            if (err) return next(new HttpError("Fail to get item details", 500));
            pool.query("select * from dronetech_order_details_result", (err, result) => {
                if (err) return next(new HttpError("Fail to select table", 500));
                orderDetails = result[0];
                pool.query("select * from dronetech_order_items_result", (err, result) => {
                    if (err) return next(new HttpError("Fail to select table", 500));
                    orderDetails["Items"] = result;
                    res.status(200).json({Details: orderDetails});
                });
            });
        });
    })
};

const view_drones = async (req, res, next) => {
    const username = req.query.username;
    const id = req.query.id === undefined ? null : req.query.id;
    const status = req.query.status === undefined ? null : req.query.id;
    let sql = `CALL dronetech_assigned_drones(?, ?, ?)`;
    pool.query(sql, [username, id, status], (err, result) => {
        if (err) return next(HttpError("Cannot get drones information", 500));
        pool.query("select * from dronetech_assigned_drones_result", (err, result) => {
            if (err) return next(HttpError("Cannot select table", 500));
            res.status(200).json({result});
        })
    });
}

exports.get_order_details = get_order_details;
exports.view_drones = view_drones;
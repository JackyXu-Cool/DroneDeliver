const { end } = require("../database");
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
    const id = req.query.id === "" ? null : parseInt(req.query.id, 10);
    const status = (req.query.status === "" || req.query.status === "None") ? null : req.query.status;
    let sql = `CALL dronetech_assigned_drones(?, ?, ?)`;
    pool.query(sql, [username, id, status], (err, result) => {
        if (err) return next(HttpError("Cannot get drones information", 500));
        pool.query("select * from dronetech_assigned_drones_result", (err, result) => {
            if (err) return next(HttpError("Cannot select table", 500));
            res.status(200).json({result});
        })
    });
};

const view_store_orders = async (req, res, next) => {
    let sql = 'CALL drone_technician_view_order_history(?,?,?)';
    const { username, startDate, endDate } = req.query;
    pool.query(sql, [username, startDate, endDate], (err) => {
        if (err) return next(new HttpError(err.message, 500));
        pool.query("SELECT * FROM drone_technician_view_order_history_result", (err, result) => {
            if (err) return next(new HttpError(err.message, 500));
            res.status(200).json({ result });
        });
    });
};

const assign_drone_tech = async (req, res, next) => {
    const { username, droneid, status, orderid } = req.body;
    let sql = `CALL dronetech_assign_order(?,?,?,?)`;
    pool.query(sql, [username, droneid, status, orderid], (err) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(201).json({ success: true });
    });
};

const get_available_drones = async (req, res, next) => {
    const { username } = req.query;
    let sql = `select id from drone where DroneTech = "${username}" and dronestatus = "Available"`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        availableDrones = []
        result.forEach(r => {
            availableDrones.push(r["id"]);
        })
        res.status(200).json({ dronesId: availableDrones });
    })
};

exports.get_order_details = get_order_details;
exports.view_drones = view_drones;
exports.view_store_orders = view_store_orders;
exports.assign_drone_tech = assign_drone_tech;
exports.get_available_drones = get_available_drones;
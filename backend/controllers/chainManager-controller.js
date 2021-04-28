const pool = require("../database");
const HttpError = require("../model/http-error");

const create_chain_item = async (req, res, next) => {
    let sql = `CALL manager_create_chain_item(?,?,?,?,?,?)`;
    const { chainName, itemName, quantity, orderLimit, PLU, price } = req.body;
    pool.query(sql, [chainName, itemName, quantity, orderLimit, PLU, price], (err) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(201).json({success: true});
    })
};

const get_all_items = async (req, res, next) => {
    let sql = `select itemName from item`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        items = []
        result.forEach(r => {
            items.push(r["itemName"]);
        });
        res.status(200).json({items});
    })
};

// Get auto incremented PLU
const get_PLU = async (req, res, next) => {
    let sql = `select max(plunumber) from chain_item`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        let new_plu = result[0]["max(plunumber)"] + 1; 
        res.status(200).json({plu: new_plu});
    })
};

exports.create_chain_item = create_chain_item;
exports.get_all_items = get_all_items;
exports.get_PLU = get_PLU;
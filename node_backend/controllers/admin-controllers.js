const pool = require("../database");

const create_grocery_chain = async (req, res, next) => {
    let sql = `CALL admin_create_grocery_chain(?)`;
    const { chainName } = req.body;
    pool.query(sql, [chainName], (err) => {
        if (err) return next(new Error("Fail to create new grocery chain (chain name already exists)"));
        return res.status(201).json({ success: true });
    })
};

const create_store = async (req, res, next) => {
    let sql = `CALL admin_create_new_store(?,?,?,?,?,?)`;
    const { storeName, chainName, street, city, state, zipcode } = req.body;
    pool.query(sql, [storeName, chainName, street, city, state, zipcode], (err) => {
        if (err) return next(new Error("A chain cannot have two stores in the same zip code"));
        return res.status(201).json({ success: true });
    });
};

exports.create_grocery_chain = create_grocery_chain;
exports.create_store = create_store;

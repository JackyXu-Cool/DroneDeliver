const pool = require("../database");
const HttpError = require("../model/http-error");

const create_grocery_chain = async (req, res, next) => {
    let sql = `CALL admin_create_grocery_chain(?)`;
    const { chainName } = req.body;
    pool.query(sql, [chainName], (err) => {
        if (err) return next(new HttpError("Fail to create new grocery chain (chain name already exists)", 401));
        res.status(201).json({ success: true });
    })
};

const get_all_chains = async (req, res, next) => {
    let sql = `select * from chain`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError("Fail to get all chains", 500));
        list = []
        result.forEach(r => {
            list.push(r["ChainName"])
        });
        res.status(200).json({chainList: list});
    })
}

const create_store = async (req, res, next) => {
    let sql = `CALL admin_create_new_store(?,?,?,?,?,?)`;
    const { storeName, chainName, street, city, state, zipcode } = req.body;
    pool.query(sql, [storeName, chainName, street, city, state, zipcode], (err) => {
        if (err) return next(new HttpError("A chain cannot have two stores in the same zip code", 401));
        res.status(201).json({ success: true });
    });
};

const create_drone = async (req, res, next) => {
    const { id, zipcode, radius, dronetech } = req.body;
    let sql = `CALL admin_create_drone(?,?,?,?)`;
    pool.query(sql, [id, zipcode, radius, dronetech], (err) => {
        if (err) return next(new HttpError("Wrong zipcode or dronetech information. Fail to create new drone", 401));
        res.status(201).json({success: true});
    });
};

// This path is to get zip codes of existing store locations.
const get_zipcode = async (req, res, next) => {
    let sql = `select zipcode from store`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        zipcodeList = [];
        for (let i = 0; i < result.length; i++) {
            zipcodeList.push(result[i]["zipcode"]);
        }
        res.status(200).json({ result: zipcodeList });
    });
};

// Get a list of employee's username who works for a store in the given zipcode
const get_usernames_for_store = async (req, res, next) => {
    const { zipcode } = req.body;
    let sql =  `select username from drone_tech where (storename, chainname) in
    (select storename, chainname from store where zipcode = ${zipcode})`
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        usernamesList = [];
        result.forEach(r => {
            usernamesList.push(r["username"]);
        })
        res.status(200).json({ result: usernamesList });
    })
};

// Get the auto incremented ID for drone table
const get_drone_id = async (req, res, next) => {
    let sql = `SELECT MAX(id) from drone`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError("Fail to get drone id", 500));
        res.status(200).json({id: result[0]["MAX(id)"]+1});
    })
};

const create_item = async (req, res, next) => {
    let sql = `CALL admin_create_item(?,?,?,?)`;
    const { itemName, type, organic, origin } = req.body;
    pool.query(sql, [itemName, type, organic, origin], (err) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(201).json({success: true});
    });
};

const view_customers = async (req, res, next) => {
    let sql = `CALL admin_view_customers(?,?)`;
    let { firstName, lastName } = req.body;

    if (firstName === "") firstName = null;
    if (lastName === "") lastName = null;

    // Create admin_view_customers_result table to store information
    pool.query(sql, [firstName, lastName], (err) => {
        if (err) return next(new HttpError("Fail to get customer information", 500));

        // Select from admin_view_customer_result table
        pool.query("select * from admin_view_customers_result", (err, r) => {
            if (err) return next(new HttpError("Fail to select table", 500));
            res.status(200).json({result: r});
        });
    })
};

exports.create_grocery_chain = create_grocery_chain;
exports.get_all_chains = get_all_chains;
exports.create_store = create_store;
exports.create_drone = create_drone;
exports.get_zipcode = get_zipcode;
exports.get_usernames_for_store = get_usernames_for_store;
exports.get_drone_id = get_drone_id;
exports.create_item = create_item;
exports.view_customers = view_customers;
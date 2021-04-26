const { response } = require("express");
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

const create_drone = async (req, res, next) => {

};

// This path is to get zip codes of existing store locations.
const get_zipcode = async (req, res, next) => {
    let sql = `select zipcode from store`;
    pool.query(sql, (err, result) => {
        if (err) return next(new Error("Fail to get zipcode"));
        zipcodeList = [];
        for (let i = 0; i < result.length; i++) {
            zipcodeList.push(result[i]["zipcode"]);
        }
        res.status(200).json({ result: zipcodeList });
    });
};

// Get a list of employee's username who works for a store in the given zipcode
const get_usernamem_for_store = async (req, res, next) => {
    const { zipcode } = req.body;
    let sql =  `select username from drone_tech where (storename, chainname) in
    (select storename, chainname from store where zipcode = ${zipcode})`
    pool.query(sql, (err, result) => {
        if (err) return next(new Error("Fail to get usernames"));
        usernamesList = [];
        result.forEach(r => {
            usernamesList.push(r["username"]);
        })
        res.status(200).json({ result: usernamesList });
    })
};

exports.create_grocery_chain = create_grocery_chain;
exports.create_store = create_store;
exports.create_drone = create_drone;
exports.get_zipcode = get_zipcode;
exports.get_usernamem_for_store = get_usernamem_for_store;
const pool = require("../database");
const HttpError = require("../model/http-error");

const create_chain_item = async (req, res, next) => {
  let sql = `CALL manager_create_chain_item(?,?,?,?,?,?)`;
  const { chainName, itemName, quantity, orderLimit, PLU, price } = req.body;
  pool.query(
    sql,
    [chainName, itemName, quantity, orderLimit, PLU, price],
    (err) => {
      if (err) return next(new HttpError(err.message, 500));
      res.status(201).json({ success: true });
    }
  );
};

const get_all_items = async (req, res, next) => {
  let sql = `select itemName from item`;
  pool.query(sql, (err, result) => {
    if (err) return next(new HttpError(err.message, 500));
    items = [];
    result.forEach((r) => {
      items.push(r["itemName"]);
    });
    res.status(200).json({ items });
  });
};

// Get auto incremented PLU
const get_PLU = async (req, res, next) => {
  let sql = `select max(plunumber) from chain_item`;
  pool.query(sql, (err, result) => {
    if (err) return next(new HttpError(err.message, 500));
    let new_plu = result[0]["max(plunumber)"] + 1;
    res.status(200).json({ plu: new_plu });
  });
};

const get_filtered_drones = async (req, res, next) => {
  let sql = `call manager_view_drones(?,?,?)`;
  let { username, droneID, radius } = req.query;

  droneID = droneID === "" ? null : parseInt(droneID, 10);
  radius = radius === "" ? null : parseInt(radius, 10);

  pool.query(sql, [username, droneID, radius], (err) => {
    if (err)
      return next(new HttpError("Fail to get customer information", 500));

    // Select from manager_view_drones_result table
    pool.query("select * from manager_view_drones_result", (err, r) => {
      if (err) return next(new HttpError("Fail to select table", 500));
      res.status(200).json({ result: r });
    });
  });
};

// Manager view drone technicians
const view_drone_technicians = async (req, res, next) => {
  let sql = `CALL manager_view_drone_technicians(?,?,?)`;
  const { chainName, droneTech, storeName } = req.query;
  pool.query(sql, [chainName, droneTech, storeName], (err, result) => {
    if (err) return next(new HttpError(err.message, 500));

    // Select from manager_view_drone_technicians_result table
    pool.query(
      "select * from manager_view_drone_technicians_result",
      (err, r) => {
        if (err) return next(new HttpError("Fail to select table", 500));
        res.status(200).json({ result: r });
      }
    );
  });
};

// Manager manage stores
const get_stores_by_manager = async (req, res, next) => {
  const { username } = req.query;
  let sql = `select MANAGER.ChainName, StoreName from MANAGER left join STORE on MANAGER.ChainName = STORE.ChainName where MANAGER.username = '${username}';`;
  pool.query(sql, (err, result) => {
    if (err) return next(new HttpError(err.message, 500));
    res.status(200).json({ res: result });
  });
};

const manage_stores = async (req, res, next) => {
  let sql = `CALL manager_manage_stores(?,?,?,?)`;
  let { userName, storeName, minTotal, maxTotal } = req.query;

  storeName = storeName === "All" || storeName === "" ? null : storeName;
  minTotal = minTotal === "" ? null : parseInt(minTotal, 10);
  maxTotal = maxTotal === "" ? null : parseInt(maxTotal, 10);

  pool.query(sql, [userName, storeName, minTotal, maxTotal], (err, result) => {
    if (err) return next(new HttpError(err.message, 500));

    //Select from manager_manage_stores_result
    pool.query("select * from manager_manage_stores_result", (err, r) => {
      if (err) return next(new HttpError("Fail to select table", 500));
      res.status(200).json({ result: r });
    });
  });
};

exports.create_chain_item = create_chain_item;
exports.get_all_items = get_all_items;
exports.get_PLU = get_PLU;
exports.get_filtered_drones = get_filtered_drones;
exports.view_drone_technicians = view_drone_technicians;
exports.get_stores_by_manager = get_stores_by_manager;
exports.manage_stores = manage_stores;

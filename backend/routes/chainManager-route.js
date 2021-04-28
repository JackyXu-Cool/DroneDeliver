const express = require("express");
const chainManagerRoute = require("../controllers/chainManager-controller");

const router = express.Router();

router.post("/create/chainItem", chainManagerRoute.create_chain_item);
router.get("/get/items", chainManagerRoute.get_all_items);
router.get("/get/plu", chainManagerRoute.get_PLU);

module.exports = router;
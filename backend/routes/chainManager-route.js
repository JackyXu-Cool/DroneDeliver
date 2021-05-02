const express = require("express");
const chainManagerRoute = require("../controllers/chainManager-controller");

const router = express.Router();

router.post("/create/chainItem", chainManagerRoute.create_chain_item);
router.get("/get/items", chainManagerRoute.get_all_items);
router.get("/get/plu", chainManagerRoute.get_PLU);
router.get("/get/filteredDrones", chainManagerRoute.get_filtered_drones)
router.get("/view/technicians", chainManagerRoute.view_drone_technicians);
router.get("/get/stores", chainManagerRoute.get_stores_by_manager)
router.get("/manage/stores", chainManagerRoute.manage_stores);

module.exports = router;

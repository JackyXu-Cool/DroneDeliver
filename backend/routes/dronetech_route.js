const express = require("express");
const dronetechController = require("../controllers/dronetech-controller");

const router = express.Router();
router.get("/get/order/details", dronetechController.get_order_details);
router.get("/view/drones", dronetechController.view_drones);
router.get("/view/store/drones", dronetechController.view_store_orders);
router.post("/assign/drontech", dronetechController.assign_drone_tech);
router.get("/get/available/drones", dronetechController.get_available_drones);

module.exports = router;
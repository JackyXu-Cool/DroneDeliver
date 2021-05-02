const express = require("express");
const dronetechController = require("../controllers/dronetech-controller");

const router = express.Router();
router.get("/get/order/details", dronetechController.get_order_details);
router.get("/view/drones", dronetechController.view_drones);

module.exports = router;
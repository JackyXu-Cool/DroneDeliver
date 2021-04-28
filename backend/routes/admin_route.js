const express = require("express");
const adminController = require("../controllers/admin-controllers");

const router = express.Router();

router.post("/create/grocerychain", adminController.create_grocery_chain);
router.post("/create/store", adminController.create_store);
router.post("/create/drone", adminController.create_drone);
router.get("/get/zipcode", adminController.get_zipcode);
router.get("/get/usernameforstore", adminController.get_usernamem_for_store);
router.get("/get/droneid", adminController.get_drone_id);
router.post("/create/item", adminController.create_item);
router.get("/view/customers", adminController.view_customers);

module.exports = router;


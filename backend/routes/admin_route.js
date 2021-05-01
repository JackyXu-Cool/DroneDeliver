const express = require("express");
const adminController = require("../controllers/admin-controllers");

const router = express.Router();

router.post("/create/grocerychain", adminController.create_grocery_chain);
router.get("/get/chains", adminController.get_all_chains);
router.post("/create/store", adminController.create_store);
router.post("/create/drone", adminController.create_drone);
router.get("/get/zipcode", adminController.get_zipcode);
router.post("/get/usernameforstore", adminController.get_usernames_for_store);
router.get("/get/droneid", adminController.get_drone_id);
router.post("/create/item", adminController.create_item);
router.get("/view/customers", adminController.view_customers);

module.exports = router;


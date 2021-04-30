const express = require("express");
const customerController = require("../controllers/customer-controllers");

const router = express.Router();

router.get("/get/userfullname", customerController.get_customer_full_name);
router.post("/change/ccinfo", customerController.change_credit_card_info);

module.exports = router;
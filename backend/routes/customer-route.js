const express = require("express");
const customerController = require("../controllers/customer-controllers");

const router = express.Router();

router.get("/get/userfullname", customerController.get_customer_full_name);
router.post("/change/ccinfo", customerController.change_credit_card_info);
router.get("/get/orderIDs", customerController.get_order_ids_by_customer);
router.get("/get/orderInfo", customerController.get_order_info);
router.get("/view/store/items", customerController.view_store_item);
router.post("/preplace/order", customerController.pre_place_order);
router.get("/review/order", customerController.review_order);
router.post("/update/order", customerController.update_order);
router.post("/confirm/order", customerController.confirm_order);
router.get("/get/chain", customerController.get_chain_in_zipcode);
router.get("/get/zipcode", customerController.get_zipcode);
router.get("/get/store", customerController.get_store_in_zipcode);
router.delete("/cancel/order", customerController.cancel_order);

module.exports = router;
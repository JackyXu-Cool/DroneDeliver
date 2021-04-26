const express = require("express");
const adminController = require("../controllers/admin-controllers");

const router = express.Router();

router.post("/create/grocerychain", adminController.create_grocery_chain);
router.post("/create/store", adminController.create_store);

module.exports = router;


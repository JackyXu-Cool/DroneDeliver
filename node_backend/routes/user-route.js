const express = require("express");
const userController = require("../controllers/user-controllers");

const router = express.Router();

router.post("/login", userController.login);

router.post("/register/customer", userController.signupCustomer);

router.post("/register/manager", userController.signUpManager);

router.post("/register/dronetech", userController.signupDroneTech);

module.exports = router;
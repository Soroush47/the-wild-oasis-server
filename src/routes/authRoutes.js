const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/sign-up", authController.signupUser);

router.post("/log-in", authController.loginUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/sign-up", authController.signupUser);

router.post("/log-in", authController.loginUser);

router.post("/refresh", authController.refreshToken);

router.get("/me", authMiddleware, authController.getMe);

router.patch("/update/:id", authController.updateUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const { preventDemoChanges } = require("../middlewares/preventDemoChanges");

router.post("/sign-up", preventDemoChanges, authController.signupUser);

router.post("/log-in", authController.loginUser);

router.post("/refresh", authController.refreshToken);

router.get("/me", authMiddleware, authController.getMe);

router.patch("/update/:id", preventDemoChanges, authController.updateUser);

module.exports = router;

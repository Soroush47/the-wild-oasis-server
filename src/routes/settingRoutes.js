const express = require("express");
const settingController = require("../controllers/settingController");
const router = express.Router();

// Get settings
router.get("/", settingController.getAllSettings);

router.patch("/", settingController.updateSettings);

module.exports = router;

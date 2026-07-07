const express = require("express");
const settingController = require("../controllers/settingController");
const { preventDemoChanges } = require("../middlewares/preventDemoChanges");
const router = express.Router();

// Get settings
router.get("/", settingController.getAllSettings);

router.patch("/", preventDemoChanges, settingController.updateSettings);

module.exports = router;

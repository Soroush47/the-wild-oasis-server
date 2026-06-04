const express = require("express");
const idsController = require("../controllers/idsController");
const router = express.Router();

router.get("/", idsController.getIds);

module.exports = router;

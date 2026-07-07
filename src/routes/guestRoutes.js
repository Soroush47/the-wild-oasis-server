const express = require("express");
const guestController = require("../controllers/guestController");
const { preventDemoChanges } = require("../middlewares/preventDemoChanges");
const router = express.Router();

router.get("/", guestController.getAllGuests);

// DELETE all guests
router.delete("/delete-all", preventDemoChanges, guestController.deleteAllGuests);

// POST create many guests
router.post("/create-many", preventDemoChanges, guestController.createManyGuests);

module.exports = router;

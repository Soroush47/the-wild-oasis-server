const express = require("express");
const guestController = require("../controllers/guestController");
const router = express.Router();

router.get("/", guestController.getAllGuests);

// DELETE all guests
router.delete("/delete-all", guestController.deleteAllGuests);

// POST create many guests
router.post("/create-many", guestController.createManyGuests);

module.exports = router;

const express = require("express");
const bookingController = require("../controllers/bookingController");
const router = express.Router();

// GET all booking
router.get("/", bookingController.getAllBookings);

//Delete all bookings
router.delete("/delete-all", bookingController.deleteAllBookings);

//Create many bookings
router.post("/create-many", bookingController.createManyBookings);

module.exports = router;

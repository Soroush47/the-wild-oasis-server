const express = require("express");
const bookingController = require("../controllers/bookingController");
const router = express.Router();

// GET all booking
router.get("/", bookingController.getAllBookings);

// Delete all bookings
router.delete("/delete-all", bookingController.deleteAllBookings);

// Create many bookings
router.post("/create-many", bookingController.createManyBookings);

// Get bookings after date
router.get("/after-date", bookingController.getBookingsAfterDate);

// Get stays after date
router.get("/stays-after-date", bookingController.getStaysAfterDate);

// Get stays today activity
router.get("/stays-today-activity", bookingController.getStaysTodayActivity);

// Get one booking
router.get("/:id", bookingController.getBooking);

// Update Booking
router.patch("/:id", bookingController.updateBooking);

// Delete Booking
router.delete("/:id", bookingController.deteleBooking);

module.exports = router;

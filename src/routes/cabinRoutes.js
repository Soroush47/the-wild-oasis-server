const express = require("express");
const cabinController = require("../controllers/cabinController");
const router = express.Router();

// GET all cabins
router.get("/", cabinController.getAllCabins);

// DELETE all cabins
router.delete("/delete-all", cabinController.deleteAllCabins);

// POST create many cabins
router.post("/create-many", cabinController.createManyCabins);

// POST create a new cabin
router.post("/", cabinController.createCabin);

// DELETE cabin by ID
router.delete("/:id", cabinController.deleteCabin);

// PATCH update cabin by ID
router.patch("/:id", cabinController.updateCabin);

module.exports = router;

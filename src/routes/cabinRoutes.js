const express = require("express");
const cabinController = require("../controllers/cabinController");
const { preventDemoChanges } = require("../middlewares/preventDemoChanges");
const router = express.Router();

// GET all cabins
router.get("/", cabinController.getAllCabins);

// DELETE all cabins
router.delete("/delete-all", preventDemoChanges, cabinController.deleteAllCabins);

// POST create many cabins
router.post("/create-many", preventDemoChanges, cabinController.createManyCabins);

// POST create a new cabin
router.post("/", preventDemoChanges, cabinController.createCabin);

// DELETE cabin by ID
router.delete("/:id", preventDemoChanges, cabinController.deleteCabin);

// PATCH update cabin by ID
router.patch("/:id", preventDemoChanges, cabinController.updateCabin);

module.exports = router;

const cabinService = require("../services/cabinService");

exports.getAllCabins = async (req, res, next) => {
    try {
        const cabins = await cabinService.findAllCabins();
        res.status(200).json(cabins);
    } catch (error) {
        error.status = 500; // Set a default status for service errors
        next(error); // Pass error to the global error handler
    }
};

exports.deleteAllCabins = async (req, res, next) => {
    try {
        const result = await cabinService.deleteAllCabins();
        res.status(200).json({ message: `Successfully deleted ${result.count} cabins.` });
    } catch (error) {
        error.status = 500;
        next(error);
    }
};

exports.createManyCabins = async (req, res, next) => {
    try {
        const result = await cabinService.createManyCabins(req.body);
        res.status(201).json({ message: `Successfully created ${result.count} cabins.` });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.createCabin = async (req, res, next) => {
    const { name, maxCapacity, regularPrice, discount, description, image } = req.body;
    if (!name || !maxCapacity || !regularPrice || !description || !image) {
        return res
            .status(400)
            .json({ message: "Missing required fields for cabin creation" });
    }

    const cabinData = {
        name,
        maxCapacity: Number(maxCapacity),
        regularPrice: Number(regularPrice),
        discount: Number(discount) || 0, // Default discount to 0 if not provided
        description,
        image,
    };

    try {
        const newCabin = await cabinService.createCabin(cabinData);
        res.status(201).json(newCabin);
    } catch (error) {
        error.status = error.code === "P2002" ? 409 : 400; // P2002 is for unique constraint violation
        next(error);
    }
};

exports.deleteCabin = async (req, res, next) => {
    const cabinId = parseInt(req.params.id);
    if (isNaN(cabinId)) {
        return res.status(400).json({ message: "Invalid cabin ID" });
    }
    try {
        console.log({ cabinId });
        const deletedCabin = await cabinService.deleteCabin(cabinId);
        res.status(200).json({
            message: `Cabin with ID ${cabinId} deleted successfully.`,
            deletedCabin,
        });
    } catch (error) {
        if (error.code === "P2025") {
            // Record not found
            error.status = 404;
        } else {
            error.status = 400;
        }
        next(error);
    }
};

exports.updateCabin = async (req, res, next) => {
    const cabinId = parseInt(req.params.id);
    const updatedData = req.body;

    if (isNaN(cabinId)) {
        return res.status(400).json({ message: "Invalid cabin ID" });
    }

    // Optional: Add validation for updatedData fields if needed
    if (updatedData.maxCapacity)
        updatedData.maxCapacity = Number(updatedData.maxCapacity);
    if (updatedData.regularPrice)
        updatedData.regularPrice = Number(updatedData.regularPrice);
    if (updatedData.discount) updatedData.discount = Number(updatedData.discount);

    try {
        const updatedCabin = await cabinService.updateCabin(cabinId, updatedData);
        res.status(200).json(updatedCabin);
    } catch (error) {
        if (error.code === "P2025") {
            // Record not found
            error.status = 404;
        } else {
            error.status = 400;
        }
        next(error);
    }
};

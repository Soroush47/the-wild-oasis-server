const guestService = require("../services/guestService");
const cabinService = require("../services/cabinService");

exports.getIds = async (req, res, next) => {
    try {
        const [guestIds, cabinIds] = await Promise.all([
            guestService.getGuestIds(),
            cabinService.getCabinIds(),
        ]);
        res.status(200).json([guestIds, cabinIds]);
    } catch (error) {
        error.status = 500; // Set a default status for service errors
        next(error); // Pass error to the global error handler
    }
};

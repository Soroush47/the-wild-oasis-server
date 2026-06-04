const bookingService = require("../services/bookingService");

exports.getAllBookings = async (req, res, next) => {
    try {
        const { status, sortBy } = req.query;

        // filter
        const where = {};
        if (status) {
            where.status = status;
        }

        // sort
        const orderBy = {};
        if (sortBy) {
            const [field, direction] = sortBy.split("-");
            orderBy[field] = direction;
        } else {
            orderBy.id = "asc";
        }

        const bookings = await bookingService.findAllBookings(where, orderBy);
        res.status(200).json(bookings);
    } catch (error) {
        if (!error.status) {
            error.status = 500;
        }
        next(error);
    }
};

exports.deleteAllBookings = async (req, res, next) => {
    try {
        const result = await bookingService.deleteAllBookings();
        res.status(200).json({
            message: `Successfully deleted ${result.count} bookings.`,
        });
    } catch (error) {
        error.status = 500;
        next(error);
    }
};

exports.createManyBookings = async (req, res, next) => {
    try {
        const result = await bookingService.createManyBookings(req.body);
        res.status(201).json({
            message: `Successfully created ${result.count} bookings.`,
        });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

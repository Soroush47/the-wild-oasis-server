const bookingService = require("../services/bookingService");

exports.getAllBookings = async (req, res, next) => {
    try {
        const { status, sortBy, page = 1, limit = 10 } = req.query;

        // pagination
        const skip = (page - 1) * limit;

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

        const [bookings, count] = await bookingService.findAllBookings(
            where,
            orderBy,
            skip,
            limit,
        );

        res.status(200).json({ bookings, count });
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

exports.getBooking = async (req, res, next) => {
    const bookingId = parseInt(req.params.id);
    try {
        const result = await bookingService.getBooking(bookingId);
        res.status(200).json(result);
    } catch (error) {
        if (!error.status) {
            error.status = 500;
        }
        next(error);
    }
};

exports.updateBooking = async (req, res, next) => {
    const bookingId = parseInt(req.params.id);
    const obj = req.body;
    try {
        const updatedBooking = await bookingService.updateBooking(bookingId, obj);
        res.status(200).json(updatedBooking);
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

exports.deteleBooking = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const deletedBooking = await bookingService.deleteBooking(id);
        res.status(200).json({
            message: `Booking with ID ${id} deleted successfully.`,
            deletedBooking,
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

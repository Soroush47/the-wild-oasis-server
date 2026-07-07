const guestService = require("../services/guestService");

exports.getAllGuests = async (req, res, next) => {
    try {
        const guests = await guestService.findAllGuests();
        res.status(200).json(guests);
    } catch (error) {
        error.status = 500;
        next(error);
    }
};

exports.deleteAllGuests = async (req, res, next) => {
    try {
        const result = await guestService.deleteAllGuests();
        res.status(200).json({ message: `Successfully deleted ${result.count} guests.` });
    } catch (error) {
        error.status = 500;
        next(error);
    }
};

exports.createManyGuests = async (req, res, next) => {
    // console.log(req.body);
    try {
        const result = await guestService.createManyGuests(req.body);
        res.status(201).json({ message: `Successfully created ${result.count} guests.` });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

const settingService = require("../services/settingService");

exports.getAllSettings = async (req, res, next) => {
    try {
        const settings = await settingService.findAllSettings();
        res.status(200).json(settings[0]);
    } catch (error) {
        error.status = 500;
        next(error);
    }
};

exports.updateSettings = async (req, res, next) => {
    const data = req.body;
    try {
        const updatedSettings = await settingService.updateSettings(data);
        res.status(200).json(updatedSettings);
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

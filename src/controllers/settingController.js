const settingService = require('../services/settingService');

exports.getAllSettings = async (req, res, next) => {
    try {
        const settings = await settingService.findAllSettings();
        res.status(200).json(settings);
    } catch (error) {
        error.status = 500;
        next(error);
    }
};
const express = require('express');
const settingController = require('../controllers/settingController');
const router = express.Router();

router.get('/', settingController.getAllSettings);

module.exports = router;
const express = require('express');
const router = express.Router();
const translateController = require('../controllers/translateController');

router.post('/translate-to-sql', translateController.translateToSQL);

module.exports = router;

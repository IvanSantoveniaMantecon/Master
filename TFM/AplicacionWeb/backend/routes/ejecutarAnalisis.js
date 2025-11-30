const express = require('express');
const router = express.Router();
const { ejecutarAnalisis } = require('../controllers/ejecutarAnalisisController');

router.post('/ejecutar-analisis', ejecutarAnalisis);

module.exports = router;

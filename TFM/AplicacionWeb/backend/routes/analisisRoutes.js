// backend/routes/analisisRoutes.js
const express = require('express');
const analisisController = require('../controllers/analisisController');
const router = express.Router();

// Rutas CRUD para análisis
router.get('/analisis', analisisController.getAnalisis);            // Obtener todos los análisis
router.get('/analisis/:id', analisisController.getAnalisisById);   // Obtener un análisis por ID
router.post('/analisis', analisisController.createAnalisis);       // Crear un nuevo análisis
router.put('/analisis/:id', analisisController.updateAnalisis);    // Actualizar un análisis por ID
router.delete('/analisis/:id', analisisController.deleteAnalisis); // Eliminar un análisis por ID

module.exports = router;

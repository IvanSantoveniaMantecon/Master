// backend/routes/respuestasSinFrecuenciaRoutes.js
const express = require('express');
const respuestasSinFrecuenciaController = require('../controllers/respuestasSinFrecuenciaController');
const router = express.Router();

// Rutas CRUD para respuestas sin frecuencia
router.get('/respuestas_sin_frecuencia', respuestasSinFrecuenciaController.getRespuestasSinFrecuencia);          // Obtener todas las respuestas
router.get('/respuestas_sin_frecuencia/:id', respuestasSinFrecuenciaController.getRespuestaSinFrecuencia);     // Obtener una respuesta por ID
router.post('/respuestas_sin_frecuencia', respuestasSinFrecuenciaController.createRespuestaSinFrecuencia);     // Crear una nueva respuesta
router.put('/respuestas_sin_frecuencia/:id', respuestasSinFrecuenciaController.updateRespuestaSinFrecuencia);  // Actualizar una respuesta por ID
router.delete('/respuestas_sin_frecuencia/:id', respuestasSinFrecuenciaController.deleteRespuestaSinFrecuencia); // Eliminar una respuesta por ID

module.exports = router;

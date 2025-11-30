// backend/routes/respuestasFrecuenciaRoutes.js
const express = require('express');
const respuestasFrecuenciaController = require('../controllers/respuestasFrecuenciaController');
const router = express.Router();

// Rutas CRUD para respuestas con frecuencia
router.get('/respuestas_frecuencia', respuestasFrecuenciaController.getRespuestasFrecuencia);           // Obtener todas las respuestas
router.get('/respuestas_frecuencia/:id', respuestasFrecuenciaController.getRespuestaFrecuencia);      // Obtener una respuesta por ID
router.post('/respuestas_frecuencia', respuestasFrecuenciaController.createRespuestaFrecuencia);      // Crear una nueva respuesta
router.put('/respuestas_frecuencia/:id', respuestasFrecuenciaController.updateRespuestaFrecuencia);   // Actualizar una respuesta por ID
router.delete('/respuestas_frecuencia/:id', respuestasFrecuenciaController.deleteRespuestaFrecuencia); // Eliminar una respuesta por ID

module.exports = router;

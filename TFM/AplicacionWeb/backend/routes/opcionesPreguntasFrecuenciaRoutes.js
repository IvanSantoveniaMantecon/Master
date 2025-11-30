// backend/routes/opcionesPreguntasFrecuenciaRoutes.js
const express = require('express');
const opcionesPreguntasFrecuenciaController = require('../controllers/opcionesPreguntasFrecuenciaController');
const router = express.Router();

// Rutas CRUD para opciones de respuestas de preguntas de frecuencia
router.get('/opciones_preguntas_frecuencia', opcionesPreguntasFrecuenciaController.getOpcionesPreguntasFrecuencia);  // Obtener todas las opciones
router.get('/opciones_preguntas_frecuencia/:id', opcionesPreguntasFrecuenciaController.getOpcionPreguntaFrecuencia);  // Obtener una opción por ID
router.post('/opciones_preguntas_frecuencia', opcionesPreguntasFrecuenciaController.createOpcionPreguntaFrecuencia);  // Crear una opción
router.put('/opciones_preguntas_frecuencia/:id', opcionesPreguntasFrecuenciaController.updateOpcionPreguntaFrecuencia);  // Actualizar una opción
router.delete('/opciones_preguntas_frecuencia/:id', opcionesPreguntasFrecuenciaController.deleteOpcionPreguntaFrecuencia);  // Eliminar una opción

module.exports = router;

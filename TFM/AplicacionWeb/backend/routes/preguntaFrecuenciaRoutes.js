// backend/routes/preguntaFrecuenciaRoutes.js
const express = require('express');
const preguntaFrecuenciaController = require('../controllers/preguntaFrecuenciaController');
const router = express.Router();

// Rutas CRUD para preguntas con frecuencia (en horas)
router.get('/preguntas_frecuencia', preguntaFrecuenciaController.getPreguntasFrecuencia);    // Obtener todas las preguntas
router.get('/preguntas_frecuencia/:id', preguntaFrecuenciaController.getPreguntaFrecuencia); // Obtener una pregunta por ID
router.post('/preguntas_frecuencia', preguntaFrecuenciaController.createPreguntaFrecuencia); // Crear una nueva pregunta
router.put('/preguntas_frecuencia/:id', preguntaFrecuenciaController.updatePreguntaFrecuencia); // Actualizar una pregunta
router.delete('/preguntas_frecuencia/:id', preguntaFrecuenciaController.deletePreguntaFrecuencia); // Eliminar una pregunta

module.exports = router;

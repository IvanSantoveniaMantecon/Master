// backend/routes/preguntaSinFrecuenciaRoutes.js
const express = require('express');
const preguntaController = require('../controllers/preguntaSinFrecuenciaController');
const router = express.Router();

// Rutas CRUD de preguntas sin frecuencia
router.get('/preguntas_sin_frecuencia', preguntaController.getPreguntas);
router.get('/preguntas_sin_frecuencia/:id', preguntaController.getPregunta);
router.post('/preguntas_sin_frecuencia', preguntaController.createPregunta);
router.put('/preguntas_sin_frecuencia/:id', preguntaController.updatePregunta);
router.delete('/preguntas_sin_frecuencia/:id', preguntaController.deletePregunta);

module.exports = router;

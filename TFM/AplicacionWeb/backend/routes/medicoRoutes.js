// backend/routes/medicoRoutes.js
const express = require('express');
const medicoController = require('../controllers/medicoController');
const router = express.Router();

// Rutas CRUD de médicos
router.get('/medicos', medicoController.getMedicos);
router.get('/medicos/:id', medicoController.getMedico);
router.post('/medicos', medicoController.createMedico);
router.put('/medicos/:id', medicoController.updateMedico);
router.delete('/medicos/:id', medicoController.deleteMedico);

// ✅ Nueva ruta para login
router.post('/login', medicoController.loginMedico);

module.exports = router;

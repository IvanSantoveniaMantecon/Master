// backend/routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.get('/ultimo-envio-correo', emailController.getLastSent);
router.post('/guardar-envio-correo', emailController.updateLastSent);

// 🔽 Nueva ruta para enviar correos
router.post('/enviar-correos', emailController.sendEmails);

module.exports = router;

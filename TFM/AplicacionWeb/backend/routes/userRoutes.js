// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Rutas CRUD de usuarios
router.get('/usuarios', userController.getUsers);      // Obtener todos los usuarios
router.get('/usuarios/:id', userController.getUser);   // Obtener un usuario por ID
router.post('/usuarios', userController.createUser);   // Crear un nuevo usuario
router.put('/usuarios/:id', userController.updateUser); // Actualizar un usuario
router.delete('/usuarios/:id', userController.deleteUser); // Eliminar un usuario

module.exports = router;

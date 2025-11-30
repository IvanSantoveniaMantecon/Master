// controllers/userController.js
const userModel = require('../models/userModel');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error: err });
  }
};

// Obtener un usuario por ID
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: err });
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  const { codigo_usuario } = req.body;
  try {
    const newUser = await userModel.createUser(codigo_usuario);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el usuario', error: err });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { codigo_usuario } = req.body;
  try {
    const result = await userModel.updateUser(id, codigo_usuario);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: err });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userModel.deleteUser(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: err });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};

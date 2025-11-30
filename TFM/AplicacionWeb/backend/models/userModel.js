// models/userModel.js
const db = require('../db');

// Función para obtener todos los usuarios
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Función para obtener un usuario por id
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

// Función para crear un nuevo usuario
const createUser = (codigo_usuario) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO usuarios (codigo_usuario) VALUES (?)', [codigo_usuario], (err, results) => {
      if (err) reject(err);
      resolve({ id: results.insertId, codigo_usuario });
    });
  });
};

// Función para actualizar un usuario
const updateUser = (id, codigo_usuario) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE usuarios SET codigo_usuario = ? WHERE id = ?', [codigo_usuario, id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Función para eliminar un usuario
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

// backend/models/medicoModel.js
const db = require('../db');

// Obtener todos los médicos
const getMedicos = (callback) => {
  db.query('SELECT * FROM medicos', callback);
};

// Obtener un médico por ID
const getMedicoById = (id, callback) => {
  db.query('SELECT * FROM medicos WHERE id = ?', [id], callback);
};

// ✅ Obtener un médico por usuario
const getMedicoByUsuario = (usuario, callback) => {
  db.query('SELECT * FROM medicos WHERE usuario = ?', [usuario], callback);
};

// Crear un nuevo médico
const createMedico = (usuario, contrasena, callback) => {
  db.query('INSERT INTO medicos (usuario, contrasena) VALUES (?, ?)', [usuario, contrasena], callback);
};

// Actualizar un médico
const updateMedico = (id, usuario, contrasena, callback) => {
  db.query('UPDATE medicos SET usuario = ?, contrasena = ? WHERE id = ?', [usuario, contrasena, id], callback);
};

// Eliminar un médico
const deleteMedico = (id, callback) => {
  db.query('DELETE FROM medicos WHERE id = ?', [id], callback);
};

module.exports = {
  getMedicos,
  getMedicoById,
  getMedicoByUsuario, // ✅ exportar la nueva función
  createMedico,
  updateMedico,
  deleteMedico
};

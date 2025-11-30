// backend/models/analisisModel.js
const db = require('../db');

// Obtener todos los análisis
const getAnalisis = (callback) => {
  db.query('SELECT * FROM analisis', callback);
};

// Obtener un análisis por ID
const getAnalisisById = (id, callback) => {
  db.query('SELECT * FROM analisis WHERE id = ?', [id], callback);
};

// Crear un nuevo análisis
const createAnalisis = (pregunta_natural, pregunta_sql, callback) => {
  db.query(
    'INSERT INTO analisis (pregunta_natural, pregunta_sql) VALUES (?, ?)',
    [pregunta_natural, pregunta_sql],
    callback
  );
};

// Actualizar un análisis por ID
const updateAnalisis = (id, pregunta_natural, pregunta_sql, callback) => {
  db.query(
    'UPDATE analisis SET pregunta_natural = ?, pregunta_sql = ? WHERE id = ?',
    [pregunta_natural, pregunta_sql, id],
    callback
  );
};

// Eliminar un análisis por ID
const deleteAnalisis = (id, callback) => {
  db.query('DELETE FROM analisis WHERE id = ?', [id], callback);
};

module.exports = {
  getAnalisis,
  getAnalisisById,
  createAnalisis,
  updateAnalisis,
  deleteAnalisis
};

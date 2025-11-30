// backend/models/preguntaSinFrecuenciaModel.js
const db = require('../db');

// Obtener todas las preguntas
const getPreguntas = (callback) => {
  db.query('SELECT * FROM preguntas_sin_frecuencia', callback);
};

// Obtener una pregunta por ID
const getPreguntaById = (id, callback) => {
  db.query('SELECT * FROM preguntas_sin_frecuencia WHERE id = ?', [id], callback);
};

// Crear una nueva pregunta
const createPregunta = (menu_1, menu_2, menu_3, abierta, callback) => {
  db.query(
    'INSERT INTO preguntas_sin_frecuencia (menu_1, menu_2, menu_3, abierta) VALUES (?, ?, ?, ?)',
    [menu_1, menu_2, menu_3, abierta],
    callback
  );
};

// Actualizar una pregunta
const updatePregunta = (id, menu_1, menu_2, menu_3, abierta, callback) => {
  db.query(
    'UPDATE preguntas_sin_frecuencia SET menu_1 = ?, menu_2 = ?, menu_3 = ?, abierta = ? WHERE id = ?',
    [menu_1, menu_2, menu_3, abierta, id],
    callback
  );
};

// Eliminar una pregunta
const deletePregunta = (id, callback) => {
  db.query('DELETE FROM preguntas_sin_frecuencia WHERE id = ?', [id], callback);
};

module.exports = {
  getPreguntas,
  getPreguntaById,
  createPregunta,
  updatePregunta,
  deletePregunta
};

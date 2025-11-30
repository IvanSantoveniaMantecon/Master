// backend/models/preguntaFrecuenciaModel.js
const db = require('../db');

// Obtener todas las preguntas con frecuencia (en horas)
const getPreguntasFrecuencia = (callback) => {
  db.query('SELECT * FROM preguntas_frecuencia', callback);
};

// Obtener una pregunta con frecuencia (en horas) por ID
const getPreguntaFrecuenciaById = (id, callback) => {
  db.query('SELECT * FROM preguntas_frecuencia WHERE id = ?', [id], callback);
};

// Crear una nueva pregunta con frecuencia (en horas)
const createPreguntaFrecuencia = (pregunta, frecuencia_horas, callback) => {
  db.query('INSERT INTO preguntas_frecuencia (pregunta, frecuencia_horas) VALUES (?, ?)', [pregunta, frecuencia_horas], callback);
};

// Actualizar una pregunta con frecuencia (en horas) por ID
const updatePreguntaFrecuencia = (id, pregunta, frecuencia_horas, callback) => {
  db.query('UPDATE preguntas_frecuencia SET pregunta = ?, frecuencia_horas = ? WHERE id = ?', [pregunta, frecuencia_horas, id], callback);
};

// Eliminar una pregunta con frecuencia (en horas) por ID
const deletePreguntaFrecuencia = (id, callback) => {
  db.query('DELETE FROM preguntas_frecuencia WHERE id = ?', [id], callback);
};

module.exports = {
  getPreguntasFrecuencia,
  getPreguntaFrecuenciaById,
  createPreguntaFrecuencia,
  updatePreguntaFrecuencia,
  deletePreguntaFrecuencia
};

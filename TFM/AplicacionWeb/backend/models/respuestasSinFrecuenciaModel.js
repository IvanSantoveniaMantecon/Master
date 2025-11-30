// backend/models/respuestasSinFrecuenciaModel.js
const db = require('../db');

// Obtener todas las respuestas
const getRespuestasSinFrecuencia = (callback) => {
  db.query('SELECT * FROM respuestas_sin_frecuencia', callback);
};

// Obtener una respuesta por ID
const getRespuestaSinFrecuenciaById = (id, callback) => {
  db.query('SELECT * FROM respuestas_sin_frecuencia WHERE id = ?', [id], callback);
};

// Crear una nueva respuesta
const createRespuestaSinFrecuencia = (id_usuario, id_pregunta, fecha, problema_1, problema_2, problema_3, comentarios, callback) => {
  db.query(
    'INSERT INTO respuestas_sin_frecuencia (id_usuario, id_pregunta, fecha, problema_1, problema_2, problema_3, comentarios) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id_usuario, id_pregunta, fecha, problema_1, problema_2, problema_3, comentarios],
    callback
  );
};

// Actualizar una respuesta por ID
const updateRespuestaSinFrecuencia = (id, id_usuario, id_pregunta, fecha, problema_1, problema_2, problema_3, comentarios, callback) => {
  db.query(
    'UPDATE respuestas_sin_frecuencia SET id_usuario = ?, id_pregunta = ?, fecha = ?, problema_1 = ?, problema_2 = ?, problema_3 = ?, comentarios = ? WHERE id = ?',
    [id_usuario, id_pregunta, fecha, problema_1, problema_2, problema_3, comentarios, id],
    callback
  );
};

// Eliminar una respuesta por ID
const deleteRespuestaSinFrecuencia = (id, callback) => {
  db.query('DELETE FROM respuestas_sin_frecuencia WHERE id = ?', [id], callback);
};

module.exports = {
  getRespuestasSinFrecuencia,
  getRespuestaSinFrecuenciaById,
  createRespuestaSinFrecuencia,
  updateRespuestaSinFrecuencia,
  deleteRespuestaSinFrecuencia
};

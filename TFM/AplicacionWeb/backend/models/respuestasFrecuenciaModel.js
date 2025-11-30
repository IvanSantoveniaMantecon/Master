// backend/models/respuestasFrecuenciaModel.js
const db = require('../db');

// Obtener todas las respuestas con frecuencia
const getRespuestasFrecuencia = (callback) => {
  db.query('SELECT * FROM respuestas_frecuencia', callback);
};

// Obtener una respuesta con frecuencia por ID
const getRespuestaFrecuenciaById = (id, callback) => {
  db.query('SELECT * FROM respuestas_frecuencia WHERE id = ?', [id], callback);
};

// Crear una nueva respuesta con frecuencia
const createRespuestaFrecuencia = (id_pregunta, id_usuario, fecha, respuesta, callback) => {
  db.query(
    'INSERT INTO respuestas_frecuencia (id_pregunta, id_usuario, fecha, respuesta) VALUES (?, ?, ?, ?)',
    [id_pregunta, id_usuario, fecha, respuesta],
    callback
  );
};

// Actualizar una respuesta con frecuencia por ID
const updateRespuestaFrecuencia = (id, id_pregunta, id_usuario, fecha, respuesta, callback) => {
  db.query(
    'UPDATE respuestas_frecuencia SET id_pregunta = ?, id_usuario = ?, fecha = ?, respuesta = ? WHERE id = ?',
    [id_pregunta, id_usuario, fecha, respuesta, id],
    callback
  );
};

// Eliminar una respuesta con frecuencia por ID
const deleteRespuestaFrecuencia = (id, callback) => {
  db.query('DELETE FROM respuestas_frecuencia WHERE id = ?', [id], callback);
};

module.exports = {
  getRespuestasFrecuencia,
  getRespuestaFrecuenciaById,
  createRespuestaFrecuencia,
  updateRespuestaFrecuencia,
  deleteRespuestaFrecuencia
};

const db = require('../db');

// Obtener todas las opciones de respuestas para preguntas de frecuencia
const getOpcionesPreguntasFrecuencia = (callback) => {
  db.query('SELECT * FROM opciones_preguntas_frecuencia', callback);
};

// Obtener una opción de respuesta para pregunta de frecuencia por ID
const getOpcionPreguntaFrecuenciaById = (id, callback) => {
  db.query('SELECT * FROM opciones_preguntas_frecuencia WHERE id = ?', [id], callback);
};

// Crear una nueva opción de respuesta para pregunta de frecuencia
const createOpcionPreguntaFrecuencia = (
  id_pregunta,
  respuesta_1,
  respuesta_2,
  respuesta_3,
  respuesta_4,
  nueva_frecuencia,
  nueva_frecuencia2,
  nueva_frecuencia3,
  nueva_frecuencia4,
  callback
) => {
  db.query(
    `INSERT INTO opciones_preguntas_frecuencia 
      (id_pregunta, respuesta_1, respuesta_2, respuesta_3, respuesta_4, nueva_frecuencia, nueva_frecuencia2, nueva_frecuencia3, nueva_frecuencia4) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id_pregunta,
      respuesta_1,
      respuesta_2,
      respuesta_3,
      respuesta_4,
      nueva_frecuencia,
      nueva_frecuencia2,
      nueva_frecuencia3,
      nueva_frecuencia4
    ],
    callback
  );
};

// Actualizar una opción de respuesta para pregunta de frecuencia
const updateOpcionPreguntaFrecuencia = (
  id,
  id_pregunta,
  respuesta_1,
  respuesta_2,
  respuesta_3,
  respuesta_4,
  nueva_frecuencia,
  nueva_frecuencia2,
  nueva_frecuencia3,
  nueva_frecuencia4,
  callback
) => {
  db.query(
    `UPDATE opciones_preguntas_frecuencia 
     SET id_pregunta = ?, respuesta_1 = ?, respuesta_2 = ?, respuesta_3 = ?, respuesta_4 = ?, 
         nueva_frecuencia = ?, nueva_frecuencia2 = ?, nueva_frecuencia3 = ?, nueva_frecuencia4 = ? 
     WHERE id = ?`,
    [
      id_pregunta,
      respuesta_1,
      respuesta_2,
      respuesta_3,
      respuesta_4,
      nueva_frecuencia,
      nueva_frecuencia2,
      nueva_frecuencia3,
      nueva_frecuencia4,
      id
    ],
    callback
  );
};

// Eliminar una opción de respuesta para pregunta de frecuencia
const deleteOpcionPreguntaFrecuencia = (id, callback) => {
  db.query('DELETE FROM opciones_preguntas_frecuencia WHERE id = ?', [id], callback);
};

module.exports = {
  getOpcionesPreguntasFrecuencia,
  getOpcionPreguntaFrecuenciaById,
  createOpcionPreguntaFrecuencia,
  updateOpcionPreguntaFrecuencia,
  deleteOpcionPreguntaFrecuencia
};

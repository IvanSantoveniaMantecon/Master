// backend/controllers/respuestasFrecuenciaController.js
const respuestasFrecuenciaModel = require('../models/respuestasFrecuenciaModel');

// Obtener todas las respuestas con frecuencia
const getRespuestasFrecuencia = (req, res) => {
  respuestasFrecuenciaModel.getRespuestasFrecuencia((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener las respuestas', error: err });
    }
    res.json(results);
  });
};

// Obtener una respuesta con frecuencia por ID
const getRespuestaFrecuencia = (req, res) => {
  const { id } = req.params;
  respuestasFrecuenciaModel.getRespuestaFrecuenciaById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener la respuesta', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Respuesta no encontrada' });
    }
    res.json(results[0]);
  });
};

// Crear una nueva respuesta con frecuencia
const createRespuestaFrecuencia = (req, res) => {
  const { id_pregunta, id_usuario, fecha, respuesta } = req.body;
  respuestasFrecuenciaModel.createRespuestaFrecuencia(id_pregunta, id_usuario, fecha, respuesta, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al crear la respuesta', error: err });
    }
    res.status(201).json({ message: 'Respuesta creada con éxito', id: results.insertId });
  });
};

// Actualizar una respuesta con frecuencia por ID
const updateRespuestaFrecuencia = (req, res) => {
  const { id } = req.params;
  const { id_pregunta, id_usuario, fecha, respuesta } = req.body;
  respuestasFrecuenciaModel.updateRespuestaFrecuencia(id, id_pregunta, id_usuario, fecha, respuesta, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar la respuesta', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Respuesta no encontrada' });
    }
    res.json({ message: 'Respuesta actualizada con éxito' });
  });
};

// Eliminar una respuesta con frecuencia por ID
const deleteRespuestaFrecuencia = (req, res) => {
  const { id } = req.params;
  respuestasFrecuenciaModel.deleteRespuestaFrecuencia(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar la respuesta', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Respuesta no encontrada' });
    }
    res.json({ message: 'Respuesta eliminada con éxito' });
  });
};

module.exports = {
  getRespuestasFrecuencia,
  getRespuestaFrecuencia,
  createRespuestaFrecuencia,
  updateRespuestaFrecuencia,
  deleteRespuestaFrecuencia
};

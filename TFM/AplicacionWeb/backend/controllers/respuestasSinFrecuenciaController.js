// backend/controllers/respuestasSinFrecuenciaController.js
const respuestasSinFrecuenciaModel = require('../models/respuestasSinFrecuenciaModel');

// Obtener todas las respuestas
const getRespuestasSinFrecuencia = (req, res) => {
  respuestasSinFrecuenciaModel.getRespuestasSinFrecuencia((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener las respuestas', error: err });
    }
    res.json(results);
  });
};

// Obtener una respuesta por ID
const getRespuestaSinFrecuencia = (req, res) => {
  const { id } = req.params;
  respuestasSinFrecuenciaModel.getRespuestaSinFrecuenciaById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener la respuesta', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Respuesta no encontrada' });
    }
    res.json(results[0]);
  });
};

// Crear una nueva respuesta
const createRespuestaSinFrecuencia = (req, res) => {
  const { id_usuario, id_pregunta, fecha, problema_1, problema_2, problema_3, comentarios } = req.body;
  respuestasSinFrecuenciaModel.createRespuestaSinFrecuencia(id_usuario, id_pregunta, fecha, problema_1, problema_2, problema_3, comentarios, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al crear la respuesta', error: err });
    }
    res.status(201).json({ message: 'Respuesta creada con éxito', id: results.insertId });
  });
};

// Actualizar una respuesta por ID
const updateRespuestaSinFrecuencia = (req, res) => {
  const { id } = req.params;
  const { id_usuario, id_pregunta, fecha, problema_1, problema_2, problema_3, comentarios } = req.body;
  respuestasSinFrecuenciaModel.updateRespuestaSinFrecuencia(id, id_usuario, id_pregunta, fecha, problema_1, problema_2, problema_3, comentarios, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar la respuesta', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Respuesta no encontrada' });
    }
    res.json({ message: 'Respuesta actualizada con éxito' });
  });
};

// Eliminar una respuesta por ID
const deleteRespuestaSinFrecuencia = (req, res) => {
  const { id } = req.params;
  respuestasSinFrecuenciaModel.deleteRespuestaSinFrecuencia(id, (err, results) => {
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
  getRespuestasSinFrecuencia,
  getRespuestaSinFrecuencia,
  createRespuestaSinFrecuencia,
  updateRespuestaSinFrecuencia,
  deleteRespuestaSinFrecuencia
};

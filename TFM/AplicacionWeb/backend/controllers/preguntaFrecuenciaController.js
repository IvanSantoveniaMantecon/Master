// backend/controllers/preguntaFrecuenciaController.js
const preguntaFrecuenciaModel = require('../models/preguntaFrecuenciaModel');

// Obtener todas las preguntas con frecuencia (en horas)
const getPreguntasFrecuencia = (req, res) => {
  preguntaFrecuenciaModel.getPreguntasFrecuencia((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener las preguntas', error: err });
    }
    res.json(results);
  });
};

// Obtener una pregunta con frecuencia (en horas) por ID
const getPreguntaFrecuencia = (req, res) => {
  const { id } = req.params;
  preguntaFrecuenciaModel.getPreguntaFrecuenciaById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener la pregunta', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    res.json(results[0]);
  });
};

// Crear una nueva pregunta con frecuencia (en horas)
const createPreguntaFrecuencia = (req, res) => {
  const { pregunta, frecuencia_horas } = req.body;
  preguntaFrecuenciaModel.createPreguntaFrecuencia(pregunta, frecuencia_horas, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al crear la pregunta', error: err });
    }
    res.status(201).json({ message: 'Pregunta creada con éxito', id: results.insertId });
  });
};

// Actualizar una pregunta con frecuencia (en horas)
const updatePreguntaFrecuencia = (req, res) => {
  const { id } = req.params;
  const { pregunta, frecuencia_horas } = req.body;
  preguntaFrecuenciaModel.updatePreguntaFrecuencia(id, pregunta, frecuencia_horas, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar la pregunta', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    res.json({ message: 'Pregunta actualizada con éxito' });
  });
};

// Eliminar una pregunta con frecuencia (en horas)
const deletePreguntaFrecuencia = (req, res) => {
  const { id } = req.params;
  preguntaFrecuenciaModel.deletePreguntaFrecuencia(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar la pregunta', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    res.json({ message: 'Pregunta eliminada con éxito' });
  });
};

module.exports = {
  getPreguntasFrecuencia,
  getPreguntaFrecuencia,
  createPreguntaFrecuencia,
  updatePreguntaFrecuencia,
  deletePreguntaFrecuencia
};

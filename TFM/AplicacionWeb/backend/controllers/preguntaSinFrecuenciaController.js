// backend/controllers/preguntaSinFrecuenciaController.js
const preguntaModel = require('../models/preguntaSinFrecuenciaModel');

// Obtener todas las preguntas
const getPreguntas = (req, res) => {
  preguntaModel.getPreguntas((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Obtener una pregunta por ID
const getPregunta = (req, res) => {
  const { id } = req.params;
  preguntaModel.getPreguntaById(id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Pregunta no encontrada');
    res.json(results[0]);
  });
};

// Crear una nueva pregunta
const createPregunta = (req, res) => {
  const { menu_1, menu_2, menu_3, abierta } = req.body;
  preguntaModel.createPregunta(menu_1, menu_2, menu_3, abierta, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'Pregunta creada exitosamente', id: results.insertId });
  });
};

// Actualizar una pregunta
const updatePregunta = (req, res) => {
  const { id } = req.params;
  const { menu_1, menu_2, menu_3, abierta } = req.body;
  preguntaModel.updatePregunta(id, menu_1, menu_2, menu_3, abierta, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Pregunta actualizada exitosamente' });
  });
};

// Eliminar una pregunta
const deletePregunta = (req, res) => {
  const { id } = req.params;
  preguntaModel.deletePregunta(id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) return res.status(404).send('Pregunta no encontrada');
    res.json({ message: 'Pregunta eliminada exitosamente' });
  });
};

module.exports = {
  getPreguntas,
  getPregunta,
  createPregunta,
  updatePregunta,
  deletePregunta
};

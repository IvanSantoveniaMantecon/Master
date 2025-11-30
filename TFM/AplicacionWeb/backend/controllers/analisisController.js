// backend/controllers/analisisController.js
const analisisModel = require('../models/analisisModel');

// Obtener todos los análisis
const getAnalisis = (req, res) => {
  analisisModel.getAnalisis((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener los análisis', error: err });
    }
    res.json(results);
  });
};

// Obtener un análisis por ID
const getAnalisisById = (req, res) => {
  const { id } = req.params;
  analisisModel.getAnalisisById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener el análisis', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Análisis no encontrado' });
    }
    res.json(results[0]);
  });
};

// Crear un nuevo análisis
const createAnalisis = (req, res) => {
  const { pregunta_natural, pregunta_sql } = req.body;
  analisisModel.createAnalisis(pregunta_natural, pregunta_sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al crear el análisis', error: err });
    }
    res.status(201).json({ message: 'Análisis creado con éxito', id: results.insertId });
  });
};

// Actualizar un análisis por ID
const updateAnalisis = (req, res) => {
  const { id } = req.params;
  const { pregunta_natural, pregunta_sql } = req.body;
  analisisModel.updateAnalisis(id, pregunta_natural, pregunta_sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar el análisis', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Análisis no encontrado' });
    }
    res.json({ message: 'Análisis actualizado con éxito' });
  });
};

// Eliminar un análisis por ID
const deleteAnalisis = (req, res) => {
  const { id } = req.params;
  analisisModel.deleteAnalisis(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar el análisis', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Análisis no encontrado' });
    }
    res.json({ message: 'Análisis eliminado con éxito' });
  });
};

module.exports = {
  getAnalisis,
  getAnalisisById,
  createAnalisis,
  updateAnalisis,
  deleteAnalisis
};

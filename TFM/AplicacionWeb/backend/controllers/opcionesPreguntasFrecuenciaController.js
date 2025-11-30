const opcionesPreguntasFrecuenciaModel = require('../models/opcionesPreguntasFrecuenciaModel');

// Obtener todas las opciones de respuestas
const getOpcionesPreguntasFrecuencia = (req, res) => {
  opcionesPreguntasFrecuenciaModel.getOpcionesPreguntasFrecuencia((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Obtener una opción por ID
const getOpcionPreguntaFrecuencia = (req, res) => {
  const { id } = req.params;
  opcionesPreguntasFrecuenciaModel.getOpcionPreguntaFrecuenciaById(id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Opción no encontrada');
    res.json(results[0]);
  });
};

// Crear nueva opción
const createOpcionPreguntaFrecuencia = (req, res) => {
  const {
    id_pregunta,
    respuesta_1,
    respuesta_2,
    respuesta_3,
    respuesta_4,
    nueva_frecuencia,
    nueva_frecuencia2,
    nueva_frecuencia3,
    nueva_frecuencia4
  } = req.body;

  opcionesPreguntasFrecuenciaModel.createOpcionPreguntaFrecuencia(
    id_pregunta,
    respuesta_1,
    respuesta_2,
    respuesta_3,
    respuesta_4,
    nueva_frecuencia,
    nueva_frecuencia2,
    nueva_frecuencia3,
    nueva_frecuencia4,
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: 'Opción creada exitosamente', id: results.insertId });
    }
  );
};

// Actualizar opción
const updateOpcionPreguntaFrecuencia = (req, res) => {
  const { id } = req.params;
  const {
    id_pregunta,
    respuesta_1,
    respuesta_2,
    respuesta_3,
    respuesta_4,
    nueva_frecuencia,
    nueva_frecuencia2,
    nueva_frecuencia3,
    nueva_frecuencia4
  } = req.body;

  opcionesPreguntasFrecuenciaModel.updateOpcionPreguntaFrecuencia(
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
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Opción actualizada exitosamente' });
    }
  );
};

// Eliminar opción
const deleteOpcionPreguntaFrecuencia = (req, res) => {
  const { id } = req.params;
  opcionesPreguntasFrecuenciaModel.deleteOpcionPreguntaFrecuencia(id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) return res.status(404).send('Opción no encontrada');
    res.json({ message: 'Opción eliminada exitosamente' });
  });
};

module.exports = {
  getOpcionesPreguntasFrecuencia,
  getOpcionPreguntaFrecuencia,
  createOpcionPreguntaFrecuencia,
  updateOpcionPreguntaFrecuencia,
  deleteOpcionPreguntaFrecuencia
};

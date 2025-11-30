// backend/controllers/medicoController.js
const bcrypt = require('bcryptjs');
const medicoModel = require('../models/medicoModel.js');

// Obtener todos los médicos
const getMedicos = (req, res) => {
  medicoModel.getMedicos((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Obtener un médico por ID
const getMedico = (req, res) => {
  const { id } = req.params;

  medicoModel.getMedicoById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ message: `Médico con id ${id} no encontrado.` });
    }
    res.json(results[0]);
  });
};

// Crear un nuevo médico
const createMedico = (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ message: 'El usuario y la contraseña son obligatorios.' });
  }

  // Encriptar la contraseña
  bcrypt.hash(contrasena, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err.message });

    medicoModel.createMedico(usuario, hashedPassword, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        id: results.insertId,
        usuario,
        contrasena: hashedPassword, // No se debe devolver la contraseña real, pero se devuelve como confirmación
      });
    });
  });
};

// Actualizar un médico
const updateMedico = (req, res) => {
  const { id } = req.params;
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ message: 'El usuario y la contraseña son obligatorios.' });
  }

  // Encriptar la nueva contraseña
  bcrypt.hash(contrasena, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err.message });

    medicoModel.updateMedico(id, usuario, hashedPassword, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: `Médico con id ${id} no encontrado.` });
      }
      res.json({
        message: 'Médico actualizado con éxito',
        id,
        usuario,
        contrasena: hashedPassword, // Solo para fines de confirmación
      });
    });
  });
};

// Eliminar un médico
const deleteMedico = (req, res) => {
  const { id } = req.params;

  medicoModel.deleteMedico(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: `Médico con id ${id} no encontrado.` });
    }
    res.json({ message: `Médico con id ${id} eliminado con éxito.` });
  });
};

// ✅ Login de médico
const loginMedico = (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ message: 'Usuario y contraseña requeridos.' });
  }

  medicoModel.getMedicoByUsuario(usuario, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado.' });
    }

    const medico = results[0];

    // Comparar la contraseña
    bcrypt.compare(contrasena, medico.contrasena, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err.message });

      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta.' });
      }

      // Opcional: puedes generar un token aquí
      res.json({
        message: 'Login exitoso',
        medico: {
          id: medico.id,
          usuario: medico.usuario
        }
      });
    });
  });
};


module.exports = {
  getMedicos,
  getMedico,
  createMedico,
  updateMedico,
  deleteMedico,
  loginMedico, // ✅ exportar la función
};


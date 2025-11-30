// backend/controllers/emailController.js

const db = require('../db');
// backend/controllers/emailController.js
const nodemailer = require('nodemailer');

exports.getLastSent = (req, res) => {
  const sql = 'SELECT last_sent_at FROM email_send_control WHERE id = 1';

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error obteniendo último envío' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.json({ lastSentAt: results[0].last_sent_at });
  });
};

exports.updateLastSent = (req, res) => {
  const sql = 'UPDATE email_send_control SET last_sent_at = NOW() WHERE id = 1';

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error actualizando último envío' });
    }
    res.json({ message: 'Último envío actualizado' });
  });
};


exports.sendEmails = async (req, res) => {
  const { correos, contenido } = req.body;

  if (!Array.isArray(correos) || !contenido) {
    return res.status(400).json({ error: 'Faltan datos necesarios' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    auth: {
      user: 'UO308932@uniovi.es',
      pass: 'MG8844pi.' // ⚠️ Reemplázalo por process.env en producción
    },
    secureConnection: false,
    tls: { ciphers: 'SSLv3' }
  });

  try {
    for (const destinatario of correos) {
      const mailOptions = {
        from: 'UO308932@uniovi.es',
        to: destinatario,
        subject: 'Resultados de análisis SQL',
        text: contenido
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({ success: true, mensaje: 'Correos enviados' });
  } catch (error) {
    console.error('Error al enviar correos:', error);
    res.status(500).json({ error: 'Fallo en el envío de correos' });
  }
};

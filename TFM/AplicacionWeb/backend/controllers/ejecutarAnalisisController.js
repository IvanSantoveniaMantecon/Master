const axios = require('axios');
const { ejecutarConsulta } = require('../models/ejecutarAnalisisModel');

const getConsultasPermitidas = async () => {
  try {
    const res = await axios.get('http://localhost:3001/api/analisis');
    return res.data.map((item) => item.pregunta_sql);
  } catch (err) {
    console.error('❌ Error al obtener las consultas permitidas:', err.message);
    return [];
  }
};

const ejecutarAnalisis = async (req, res) => {
  const { sql } = req.body;

  try {
    const allowedQueries = await getConsultasPermitidas();

    if (!allowedQueries.includes(sql)) {
      return res.status(400).json({ error: 'Consulta no permitida.' });
    }

    const resultado = await ejecutarConsulta(sql);
    res.json({ resultado });
  } catch (error) {
    console.error('❌ Error al ejecutar el análisis:', error.message);
    res.status(500).json({ error: 'Error al procesar la solicitud.' });
  }
};

module.exports = { ejecutarAnalisis };

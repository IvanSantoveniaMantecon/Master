const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Leer esquema BBDD.txt solo una vez al iniciar el servidor
const schema = fs.readFileSync(path.join(__dirname, '../../../Base-de-Datos/BBDD.txt'), 'utf-8');

const PROMPT_BASE = `
Eres un experto en SQL. Convierte preguntas en lenguaje natural a consultas SQL válidas para MySQL. 
Responde SOLO con la consulta SQL, sin explicaciones ni comentarios.

Considera lo siguiente:
- Usa funciones de fecha como TIMESTAMPDIFF o DATEDIFF para calcular intervalos entre fechas.
- Agrupa cuando se pidan recuentos por usuario.
- Usa HAVING para filtrar grupos agregados.
- No uses funciones como DATE_SUB(NOW(), INTERVAL X DAY) si la condición es sobre el intervalo entre la primera y última respuesta.

Ejemplo:

Pregunta: ¿Qué usuarios han respondido la pregunta 8 al menos 3 veces en un intervalo de 2 días?
SQL:
SELECT 
  id_usuario,
  id_pregunta,
  COUNT(*) AS respuestas_count,
  MIN(fecha) AS primera_respuesta,
  MAX(fecha) AS ultima_respuesta
FROM respuestas_sin_frecuencia
WHERE id_pregunta = 8
GROUP BY id_usuario, id_pregunta
HAVING respuestas_count >= 3
   AND TIMESTAMPDIFF(DAY, MIN(fecha), MAX(fecha)) <= 2;

---
Base de datos:

${schema}

Convierte preguntas en lenguaje natural a consultas SQL válidas para MySQL (ten en cuenta que el esquema es MySQL). 
Responde SOLO con la consulta SQL, sin explicaciones.
`;

exports.translateToSQL = async (req, res) => {
  const { question, option } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'La pregunta es obligatoria' });
  }

  // Agregar instrucciones adicionales si se especifica una tabla
  let promptOption = '';
  if (option === 'sin_frecuencia') {
    promptOption = `\nTen en cuenta: Responde únicamente considerando la tabla 'respuestas_sin_frecuencia'.`;
  } else if (option === 'con_frecuencia') {
    promptOption = `\nTen en cuenta: Responde únicamente considerando la tabla 'respuestas_con_frecuencia'.`;
  }

  const finalPrompt = `${PROMPT_BASE}${promptOption}\n\nPregunta: ${question}\nSQL:`;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'codellama:instruct',
      prompt: finalPrompt,
      stream: false
    });

    const sql = response.data.response.trim();
    res.json({ sql });
  } catch (error) {
    console.error('Error generando SQL con Ollama:', error.message);
    res.status(500).json({ error: 'Error generando SQL' });
  }
};

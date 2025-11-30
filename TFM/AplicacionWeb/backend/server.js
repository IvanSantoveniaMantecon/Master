// backend/server.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const medicoRoutes = require('./routes/medicoRoutes');
const preguntaSinFrecuenciaRoutes = require('./routes/preguntaSinFrecuenciaRoutes');
const preguntaFrecuenciaRoutes = require('./routes/preguntaFrecuenciaRoutes');
const respuestasSinFrecuenciaRoutes = require('./routes/respuestasSinFrecuenciaRoutes');
const respuestasFrecuenciaRoutes = require('./routes/respuestasFrecuenciaRoutes');
const analisisRoutes = require('./routes/analisisRoutes');
const opcionesPreguntasFrecuenciaRoutes = require('./routes/opcionesPreguntasFrecuenciaRoutes');
const ejecutarAnalisisRouter = require('./routes/ejecutarAnalisis');
const emailRoutes = require('./routes/emailRoutes');
const translateRoutes = require('./routes/translateRoutes'); // <-- Importa la nueva ruta
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', userRoutes);
app.use('/api', medicoRoutes);
app.use('/api', preguntaSinFrecuenciaRoutes);
app.use('/api', preguntaFrecuenciaRoutes);
app.use('/api', respuestasSinFrecuenciaRoutes);
app.use('/api', respuestasFrecuenciaRoutes);
app.use('/api', analisisRoutes);
app.use('/api', opcionesPreguntasFrecuenciaRoutes);
app.use('/api', ejecutarAnalisisRouter);
app.use('/api', emailRoutes);
app.use('/api', translateRoutes); // <-- Agrega la nueva ruta aquí

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

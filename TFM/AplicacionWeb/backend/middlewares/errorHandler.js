// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error('❌ Error no capturado:', err);
    res.status(500).json({ message: 'Error interno del servidor', error: err.message });
  };
  
  module.exports = errorHandler;
  
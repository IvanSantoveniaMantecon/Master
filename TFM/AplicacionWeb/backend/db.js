// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chatbot_medico'
});

db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    throw err;
  }
  console.log('✅ Conectado a MySQL (chatbot_medico)');
});

module.exports = db;

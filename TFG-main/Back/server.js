const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const config = require("./app/config/auth.config");
const db = require("./app/models");
const mysql = require('mysql2')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // Parsear JSON body
app.use(bodyParser.urlencoded({ extended: true })); // Parsear URL-encoded body

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

const credentials = {
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
}

db.sequelize.sync();

const User = db.user; // Asegúrate de que 'user' es el nombre correcto de tu modelo de usuario

// Ruta para obtener los datos del dashboard
app.get("/api/data", (req, res) => {
    // Consulta para obtener los datos de la base de datos
    User.findAll({
      attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt'] // Ajusta los atributos según tu modelo
    })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ mensaje: 'Error al obtener datos', error });
    });

});

app.get('/test/:numAsignatura/:numTest', (req, res) => {
  const numTest = req.params.numTest; // Obtener el número de test desde los parámetros de la URL
  const numAsignatura = req.params.numAsignatura;
  var connection = mysql.createConnection(credentials);
  
  // Consulta SQL para obtener las preguntas del número de test especificado
  const query = 'SELECT * FROM test WHERE NumTest = ? AND NumAsignatura = ?';
  connection.query(query, [numTest, numAsignatura], (error, result) => {
    if (error) {
      console.error('Error en la consulta:', error);
      res.status(500).send('Error en la consulta');
    } else {
      res.status(200).json(result);
    }
  });

  connection.end();
});

app.post('/addQuestion', (req, res) => {
  const { NumAsignatura, testNumber, questionText, answerOptions } = req.body;

  // Comprobar que hay suficientes opciones
  if (!answerOptions || answerOptions.length < 4) {
    return res.status(400).send('Se requieren 4 opciones de respuesta.');
  }

  // Crear conexión a la base de datos
  const connection = mysql.createConnection(credentials);

  // Insertar la nueva pregunta y opciones de respuesta en la base de datos
  const insertQuestionQuery = 'INSERT INTO test (NumTest, NumAsignatura, Pregunta, RespuestaBuena, RespuestaMala1, RespuestaMala2, RespuestaMala3) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const params = [
    testNumber,
    NumAsignatura,
    questionText,
    answerOptions[0]?.answerText || '', // Respuesta correcta
    answerOptions[1]?.answerText || '', // Respuesta mala 1
    answerOptions[2]?.answerText || '', // Respuesta mala 2
    answerOptions[3]?.answerText || '', // Respuesta mala 3
  ];

  connection.query(insertQuestionQuery, params, (error, results, fields) => {
    if (error) {
      console.error('Error al agregar la pregunta:', error);
      res.status(500).send('Error al agregar la pregunta');
    } else {
      console.log('Pregunta agregada correctamente');
      res.status(200).send('Pregunta agregada correctamente');
    }
  });

  connection.end();
});



app.get('/temas/:numAsignatura', (req, res) => {
  const numAsignatura = req.params.numAsignatura; // Obtener el número de test desde los parámetros de la URL
  var connection = mysql.createConnection(credentials);
  
  // Consulta SQL para obtener las preguntas del número de test especificado
  const query = 'SELECT * FROM temas WHERE NumAsignatura = ?';
  connection.query(query, [numAsignatura], (error, result) => {
    if (error) {
      console.error('Error en la consulta:', error);
      res.status(500).send('Error en la consulta');
    } else {
      res.status(200).json(result);
    }
  });

  connection.end();
});

app.post('/addTema', (req, res) => {
  const { numAsignatura, numTema, imagen, titulo, subtitulo } = req.body;
  var connection = mysql.createConnection(credentials);

  const base64Image = imagen.replace(/^data:image\/(jpeg|jpg|png);base64,/, '');
  
  // Insertar el nuevo tema en la base de datos
  const insertTemaQuery = 'INSERT INTO temas (NumAsignatura, NumTema, Imagen, Titulo, Subtitulo) VALUES (?, ?, ?, ?, ?)';
  const params = [numAsignatura, numTema, base64Image, titulo, subtitulo];

  connection.query(insertTemaQuery, params, (error, results, fields) => {
    if (error) {
      console.error('Error al agregar el tema:', error);
      res.status(500).send('Error al agregar el tema');
    } else {
      console.log('Tema agregado correctamente');
      res.status(200).send('Tema agregado correctamente');
    }
  });
});

app.delete('/removeTema', (req, res) => {
  const { numAsignatura, numTema } = req.body;
  var connection = mysql.createConnection(credentials);
  
  // Eliminar el tema de la base de datos
  const deleteTemaQuery = 'DELETE FROM temas WHERE NumAsignatura = ? AND NumTema = ?';
  const params = [numAsignatura, numTema];

  connection.query(deleteTemaQuery, params, (error, results, fields) => {
    if (error) {
      console.error('Error al eliminar el tema:', error);
      res.status(500).send('Error al eliminar el tema');
    } else {
      console.log('Tema eliminado correctamente');
      res.status(200).send('Tema eliminado correctamente');
    }
  });
});

app.put('/editTema', (req, res) => {
  const { numAsignatura, numTema, imagen, titulo, subtitulo } = req.body;
  var connection = mysql.createConnection(credentials);

  const base64Image = imagen.replace(/^data:image\/(jpeg|jpg|png);base64,/, '');
  
  // Actualizar el tema en la base de datos
  const updateTemaQuery = 'UPDATE temas SET Imagen = ?, Titulo = ?, Subtitulo = ? WHERE NumAsignatura = ? AND NumTema = ?';
  const params = [base64Image, titulo, subtitulo, numAsignatura, numTema];

  connection.query(updateTemaQuery, params, (error, results, fields) => {
    if (error) {
      console.error('Error al editar el tema:', error);
      res.status(500).send('Error al editar el tema');
    } else {
      console.log('Tema editado correctamente');
      res.status(200).send('Tema editado correctamente');
    }
  });
});

app.delete('/removePregunta', (req, res) => {
  const { numTest, pregunta, NumAsignatura } = req.body;
  const connection = mysql.createConnection(credentials);
  
  // Eliminar la pregunta de la base de datos
  const deletePreguntaQuery = 'DELETE FROM test WHERE NumAsignatura = ? AND NumTest = ? AND Pregunta = ?';
  const params = [NumAsignatura, numTest, pregunta];

  connection.query(deletePreguntaQuery, params, (error, results, fields) => {
    if (error) {
      console.error('Error al eliminar la pregunta:', error);
      res.status(500).send('Error al eliminar la pregunta');
    } else {
      console.log('Pregunta eliminada correctamente');
      res.status(200).send('Pregunta eliminada correctamente');
    }
    connection.end(); // Cerrar la conexión después de la consulta
  });
});

app.put('/editarPregunta', (req, res) => {
  const { NumTest, Pregunta, RespuestaBuena, RespuestaMala1, RespuestaMala2, RespuestaMala3, NumAsignatura } = req.body;

  const connection = mysql.createConnection(credentials);
  
  // Actualizar la pregunta en la base de datos
  const updatePreguntaQuery = 'UPDATE test SET Pregunta = ?, RespuestaBuena = ?, RespuestaMala1 = ?, RespuestaMala2 = ?, RespuestaMala3 = ? WHERE NumAsignatura = ? AND NumTest = ?';
  const params = [Pregunta, RespuestaBuena, RespuestaMala1, RespuestaMala2, RespuestaMala3, NumAsignatura, NumTest];

  connection.query(updatePreguntaQuery, params, (error, results, fields) => {
    if (error) {
      console.error('Error al actualizar la pregunta:', error);
      res.status(500).send('Error al actualizar la pregunta');
    } else {
      console.log('Pregunta actualizada correctamente');
      res.status(200).send('Pregunta actualizada correctamente');
    }
    connection.end(); // Cerrar la conexión después de la consulta
  });
});

app.put('/editarUsuario', (req, res) => {
  const { idUsuario, username, email, rol } = req.body;

  let rolId;
  switch(rol) {
    case 'usuario':
      rolId = 1;
      break;
    case 'profesor':
      rolId = 2;
      break;
    case 'administrador':
      rolId = 3;
      break;
    default:
      return res.status(400).send('Rol no válido');
  }

  const connection = mysql.createConnection(credentials);

  connection.beginTransaction(err => {
    if (err) {
      console.error('Error al iniciar la transacción:', err);
      return res.status(500).send('Error al iniciar la transacción');
    }

    // Actualizar la información del usuario en la tabla users
    const updateUsuarioQuery = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
    const usuarioParams = [username, email, idUsuario];

    connection.query(updateUsuarioQuery, usuarioParams, (error, results) => {
      if (error) {
        return connection.rollback(() => {
          console.error('Error al actualizar el usuario:', error);
          res.status(500).send('Error al actualizar el usuario');
        });
      }

      // Actualizar el rol en la tabla user_roles
      const updateUserRoleQuery = 'UPDATE user_roles SET roleId = ? WHERE userId = ?';
      const userRoleParams = [rolId, idUsuario];

      connection.query(updateUserRoleQuery, userRoleParams, (error, results) => {
        if (error) {
          return connection.rollback(() => {
            console.error('Error al actualizar el rol del usuario:', error);
            res.status(500).send('Error al actualizar el rol del usuario');
          });
        }

        connection.commit(err => {
          if (err) {
            return connection.rollback(() => {
              console.error('Error al hacer commit:', err);
              res.status(500).send('Error al hacer commit');
            });
          }

          console.log('Usuario y rol actualizados correctamente');
          res.status(200).send('Usuario y rol actualizados correctamente');
          connection.end(); // Cerrar la conexión después de la transacción
        });
      });
    });
  });
});

app.delete('/eliminarUsuario', (req, res) => {
  const { idUsuario, username } = req.body;

  const connection = mysql.createConnection(credentials);

  connection.beginTransaction(err => {
    if (err) {
      console.error('Error al iniciar la transacción:', err);
      return res.status(500).send('Error al iniciar la transacción');
    }
    // Eliminar el usuario de la tabla users
    const deleteUserQuery = 'DELETE FROM users WHERE id = ? AND username = ?';
    connection.query(deleteUserQuery, [idUsuario, username], (error, results) => {
      if (error) {
        return connection.rollback(() => {
          console.error('Error al eliminar el usuario:', error);
          res.status(500).send('Error al eliminar el usuario');
        });
      }

      connection.commit(err => {
        if (err) {
          return connection.rollback(() => {
            console.error('Error al hacer commit:', err);
            res.status(500).send('Error al hacer commit');
          });
        }

        console.log('Usuario eliminado correctamente');
        res.status(200).send('Usuario eliminado correctamente');
        connection.end(); // Cerrar la conexión después de la transacción
        });
      });
  });
});

app.get('/noticias', (req, res) => {
  const connection = mysql.createConnection(credentials);

  // Consulta SQL para obtener todas las noticias
  const query = 'SELECT * FROM noticias';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error en la consulta:', error);
      res.status(500).send('Error en la consulta');
    } else {
      // Convertir base64 a imagen y enviar resultados
      const noticiasConImagenes = results.map(noticia => {
        const imagenBase64 = noticia.Imagen;
        const noticiaConImagen = {
          ...noticia,
          Imagen: `data:image/jpeg;base64,${imagenBase64}` // Asumiendo que la imagen es JPEG
        };
        return noticiaConImagen;
      });
      res.status(200).json(noticiasConImagenes);
    }
    connection.end(); // Cerrar conexión después de enviar respuesta
  });
});

app.post('/addNoticia', (req, res) => {
  const { numNoticia, titulo, descripcion, imagen } = req.body;
  const connection = mysql.createConnection(credentials);

  // Convertir imagen a base64
  const base64Image = imagen.replace(/^data:image\/(jpeg|jpg|png);base64,/, '');

  // Verificar si ya existe una noticia con el mismo NumNoticia
  const verificaExistenciaQuery = 'SELECT * FROM noticias WHERE NumNoticia = ?';
  connection.query(verificaExistenciaQuery, [numNoticia], (error, results) => {
    if (error) {
      console.error('Error al verificar existencia de noticia:', error);
      res.status(500).send('Error al verificar existencia de noticia');
      connection.end(); // Cerrar conexión en caso de error
    } else {
      if (results.length > 0) {
        // Ya existe una noticia con ese NumNoticia
        res.status(409).send('Ya existe una noticia con ese número');
        connection.end(); // Cerrar conexión después de enviar respuesta
      } else {
        // Insertar la nueva noticia en la base de datos
        const insertNoticiaQuery = 'INSERT INTO noticias (NumNoticia, Titulo, Descripcion, Imagen) VALUES (?, ?, ?, ?)';
        const params = [numNoticia, titulo, descripcion, base64Image];

        connection.query(insertNoticiaQuery, params, (insertError, insertResults) => {
          if (insertError) {
            console.error('Error al agregar la noticia:', insertError);
            res.status(500).send('Error al agregar la noticia');
          } else {
            console.log('Noticia agregada correctamente');
            res.status(200).send('Noticia agregada correctamente');
          }
          connection.end(); // Siempre cerrar conexión después de ejecutar la consulta
        });
      }
    }
  });
});

// Endpoint para obtener una noticia por su NumNoticia
app.get('/noticias/:numNoticia', (req, res) => {
  const numNoticia = req.params.numNoticia;
  const connection = mysql.createConnection(credentials);

  const query = 'SELECT * FROM noticias WHERE NumNoticia = ?';
  connection.query(query, [numNoticia], (error, results) => {
    if (error) {
      console.error('Error al obtener la noticia:', error);
      res.status(500).send('Error al obtener la noticia');
    } else {
      res.status(200).json(results);
    }
    connection.end(); // Siempre cerrar conexión después de ejecutar la consulta
  });
});

app.put('/editarNoticia', (req, res) => {
  const { NumNoticia, Titulo, Descripcion, Imagen } = req.body;
  const connection = mysql.createConnection(credentials);

  const base64Image = Imagen.replace(/^data:image\/(jpeg|jpg|png);base64,/, '');
  
  const updateNoticiaQuery = 'UPDATE noticias SET Titulo = ?, Descripcion = ?, Imagen = ? WHERE NumNoticia = ?';
  const params = [Titulo, Descripcion, base64Image, NumNoticia];

  connection.query(updateNoticiaQuery, params, (error, results, fields) => {
    if (error) {
      console.error('Error al editar la noticia:', error);
      res.status(500).send('Error al editar la noticia');
    } else {
      console.log('Noticia editada correctamente');
      res.status(200).send('Noticia editada correctamente');
    }
  });

  connection.end();
});

app.delete("/eliminarNoticia", (req, res) => {
  const { NumNoticia, Titulo } = req.body;
  const connection = mysql.createConnection(credentials);
  // Verificar si la noticia existe antes de eliminarla
  const verificaExistenciaQuery =
    "SELECT * FROM noticias WHERE NumNoticia = ? AND Titulo = ?";
  connection.query(
    verificaExistenciaQuery,
    [NumNoticia, Titulo],
    (error, results) => {
      if (error) {
        console.error("Error al verificar existencia de noticia:", error);
        res.status(500).send("Error al verificar existencia de noticia");
      } else {
        if (results.length === 0) {
          // No se encontró una noticia con esos parámetros
          res.status(404).send("No se encontró la noticia especificada");
        } else {
          // Eliminar la noticia de la base de datos
          const deleteNoticiaQuery = "DELETE FROM noticias WHERE NumNoticia = ?";
          connection.query(
            deleteNoticiaQuery,
            [NumNoticia],
            (deleteError, deleteResults) => {
              if (deleteError) {
                console.error("Error al eliminar la noticia:", deleteError);
                res.status(500).send("Error al eliminar la noticia");
              } else {
                console.log("Noticia eliminada correctamente");
                res.status(200).send("Noticia eliminada correctamente");
              }
            }
          );
        }
      }
    }
  );
});

app.get('/asignaturas/:NumAsignatura', (req, res) => {
  const numAsignatura = req.params.NumAsignatura;
  const connection = mysql.createConnection(credentials);
  console.log(`Received request for NumAsignatura: ${numAsignatura}`);

  const query = 'SELECT * FROM asignaturas WHERE NumAsignatura = ?';
  console.log(query)
  connection.query(query, [numAsignatura], (error, results) => {
    if (error) {
      console.error('Error al obtener la asignatura:', error);
      res.status(500).send('Error al obtener la asignatura');
    } else {
      if (results.length > 0) {
        console.log('Asignatura retrieved:', results[0]);
        res.status(200).json(results[0]);
      } else {
        console.log('No asignatura found with NumAsignatura:', numAsignatura);
        res.status(404).send('Asignatura no encontrada');
      }
    }
    connection.end(); // Siempre cerrar conexión después de ejecutar la consulta
  });
});

app.get('/asignaturas', (req, res) => {
  const connection = mysql.createConnection(credentials);
  const query = 'SELECT * FROM asignaturas';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener las asignaturas:', error);
      res.status(500).send('Error al obtener las asignaturas');
    } else {
      res.status(200).json(results);
    }
    connection.end(); // Siempre cerrar conexión después de ejecutar la consulta
  });
});

app.post('/addAsignatura', (req, res) => {
  const { nombreAsignatura, colorFondo } = req.body;

  // Crear conexión a la base de datos
  const connection = mysql.createConnection(credentials);

  // Verificar si ya existe una asignatura con el mismo NombreAsignatura
  const verificaExistenciaQuery = 'SELECT * FROM asignaturas WHERE NombreAsignatura = ?';
  connection.query(verificaExistenciaQuery, [nombreAsignatura], (error, results) => {
      if (error) {
          console.error('Error al verificar existencia de asignatura:', error);
          res.status(500).send('Error al verificar existencia de asignatura');
          connection.end(); // Cerrar conexión en caso de error
      } else {
          if (results.length > 0) {
              // Ya existe una asignatura con ese NombreAsignatura
              res.status(409).send('Ya existe una asignatura con ese nombre');
              connection.end(); // Cerrar conexión después de enviar respuesta
          } else {
              // Insertar la nueva asignatura en la base de datos
              const insertAsignaturaQuery = 'INSERT INTO asignaturas (NombreAsignatura, ColorFondo) VALUES (?, ?)';
              const params = [nombreAsignatura, colorFondo];

              connection.query(insertAsignaturaQuery, params, (insertError, insertResults) => {
                  if (insertError) {
                      console.error('Error al agregar la asignatura:', insertError);
                      res.status(500).send('Error al agregar la asignatura');
                  } else {
                      console.log('Asignatura agregada correctamente');
                      res.status(200).send('Asignatura agregada correctamente');
                  }
                  connection.end(); // Siempre cerrar conexión después de ejecutar la consulta
              });
          }
      }
  });
});


app.put('/editAsignatura', (req, res) => {
  const { NumAsignatura, NombreAsignatura, ColorFondo } = req.body;
  const connection = mysql.createConnection(credentials);

  const updateAsignaturaQuery = 'UPDATE asignaturas SET NombreAsignatura = ?, ColorFondo = ? WHERE NumAsignatura = ?';
  const params = [NombreAsignatura, ColorFondo, NumAsignatura];

  connection.query(updateAsignaturaQuery, params, (error, results, fields) => {
    if (error) {
      console.error('Error al editar la asignatura:', error);
      res.status(500).send('Error al editar la asignatura');
    } else {
      console.log('Asignatura editada correctamente');
      res.status(200).send('Asignatura editada correctamente');
    }
  });

  connection.end();
});

app.delete("/eliminarAsignatura", (req, res) => {
  const { NumAsignatura, NombreAsignatura } = req.body;
  const connection = mysql.createConnection(credentials);

  // Verificar si la asignatura existe antes de eliminarla
  const verificaExistenciaQuery =
    "SELECT * FROM asignaturas WHERE NumAsignatura = ? AND NombreAsignatura = ?";
  connection.query(
    verificaExistenciaQuery,
    [NumAsignatura, NombreAsignatura],
    (error, results) => {
      if (error) {
        console.error("Error al verificar existencia de asignatura:", error);
        res.status(500).send("Error al verificar existencia de asignatura");
      } else {
        if (results.length === 0) {
          // No se encontró una asignatura con esos parámetros
          res.status(404).send("No se encontró la asignatura especificada");
        } else {
          // Eliminar la asignatura de la base de datos
          const deleteAsignaturaQuery = "DELETE FROM asignaturas WHERE NumAsignatura = ? AND NombreAsignatura = ?";
          connection.query(
            deleteAsignaturaQuery,
            [NumAsignatura, NombreAsignatura],
            (deleteError, deleteResults) => {
              if (deleteError) {
                console.error("Error al eliminar la asignatura:", deleteError);
                res.status(500).send("Error al eliminar la asignatura");
              } else {
                console.log("Asignatura eliminada correctamente");
                res.status(200).send("Asignatura eliminada correctamente");
              }
            }
          );
        }
      }
      // Cerrar la conexión a la base de datos después de finalizar todas las consultas
      connection.end();
    }
  );
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto: ${PORT}.`);
});

const TelegramBot = require('node-telegram-bot-api');
const mysql = require('mysql2');

// Token del bot
const TOKEN = '7927709149:AAHPOoiQ0Q-Uwy8QUJrAfUaPQRk0tmmy4Ac';
const bot = new TelegramBot(TOKEN, { polling: true });

// Estado de usuario
const userSelections = {};
const activeChatIds = new Set();
const respuestasPendientes = {};
const preguntasPendientes = {};
let codigo_usuario = null; // Aquí guardamos una pregunta por usuario.

// Conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chatbot_medico'
});

// Menús dinámicos// clave: `${chatId}_${idPregunta}`, valor: frecuencia en horas

let mainMenu = [];
let subMenu = {};
let subSubMenu = {};
let comandosBot = [];
// Variables globales necesarias (asegúrate de tenerlas definidas en tu código)
const frecuenciasPersonalizadas = {}; // Guarda frecuencias personalizadas por chatId y pregunta
const intervalosPorUsuarioPregunta = {}; // Guarda intervalos activos por chatId y pregunta

// Función para iniciar recordatorio personalizado por usuario y pregunta
function iniciarRecordatorioParaUsuarioPregunta(chatId, row) {
    const key = `${chatId}_${row.id}`;

    // Limpiar intervalo previo si existe
    if (intervalosPorUsuarioPregunta[key]) {
        clearInterval(intervalosPorUsuarioPregunta[key]);
    }

    // Usar frecuencia personalizada si existe, sino la estándar de la tabla
    const freqHoras = frecuenciasPersonalizadas[key] || row.frecuencia_horas;
    const frecuenciaMs = freqHoras * 60 * 60 * 1000;

    intervalosPorUsuarioPregunta[key] = setInterval(() => {
        if (userSelections[chatId]?.abierta || userSelections[chatId]?.enFlujoSinFrecuencia) {
            console.log(`⏸️ Omitida pregunta de frecuencia para ${chatId} (flujo sin frecuencia activo).`);
            return;
        }

        // Reemplazar pregunta pendiente
        preguntasPendientes[chatId] = {
            pregunta: row.pregunta,
            id_pregunta: row.id
        };

        // Consultar opciones para la pregunta
        const opcionesQuery = `SELECT respuesta_1, respuesta_2, respuesta_3, respuesta_4 FROM opciones_preguntas_frecuencia WHERE id_pregunta = ?`;

        connection.query(opcionesQuery, [row.id], (opcionesError, opcionesResults) => {
            if (opcionesError) {
                console.error('Error al consultar las opciones de respuesta:', opcionesError);
                return;
            }

            if (opcionesResults.length > 0) {
                const opciones = opcionesResults[0];
                const opcionesBotones = [];

                if (opciones.respuesta_1) {
                    opcionesBotones.push([{ text: opciones.respuesta_1, callback_data: `respuesta_1_${row.id}` }]);
                }
                if (opciones.respuesta_2) {
                    opcionesBotones.push([{ text: opciones.respuesta_2, callback_data: `respuesta_2_${row.id}` }]);
                }
                if (opciones.respuesta_3) {
                    opcionesBotones.push([{ text: opciones.respuesta_3, callback_data: `respuesta_3_${row.id}` }]);
                }
                if (opciones.respuesta_4) {
                    opcionesBotones.push([{ text: opciones.respuesta_4, callback_data: `respuesta_4_${row.id}` }]);
                }

                bot.sendMessage(chatId, `🕒 Recordatorio: ${row.pregunta}\n\nElige una opción:`, {
                    reply_markup: { inline_keyboard: opcionesBotones }
                });
            }
        });
    }, frecuenciaMs);
}

// Cargar menús desde la base de datos
function cargarMainMenu(callback) {
    // Asumimos que la conexión ya está abierta antes de llamar a esta función
    // Si no, llama connection.connect() fuera de aquí para evitar múltiples conexiones

    const query = `SELECT menu_1, menu_2, menu_3, abierta FROM preguntas_sin_frecuencia`;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return;
        }

        const preguntas = results.map(row => ({
            menu_1: row.menu_1,
            menu_2: row.menu_2,
            menu_3: row.menu_3,
            abierta: Boolean(row.abierta)
        }));

        // Obtener menús principales únicos
        mainMenu = [...new Set(preguntas.map(menu => menu.menu_1))];

        // Construir submenús y subsubmenús
        mainMenu.forEach(menu1Value => {
            const subMenuItems = preguntas.filter(menu => menu.menu_1 === menu1Value && menu.menu_2 !== '');
            subMenu[menu1Value] = [];

            const uniqueSubMenuItems = [...new Set(subMenuItems.map(item => item.menu_2))];
            uniqueSubMenuItems.forEach(menu_2_value => {
                subMenu[menu1Value].push({
                    text: menu_2_value,
                    callback_data: `menu_2_${menu_2_value}`
                });
            });

            subMenu[menu1Value].push({ text: "🔙 Volver", callback_data: 'volver' });

            // Construir subsubmenús para cada menú_2
            subMenu[menu1Value].forEach(menu2Value => {
                const subSubMenuItems = preguntas.filter(menu => menu.menu_2 === menu2Value.text && menu.menu_3 !== '');
                if (subSubMenuItems.length > 0) {
                    subSubMenu[menu2Value.text] = [];
                    subSubMenuItems.forEach(item => {
                        subSubMenu[menu2Value.text].push({
                            text: item.menu_3,
                            callback_data: `m3_${item.menu_3.slice(0, 20)}`
                        });
                    });
                    subSubMenu[menu2Value.text].push({ text: "🔙 Volver", callback_data: 'volver' });
                }
            });
        });

        // Cargar preguntas con frecuencia
        const frecuenciaQuery = `SELECT id, pregunta, frecuencia_horas FROM preguntas_frecuencia`;

        connection.query(frecuenciaQuery, (frecuenciaError, frecuenciaResults) => {
            if (frecuenciaError) {
                console.error('Error al consultar preguntas_frecuencia:', frecuenciaError);
                return;
            }

            console.log('Resultados de preguntas_frecuencia:');

            // Para cada pregunta y cada usuario activo, iniciar recordatorio personalizado
            frecuenciaResults.forEach(row => {
                activeChatIds.forEach(chatId => {
                    iniciarRecordatorioParaUsuarioPregunta(chatId, row);
                });
            });

            callback(); // Llamar callback al final para indicar que se cargó todo
        });
    });
}


function cargarComandos(callback) {
    const query = `SELECT * FROM comandos`;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('❌ Error al cargar comandos:', error);
            return;
        }

        comandosBot = results.map(row => ({
            id: row.id,
            comando: row.comando,
            descripcion: row.descripcion
        }));

        console.log('✅ Comandos cargados:');
        comandosBot.forEach(cmd => {
            console.log(`- /${cmd.comando} → ${cmd.descripcion}`);
        });

        callback();
    });
}

bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;
    const chatId = message.chat.id;

    if (data.startsWith('menu_1_')) {
    const menuId = data.replace('menu_1_', '');
    const subMenuItems = subMenu[menuId];

    userSelections[chatId] = userSelections[chatId] || {};
    userSelections[chatId].menu_1 = menuId;

    if (!subMenuItems || subMenuItems.length === 0 || (subMenuItems.length === 1 && subMenuItems[0].callback_data === 'volver')) {
        // No hay submenu, buscar id_pregunta con menu_1 y menu_2 vacío

        userSelections[chatId].menu_2 = '';  // menú 2 vacío
        userSelections[chatId].menu_3 = '';  // menú 3 vacío

        const { menu_1, menu_2, menu_3 } = userSelections[chatId];

        const query = `
            SELECT id, abierta
            FROM preguntas_sin_frecuencia
            WHERE menu_1 = ?
              AND (menu_2 = ? OR menu_2 IS NULL OR menu_2 = '')
              AND (menu_3 = ? OR menu_3 IS NULL OR menu_3 = '')
            LIMIT 1;
        `;

        connection.query(query, [menu_1, menu_2, menu_3], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                bot.sendMessage(chatId, 'Error al buscar la pregunta.');
                return;
            }

            if (results.length > 0) {
                const { id, abierta } = results[0];
                userSelections[chatId].id_pregunta = id;
                userSelections[chatId].abierta = abierta === 1;

                const keyboard = [
                    [{ text: "✅ Confirmar", callback_data: 'confirmar' }],
                    [{ text: "🔄 Reiniciar", callback_data: 'reiniciar' }]
                ];

                let mensaje = `Has seleccionado:\n\n`;
                mensaje += `🧭 Menú 1: ${menu_1}\n`;
                mensaje += `📋 Menú 2: (no disponible)\n`;
                mensaje += `📝 Menú 3: (no disponible)\n\n`;
                mensaje += `¿Deseas confirmar o reiniciar?`;

                bot.editMessageText(mensaje, {
                    chat_id: chatId,
                    message_id: message.message_id,
                    reply_markup: {
                        inline_keyboard: keyboard
                    }
                });
            } else {
                console.error('No se encontró el id_pregunta correspondiente');
                bot.sendMessage(chatId, 'No se encontró una pregunta con esa combinación.');
            }
        });

    }
else {
        // Si hay submenuItems, mostrar el submenú con inline_keyboard
        const keyboard = [];

        subMenuItems.forEach(item => {
            keyboard.push([{ text: item.text, callback_data: item.callback_data }]);
        });

        bot.editMessageText('Selecciona una opción:', {
            chat_id: chatId,
            message_id: message.message_id,
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
}
else if (data.startsWith('menu_2_')) {
        const subMenuId = data.replace('menu_2_', '');
        const subSubMenuItems = subSubMenu[subMenuId];

    if (!subSubMenuItems) {
    console.error('Subsubmenú no encontrado:', subMenuId);

    userSelections[chatId] = userSelections[chatId] || {};
    userSelections[chatId].menu_2 = subMenuId;
    userSelections[chatId].menu_3 = ''; // menú 3 vacío

    const selection = userSelections[chatId];
    const { menu_1, menu_2, menu_3 } = selection;

    const query = `SELECT id, abierta FROM preguntas_sin_frecuencia WHERE menu_1 = ? AND menu_2 = ? AND (menu_3 = ? OR menu_3 IS NULL OR menu_3 = '') LIMIT 1;`;

    connection.query(query, [menu_1, menu_2, menu_3], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return;
        }

        if (results.length > 0) {
            const { id, abierta } = results[0];

            // Guardamos el ID de la pregunta en la sesión
            userSelections[chatId].id_pregunta = id;
            userSelections[chatId].abierta = abierta === 1;

            const keyboard = [
                [{ text: "✅ Confirmar", callback_data: 'confirmar' }],
                [{ text: "🔄 Reiniciar", callback_data: 'reiniciar' }]
            ];

            let mensaje = `Has seleccionado:\n\n`;
            mensaje += `🧭 Menú 1: ${menu_1}\n`;
            mensaje += `📋 Menú 2: ${menu_2}\n`;
            mensaje += `📝 Menú 3: (no disponible)\n\n`;
            mensaje += `¿Deseas confirmar o reiniciar?`;

            bot.editMessageText(mensaje, {
                chat_id: chatId,
                message_id: message.message_id,
                reply_markup: {
                    inline_keyboard: keyboard
                }
            });
        } else {
            console.error('No se encontró el id_pregunta correspondiente');
            bot.sendMessage(chatId, 'No se encontró una pregunta con esa combinación.');
        }
    });

    return;
}



        userSelections[chatId] = userSelections[chatId] || {};
        userSelections[chatId].menu_2 = subMenuId;

        const keyboard = subSubMenuItems.map(item => [{ text: item.text, callback_data: item.callback_data }]);

        bot.editMessageText('Elige una opción:', {
            chat_id: chatId,
            message_id: message.message_id,
            reply_markup: {
                inline_keyboard: keyboard
            }
        });

    } else if (data.startsWith('m3_')) {
        const selectedItem = Object.values(subSubMenu).flat().find(item => item.callback_data === data);
        if (!selectedItem) {
            console.error('Elemento menu_3 no encontrado:', data);
            return;
        }

        userSelections[chatId] = userSelections[chatId] || {};
        userSelections[chatId].menu_3 = selectedItem.text;

        const keyboard = [
            [{ text: "✅ Confirmar", callback_data: 'confirmar' }],
            [{ text: "🔄 Reiniciar", callback_data: 'reiniciar' }]
        ];

        bot.editMessageText(`Has seleccionado: "${selectedItem.text}"\n¿Deseas confirmar o reiniciar?`, {
            chat_id: chatId,
            message_id: message.message_id,
            reply_markup: {
                inline_keyboard: keyboard
            }
        });

    } else if (data === 'confirmar') {
        const selection = userSelections[chatId] || {};
        const { menu_1, menu_2, menu_3 } = selection;

        const query = `SELECT id, abierta FROM preguntas_sin_frecuencia WHERE menu_1 = ? AND menu_2 = ? AND menu_3 = ? LIMIT 1;`;

        connection.query(query, [menu_1, menu_2, menu_3], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return;
            }

            if (results.length > 0) {
                const { id, abierta } = results[0];

                if (abierta === 1) {
                    bot.sendMessage(chatId, 'Por favor, ingresa tus comentarios:');
                    userSelections[chatId].abierta = true;
                    return;
                }

                const respuesta = {
                    id_usuario: codigo_usuario, 
                    id_pregunta: id,
                    fecha: (() => {
                        const fechaUTC = new Date();
                        const fechaOviedo = new Date(fechaUTC.getTime() + (2 * 60 * 60 * 1000)); 
                        const fechaFormatoLocal = fechaOviedo.toISOString().replace('T', ' ').split('.')[0];
                        return fechaFormatoLocal;
                    })(),
                    problema_1: menu_1,
                    problema_2: menu_2,
                    problema_3: menu_3,
                    comentarios: 'VACIO'
                };

                let mensaje = `Gracias por tu participación. Has seleccionado:\n\n`;
                mensaje += `🧭 Menú 1: ${menu_1}\n`;
                mensaje += `📋 Menú 2: ${menu_2}\n`;
                mensaje += `📝 Menú 3: ${menu_3}\n`;
                mensaje += `Comentarios: VACIO\n\n`;
                mensaje += '¡Hasta luego!';

                console.log('Mensaje final:', mensaje);

                bot.editMessageText(mensaje, {
                    chat_id: chatId,
                    message_id: message.message_id
                });

                const insertQuery = `INSERT INTO respuestas_sin_frecuencia (id_usuario, id_pregunta, fecha, problema_1, problema_2, problema_3, comentarios) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                connection.query(insertQuery, [
                    respuesta.id_usuario,
                    respuesta.id_pregunta,
                    respuesta.fecha,
                    respuesta.problema_1,
                    respuesta.problema_2,
                    respuesta.problema_3,
                    respuesta.comentarios
                ], (err, result) => {
                    if (err) {
                        console.error('Error al guardar la respuesta:', err);
                        return;
                    }
                    console.log('Respuesta guardada correctamente');
                });

                delete userSelections[chatId];

            } else {
                console.error('No se encontró el id_pregunta correspondiente');
            }
        });

    } else if (data === 'reiniciar') {
        delete userSelections[chatId];

        const keyboard = mainMenu.map(menuItem => [{ text: menuItem, callback_data: `menu_1_${menuItem}` }]);

        bot.editMessageText('Reiniciado. Elige una opción:', {
            chat_id: chatId,
            message_id: message.message_id,
            reply_markup: {
                inline_keyboard: keyboard
            }
        });

    } else if (data === 'volver') {
        const keyboard = mainMenu.map(menuItem => [{ text: menuItem, callback_data: `menu_1_${menuItem}` }]);

        bot.editMessageText('Elige una opción:', {
            chat_id: chatId,
            message_id: message.message_id,
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }

    // Manejo de respuestas de frecuencia
// Manejo de respuestas de frecuencia
if (data.startsWith('respuesta_')) {
    const [respuesta, idPregunta] = data.split('_').slice(1);

// Consultamos la respuesta por su ID, añadiendo nuevas columnas de frecuencia
const opcionesQuery = `
  SELECT respuesta_1, respuesta_2, respuesta_3, respuesta_4, 
         nueva_frecuencia, nueva_frecuencia2, nueva_frecuencia3, nueva_frecuencia4 
  FROM opciones_preguntas_frecuencia WHERE id_pregunta = ?`;

connection.query(opcionesQuery, [idPregunta], (opcionesError, opcionesResults) => {
    if (opcionesError) {
        console.error('Error al consultar las opciones de respuesta:', opcionesError);
        return;
    }

    if (opcionesResults.length > 0) {
        const opciones = opcionesResults[0];
        let respuestaSeleccionada = '';

        // Asignar la respuesta textual que eligió el usuario
        if (respuesta === '1' && opciones.respuesta_1) {
            respuestaSeleccionada = opciones.respuesta_1;
        } else if (respuesta === '2' && opciones.respuesta_2) {
            respuestaSeleccionada = opciones.respuesta_2;
        } else if (respuesta === '3' && opciones.respuesta_3) {
            respuestaSeleccionada = opciones.respuesta_3;
        } else if (respuesta === '4' && opciones.respuesta_4) {
            respuestaSeleccionada = opciones.respuesta_4;
        }

        // --- NUEVO: Obtener la nueva frecuencia según la respuesta ---
        let nuevaFrecuenciaSeleccionada = null;

        if (respuesta === '1' && opciones.nueva_frecuencia) {
            nuevaFrecuenciaSeleccionada = opciones.nueva_frecuencia;
        } else if (respuesta === '2' && opciones.nueva_frecuencia2) {
            nuevaFrecuenciaSeleccionada = opciones.nueva_frecuencia2;
        } else if (respuesta === '3' && opciones.nueva_frecuencia3) {
            nuevaFrecuenciaSeleccionada = opciones.nueva_frecuencia3;
        } else if (respuesta === '4' && opciones.nueva_frecuencia4) {
            nuevaFrecuenciaSeleccionada = opciones.nueva_frecuencia4;
        }
        // -------------------------------------------------------------

        const seleccionada = {
            id_pregunta: idPregunta,
            id_usuario: codigo_usuario, // Utilizamos el chatId para identificar al usuario
            respuesta: respuestaSeleccionada,
            fecha: new Date().toISOString().replace('T', ' ').split('.')[0]
        };

        console.log('💾 Respuesta de frecuencia guardada:', seleccionada);

        // Guardar en la base de datos
        const insertQuery = `INSERT INTO respuestas_frecuencia (id_pregunta, id_usuario, fecha, respuesta) VALUES (?, ?, ?, ?)`;

        connection.query(insertQuery, [
            seleccionada.id_pregunta,
            seleccionada.id_usuario,
            seleccionada.fecha,
            seleccionada.respuesta
        ], (err, result) => {
            if (err) {
                console.error('Error al guardar la respuesta:', err);
                return;
            }
            console.log('💾 Respuesta de frecuencia guardada correctamente:', seleccionada);
        });

        // --- NUEVO: Guardar la frecuencia personalizada y reiniciar el recordatorio ---
        if (nuevaFrecuenciaSeleccionada) {
            frecuenciasPersonalizadas[`${chatId}_${idPregunta}`] = nuevaFrecuenciaSeleccionada;
            console.log(`🔄 Frecuencia personalizada para ${chatId} en pregunta ${idPregunta}: ${nuevaFrecuenciaSeleccionada} horas`);

            // Reiniciar el recordatorio para esta combinación usuario-pregunta
            iniciarRecordatorioParaUsuarioPregunta(chatId, {
                id: idPregunta,
                pregunta: preguntasPendientes[chatId]?.pregunta || 'Pregunta'
            });
        }
        // -------------------------------------------------------------------------------

        // Confirmar que la respuesta fue registrada
        bot.sendMessage(chatId, '✅ Gracias, tu respuesta ha sido registrada.');
        delete preguntasPendientes[chatId]; // Eliminar la pregunta pendiente
    }
});

}

});


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    activeChatIds.add(chatId);

    const mensaje = msg.text.toLowerCase().trim();

    const comandoPrincipal = comandosBot.find(c => c.id === 1)?.comando?.toLowerCase();

    if (mensaje === `/${comandoPrincipal}`) {
        userSelections[chatId] = { enFlujoSinFrecuencia: true };
        bot.sendMessage(chatId, `🩺 ¡Hola! Iniciando el proceso de preguntas sin frecuencia.`);

        cargarMainMenu(() => {
            const keyboard = mainMenu.map(menuItem => [{ text: menuItem, callback_data: `menu_1_${menuItem}` }]);
            bot.sendMessage(chatId, 'Elige una opción:', {
                reply_markup: {
                    inline_keyboard: keyboard
                }
            });
        });

        return;
    }

    if (mensaje === '/register') {
        userSelections[chatId] = { esperandoId: true }; // Marcamos que el usuario está esperando el ID
        bot.sendMessage(chatId, '🔑 Introduzca su ID de usuario:');
        return;
    }

    // Si el usuario está esperando un ID
    if (userSelections[chatId] && userSelections[chatId].esperandoId) {
        const userIdInput = msg.text.trim();

        // Verificamos si ese código de usuario existe en la tabla `usuarios`
        const query = 'SELECT * FROM usuarios WHERE codigo_usuario = ? LIMIT 1';
        connection.query(query, [userIdInput], (err, results) => {
            if (err) {
                console.error('❌ Error al consultar la tabla usuarios:', err);
                bot.sendMessage(chatId, '⚠️ Error del sistema. Intenta nuevamente más tarde.');
                return;
            }

            if (results.length === 0) {
                bot.sendMessage(chatId, '❌ El ID introducido no existe. Por favor, verifíquelo e introdúzcalo de nuevo:');
                return; // Sigue esperando sin borrar `esperandoId`
            }

            // ID válido, guardamos globalmente
            codigo_usuario = userIdInput;

            bot.sendMessage(chatId, `✅ Tu ID *${codigo_usuario}* ha sido registrado correctamente.`, {
                parse_mode: 'Markdown'
            });

            // Desactivamos preguntas con frecuencia
            delete preguntasPendientes[chatId];

            // Terminamos el flujo de registro
            delete userSelections[chatId];
        });

        return;
    }
    // Mostrar comandos si escribe /comandos
    if (mensaje === '/comandos') {
        let texto = `📋 *Lista de comandos disponibles:*\n\n`;
        comandosBot.forEach(c => {
            texto += `🔹 /${c.comando} — ${c.descripcion}\n`;
        });
        bot.sendMessage(chatId, texto, { parse_mode: 'Markdown' });
        return;
    }

    // 2. Si hay una pregunta automática pendiente, la respondemos aquí
    if (preguntasPendientes[chatId]) {
        const respuestaTexto = msg.text;
        const pregunta = preguntasPendientes[chatId].pregunta;
        const idPregunta = preguntasPendientes[chatId].id_pregunta;
        const fechaUTC = new Date();
        const fechaOviedo = new Date(fechaUTC.getTime() + (2 * 60 * 60 * 1000)); 
        const fechaFormatoLocal = fechaOviedo.toISOString().replace('T', ' ').split('.')[0]; 
        
        const respuesta = {
            id_pregunta: idPregunta,
            id_usuario: codigo_usuario,
            pregunta: pregunta,
            respuesta: respuestaTexto,
            fecha: fechaFormatoLocal
        };

        console.log('💾 Respuesta de frecuencia guardada:', respuesta);

        // Guardar en base de datos
        const insertQuery = `INSERT INTO respuestas_frecuencia (id_pregunta, id_usuario, fecha, respuesta) VALUES (?, ?, ?, ?)`;

        connection.query(insertQuery, [
            respuesta.id_pregunta,
            respuesta.id_usuario,
            respuesta.fecha,
            respuesta.respuesta
        ], (err, result) => {
            if (err) {
                console.error('Error al guardar la respuesta:', err);
                return;
            }
            console.log('💾 Respuesta de frecuencia guardada:', {
                id_pregunta: respuesta.id_pregunta,
                id_usuario: respuesta.id_usuario,
                fecha: respuesta.fecha,
                respuesta: respuesta.respuesta
            });
        });

        bot.sendMessage(chatId, '✅ Gracias, tu respuesta ha sido registrada.');
        delete preguntasPendientes[chatId];
        return;
    }

    // 3. Si el usuario está escribiendo un comentario (pregunta abierta)
    if (userSelections[chatId] && userSelections[chatId].abierta) {
        const comentario = msg.text;

        // Guardamos el comentario en el objeto de selección
        userSelections[chatId].comentarios = comentario;

        // Procedemos con el proceso de confirmación ahora que tenemos los comentarios
        const selection = userSelections[chatId];
        const { menu_1, menu_2, menu_3, comentarios } = selection;

        const query = `SELECT id FROM preguntas_sin_frecuencia WHERE menu_1 = ? AND menu_2 = ? AND menu_3 = ? LIMIT 1;`;
        connection.query(query, [menu_1, menu_2, menu_3], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return;
            }

            if (results.length > 0) {
                const idPregunta = results[0].id;

                const respuesta = {
                    id_usuario: codigo_usuario, //hay que usar chatId
                    id_pregunta: idPregunta,
                    fecha: (() => {
                        const fechaUTC = new Date();
                        const fechaOviedo = new Date(fechaUTC.getTime() + (2 * 60 * 60 * 1000));
                        const fechaFormatoLocal = fechaOviedo.toISOString().replace('T', ' ').split('.')[0];
                        return fechaFormatoLocal;
                    })(),
                    problema_1: menu_1,
                    problema_2: menu_2,
                    problema_3: menu_3,
                    comentarios: comentarios
                };

                const insertQuery = `INSERT INTO respuestas_sin_frecuencia (id_usuario, id_pregunta, fecha, problema_1, problema_2, problema_3, comentarios) VALUES (?, ?, ?, ?, ?, ?, ?)`;

                connection.query(insertQuery, [
                    respuesta.id_usuario,
                    respuesta.id_pregunta,
                    respuesta.fecha,
                    respuesta.problema_1,
                    respuesta.problema_2,
                    respuesta.problema_3,
                    respuesta.comentarios
                ], (err, result) => {
                    if (err) {
                        console.error('Error al guardar la respuesta:', err);
                        return;
                    }

                    console.log('Respuesta guardada correctamente');
                });

                const mensaje = `Gracias por tu participación. Has seleccionado:\n\n🧭 Menú 1: ${menu_1}\n📋 Menú 2: ${menu_2}\n📝 Menú 3: ${menu_3}\nComentarios: ${comentarios}\n\n¡Hasta luego!`;

                bot.sendMessage(chatId, mensaje);
                delete userSelections[chatId];
            }
        });
    }
});


cargarComandos(() => {
    cargarMainMenu(() => {
        console.log('🤖 Bot iniciado correctamente y comandos cargados.');
    });
});


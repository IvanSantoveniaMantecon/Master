-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2025 a las 00:18:49
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `chatbot_medico`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `analisis`
--

CREATE TABLE `analisis` (
  `id` int(11) NOT NULL,
  `pregunta_natural` text NOT NULL,
  `pregunta_sql` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `analisis`
--

INSERT INTO `analisis` (`id`, `pregunta_natural`, `pregunta_sql`) VALUES
(8, 'User que respondieron 3 veces a una pregunta sin frecuencia en los ultimos 3 dias', 'SELECT \n  id_usuario,\n  id_pregunta,\n  COUNT(*) AS respuestas_count\nFROM respuestas_sin_frecuencia\nWHERE fecha >= NOW() - INTERVAL 3 DAY\nGROUP BY id_usuario, id_pregunta\nHAVING respuestas_count >= 3;');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comandos`
--

CREATE TABLE `comandos` (
  `id` int(11) NOT NULL,
  `comando` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comandos`
--

INSERT INTO `comandos` (`id`, `comando`, `descripcion`) VALUES
(1, 'A', 'Comienza las preguntas sin frecuencia'),
(2, 'register', 'Comando para registrarse con el ID dado por el médico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `email_send_control`
--

CREATE TABLE `email_send_control` (
  `id` int(11) NOT NULL,
  `last_sent_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `email_send_control`
--

INSERT INTO `email_send_control` (`id`, `last_sent_at`) VALUES
(1, '2025-06-02 00:09:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`id`, `usuario`, `contrasena`) VALUES
(3, 'ivansantov@gmail.com', '$2b$10$2IgLFvxdhmETSooFwfxScenwD/iKnufkVb1QMholiws1KF77Le9P2'),
(4, 'ivansantoveniamantecon@gmail.com', '$2b$10$m82HWLELQMWqGEtaySn1peQnooZSlMPXMpGeycWJNNuPQt4k683/S'),
(5, 'UO308932@uniovi.es', '$2b$10$jQJGrwrFPZvPmAW.BeTCSOQLj9RBSLrZy2tobOkL4XTAA89gdjg22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opciones_preguntas_frecuencia`
--

CREATE TABLE `opciones_preguntas_frecuencia` (
  `id` int(11) NOT NULL,
  `id_pregunta` int(11) NOT NULL,
  `respuesta_1` text DEFAULT NULL,
  `respuesta_2` text DEFAULT NULL,
  `respuesta_3` text DEFAULT NULL,
  `respuesta_4` text DEFAULT NULL,
  `nueva_frecuencia` float DEFAULT NULL,
  `nueva_frecuencia2` float DEFAULT NULL,
  `nueva_frecuencia3` float DEFAULT NULL,
  `nueva_frecuencia4` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `opciones_preguntas_frecuencia`
--

INSERT INTO `opciones_preguntas_frecuencia` (`id`, `id_pregunta`, `respuesta_1`, `respuesta_2`, `respuesta_3`, `respuesta_4`, `nueva_frecuencia`, `nueva_frecuencia2`, `nueva_frecuencia3`, `nueva_frecuencia4`) VALUES
(1, 1, 'Nuncaa', 'Cada 6h', 'Cada 24h', 'Cada 48h', NULL, NULL, NULL, NULL),
(2, 2, 'Nunca', 'A menudo', 'Muchas veces', 'Siempre', NULL, NULL, NULL, NULL),
(11, 1, 'Nunca', 'Rara vez', 'A veces', 'Siempre', 3, NULL, NULL, NULL),
(12, 1, 'Nunca', 'A veces', 'Frecuentemente', 'Siempre', 0, NULL, NULL, NULL),
(13, 1, 'Nunca', 'A veces', 'Frecuentemente', 'Siempre', 0, 1, 2, 3),
(17, 15, 'A', 'B', 'C', 'D', 0.001, 0.005, 0.01, 1),
(18, 16, 'a', 'b', '', '', 0.02, 0.3, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas_frecuencia`
--

CREATE TABLE `preguntas_frecuencia` (
  `id` int(11) NOT NULL,
  `pregunta` varchar(255) NOT NULL,
  `frecuencia_horas` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `preguntas_frecuencia`
--

INSERT INTO `preguntas_frecuencia` (`id`, `pregunta`, `frecuencia_horas`) VALUES
(1, '¿Con qué frecuencia tiene dolor de cabeza?', 0.1),
(2, '¿Con qué frecuencia siente fatiga?', 0.05),
(15, 'PRUEBA', 0.01),
(16, 'prueba2', 0.0001);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas_sin_frecuencia`
--

CREATE TABLE `preguntas_sin_frecuencia` (
  `id` int(11) NOT NULL,
  `menu_1` varchar(100) NOT NULL,
  `menu_2` varchar(100) DEFAULT NULL,
  `menu_3` varchar(100) DEFAULT NULL,
  `abierta` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `preguntas_sin_frecuencia`
--

INSERT INTO `preguntas_sin_frecuencia` (`id`, `menu_1`, `menu_2`, `menu_3`, `abierta`) VALUES
(4, '¿Sintomas fisicos?', '¿Sensoriales y musculoesqueleticos?', 'Dolor', 1),
(7, '¿Sintomas fisicos?', '¿Sensoriales y musculoesqueleticos?', 'Oigo peor', 0),
(8, '¿Sintomas fisicos?', '¿Sensoriales y musculoesqueleticos?', 'Ruido en los oidos', 0),
(9, '¿Sintomas fisicos?', '¿Sensoriales y musculoesqueleticos?', 'Dificultad para mover', 1),
(10, '¿Sintomas fisicos?', '¿Sensoriales y musculoesqueleticos?', 'Hormigueo', 1),
(11, '¿Sintomas fisicos?', '¿Circulatorios y dermatologicos?', 'Sensacion de frio en dedos', 0),
(12, '¿Sintomas fisicos?', '¿Circulatorios y dermatologicos?', 'Caida de pelo', 0),
(13, '¿Sintomas fisicos?', '¿Problemas sexuales?', 'Problemas de ereccion', 0),
(14, '¿Sintomas fisicos?', '¿Problemas sexuales?', 'Problemas al eyacular', 1),
(17, '¿Sintomas digestivos o del sueño?', '¿Digestivos?', 'Perdida del apetito', 0),
(18, '¿Sintomas digestivos o del sueño?', '¿Digestivos?', 'Molestias despues de las comidas', 0),
(19, '¿Sintomas digestivos o del sueño?', '¿Digestivos?', 'Vomitos', 0),
(20, '¿Sintomas digestivos o del sueño?', '¿Digestivos?', 'Nauseas', 0),
(21, '¿Sintomas digestivos o del sueño?', '¿Digestivos?', 'Diarrea', 0),
(22, '¿Sintomas digestivos o del sueño?', '¿Digestivos?', 'Estreñimiento', 0),
(23, '¿Sintomas digestivos o del sueño?', '¿Al dormir?', 'Dificultad para conciliar el sueño', 0),
(24, '¿Sintomas digestivos o del sueño?', '¿Al dormir?', 'Se despierta de noche y le cuesta volver a conciliar el sueño', 0),
(33, '¿Sintomas emocionales o psicologicos?', '¿Autoimagen y autoestima?', 'No se siente a gusto con su imagen', 0),
(34, '¿Sintomas emocionales o psicologicos?', '¿Estados emocionales negativos?', 'Dificultad para mantener la calma en algunas situaciones', 0),
(35, '¿Sintomas emocionales o psicologicos?', '¿Estados emocionales negativos?', 'Sensación de ansiedad', 0),
(36, '¿Sintomas emocionales o psicologicos?', '¿Estados emocionales negativos?', 'Desánimo o desmotivación', 0),
(37, '¿Sintomas emocionales o psicologicos?', '¿Estados emocionales negativos?', 'Agobiado o desesperado', 0),
(38, '¿Sintomas emocionales o psicologicos?', '¿Problemas cognitivos y relacionales?', 'Dificultad para recordar cosas o mantener la atención', 0),
(39, '¿Sintomas emocionales o psicologicos?', '¿Problemas cognitivos y relacionales?', 'Dificultad para mantener relaciones o relacionarse', 0),
(40, '¿Sintomas emocionales o psicologicos?', '¿Factores externos?', 'Dificultades económicas', 0),
(68, 'Prueba 1', '', '', 0),
(69, 'Prueba 2', '', '', 1),
(70, 'Prueba 3', 'Prueba 3', '', 0),
(71, 'Prueba 4', 'Prueba 4', '', 1),
(72, 'Prueba 5', 'Prueba 5', 'Prueba 5', 0),
(73, 'Prueba 6', 'Prueba 6', 'Prueba 6', 1),
(74, 'Prueba 7', 'Prueba 7', 'Prueba 7', 0),
(75, 'Prueba 7', 'Prueba 7', 'Prueba 8', 1),
(76, 'Prueba 1', 'Prueba2', 'Prueba3', 0),
(77, 'Prueba 1', 'Prueba2', 'Prueba4', 0),
(78, 'Prueba 1', 'Prueba2', 'Prueba5', 0),
(79, 'Dolor', 'Cabeza', 'Cada dia', 0),
(80, 'Dolor', 'Cabeza', 'Cada 2 dias', 0),
(81, 'Dolor', 'Cabeza', 'Cada semana', 0),
(82, 'Prueba 1', 'PRUEBA2222222222', 'PRUEBA3333333333', 0),
(83, 'Prueba 1', 'PRUEBA11111111111', 'PRUEBA3333333333', 0),
(84, 'Prueba 1', 'PRUEBA11111111111', 'PRUEBA444444444', 0),
(85, 'Prueba 1', 'PRUEBA2222222222', 'PRUEBA444444444', 0),
(86, 'AAAAAAAA', 'BBBBBBBBB', '', 0),
(87, 'AAAAAAAA', 'CCCCCCCCCC', '', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas_frecuencia`
--

CREATE TABLE `respuestas_frecuencia` (
  `id` bigint(20) NOT NULL,
  `id_pregunta` int(11) NOT NULL,
  `id_usuario` varchar(100) NOT NULL,
  `fecha` datetime NOT NULL,
  `respuesta` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `respuestas_frecuencia`
--

INSERT INTO `respuestas_frecuencia` (`id`, `id_pregunta`, `id_usuario`, `fecha`, `respuesta`) VALUES
(24, 2, 'AYP3079crp', '2025-05-27 17:01:55', 'Siempre'),
(25, 2, 'AYP3079crp', '2025-05-27 17:02:05', 'Nunca'),
(29, 2, 'AYP3079crp', '2025-05-27 17:02:21', 'Muchas veces'),
(41, 15, 'YYC8665xoz', '2025-05-29 12:37:29', 'A'),
(42, 15, 'YYC8665xoz', '2025-05-29 12:37:35', 'B'),
(43, 15, 'YYC8665xoz', '2025-05-29 12:37:56', 'C'),
(44, 15, 'YYC8665xoz', '2025-05-29 12:38:33', 'D'),
(45, 2, 'YYC8665xoz', '2025-05-29 12:39:57', 'A menudo'),
(46, 16, 'YYC8665xoz', '2025-05-29 12:41:20', 'a'),
(47, 15, 'YYC8665xoz', '2025-05-29 12:41:53', 'A'),
(48, 15, 'YYC8665xoz', '2025-05-29 12:42:01', 'B'),
(49, 15, 'YYC8665xoz', '2025-05-29 12:42:22', 'C'),
(50, 16, 'YYC8665xoz', '2025-05-29 12:42:33', 'b'),
(51, 15, 'YYC8665xoz', '2025-05-29 12:43:00', 'D'),
(52, 16, 'YYC8665xoz', '2025-05-29 12:54:53', 'b'),
(53, 16, 'YYC8665xoz', '2025-05-29 17:25:28', 'b'),
(54, 16, 'YYC8665xoz', '2025-06-01 21:29:44', 'b');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas_sin_frecuencia`
--

CREATE TABLE `respuestas_sin_frecuencia` (
  `id` bigint(20) NOT NULL,
  `id_usuario` varchar(100) NOT NULL,
  `id_pregunta` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `problema_1` varchar(255) NOT NULL,
  `problema_2` varchar(255) NOT NULL,
  `problema_3` varchar(255) NOT NULL,
  `comentarios` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `respuestas_sin_frecuencia`
--

INSERT INTO `respuestas_sin_frecuencia` (`id`, `id_usuario`, `id_pregunta`, `fecha`, `problema_1`, `problema_2`, `problema_3`, `comentarios`) VALUES
(40, 'AYP3079crp', 68, '2025-05-27 18:59:07', 'Prueba 1', '', '', 'VACIO'),
(41, 'AYP3079crp', 69, '2025-05-27 18:59:21', 'Prueba 2', '', '', 'Prueba 2'),
(42, 'AYP3079crp', 70, '2025-05-27 18:59:27', 'Prueba 3', 'Prueba 3', '', 'VACIO'),
(43, 'AYP3079crp', 71, '2025-05-27 18:59:36', 'Prueba 4', 'Prueba 4', '', 'Prueba 4'),
(44, 'AYP3079crp', 72, '2025-05-27 18:59:43', 'Prueba 5', 'Prueba 5', 'Prueba 5', 'VACIO'),
(45, 'AYP3079crp', 73, '2025-05-27 18:59:56', 'Prueba 6', 'Prueba 6', 'Prueba 6', 'Prueba 6'),
(46, 'AYP3079crp', 75, '2025-05-27 19:00:14', 'Prueba 7', 'Prueba 7', 'Prueba 8', 'Prueba 8'),
(47, 'AYP3079crp', 74, '2025-05-27 19:00:26', 'Prueba 7', 'Prueba 7', 'Prueba 7', 'VACIO'),
(48, 'GNS7696min', 68, '2025-05-27 19:22:31', 'Prueba 1', '', '', 'VACIO'),
(49, 'PSN1635wit', 70, '2025-05-28 18:40:42', 'Prueba 3', 'Prueba 3', '', 'VACIO'),
(50, 'YYC8665xoz', 79, '2025-05-28 18:48:12', 'Dolor', 'Cabeza', 'Cada dia', 'VACIO'),
(51, 'YYC8665xoz', 79, '2025-05-28 18:48:19', 'Dolor', 'Cabeza', 'Cada dia', 'VACIO'),
(52, 'YYC8665xoz', 79, '2025-05-28 18:48:26', 'Dolor', 'Cabeza', 'Cada dia', 'VACIO'),
(53, 'YYC8665xoz', 86, '2025-05-29 14:31:20', 'AAAAAAAA', 'BBBBBBBBB', '', 'VACIO'),
(54, 'YYC8665xoz', 87, '2025-05-29 14:34:11', 'AAAAAAAA', 'CCCCCCCCCC', '', 'VACIO'),
(55, 'YYC8665xoz', 72, '2025-05-29 14:36:55', 'Prueba 5', 'Prueba 5', 'Prueba 5', 'VACIO'),
(56, 'YYC8665xoz', 74, '2025-05-29 14:41:18', 'Prueba 7', 'Prueba 7', 'Prueba 7', 'VACIO'),
(57, 'YYC8665xoz', 81, '2025-05-29 14:54:51', 'Dolor', 'Cabeza', 'Cada semana', 'VACIO'),
(58, 'YYC8665xoz', 86, '2025-05-29 19:25:26', 'AAAAAAAA', 'BBBBBBBBB', '', 'VACIO'),
(59, 'YYC8665xoz', 86, '2025-05-29 19:25:34', 'AAAAAAAA', 'BBBBBBBBB', '', 'VACIO'),
(60, 'YYC8665xoz', 86, '2025-05-29 19:25:40', 'AAAAAAAA', 'BBBBBBBBB', '', 'VACIO'),
(61, 'YYC8665xoz', 81, '2025-06-01 23:29:42', 'Dolor', 'Cabeza', 'Cada semana', 'VACIO'),
(62, 'YYC8665xoz', 81, '2025-06-01 23:29:52', 'Dolor', 'Cabeza', 'Cada semana', 'VACIO'),
(63, 'YYC8665xoz', 81, '2025-06-01 23:29:58', 'Dolor', 'Cabeza', 'Cada semana', 'VACIO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `codigo_usuario` varchar(100) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `codigo_usuario`, `fecha_registro`) VALUES
(9, 'YYC8665xoz', '2025-05-13 17:26:56'),
(10, 'GNS7696min', '2025-05-13 17:26:59'),
(11, 'PSN1635wit', '2025-05-13 17:27:00'),
(13, 'AYP3079crp', '2025-05-18 15:12:51'),
(14, 'CBL5425cam', '2025-05-27 16:36:37'),
(15, 'SNJ1592isb', '2025-05-27 17:03:52'),
(16, 'DPY8508wam', '2025-05-27 17:03:52'),
(17, 'EJN3344chw', '2025-05-27 17:03:52'),
(18, 'UDZ5414gvb', '2025-05-27 17:03:53'),
(19, 'UAW4620gug', '2025-05-27 17:03:53'),
(20, 'CWK7406gif', '2025-05-27 17:03:53'),
(21, 'PBS9728unl', '2025-05-27 17:03:58'),
(22, 'WRA4904rya', '2025-05-27 17:03:58'),
(23, 'YXT8084zaw', '2025-05-27 17:03:58'),
(24, 'YVE2806ggd', '2025-05-27 17:03:58');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `analisis`
--
ALTER TABLE `analisis`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comandos`
--
ALTER TABLE `comandos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `email_send_control`
--
ALTER TABLE `email_send_control`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- Indices de la tabla `opciones_preguntas_frecuencia`
--
ALTER TABLE `opciones_preguntas_frecuencia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pregunta` (`id_pregunta`);

--
-- Indices de la tabla `preguntas_frecuencia`
--
ALTER TABLE `preguntas_frecuencia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `preguntas_sin_frecuencia`
--
ALTER TABLE `preguntas_sin_frecuencia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `respuestas_frecuencia`
--
ALTER TABLE `respuestas_frecuencia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pregunta` (`id_pregunta`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `respuestas_sin_frecuencia`
--
ALTER TABLE `respuestas_sin_frecuencia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_pregunta` (`id_pregunta`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo_usuario` (`codigo_usuario`),
  ADD KEY `idx_codigo_usuario` (`codigo_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `analisis`
--
ALTER TABLE `analisis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `comandos`
--
ALTER TABLE `comandos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `email_send_control`
--
ALTER TABLE `email_send_control`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `opciones_preguntas_frecuencia`
--
ALTER TABLE `opciones_preguntas_frecuencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `preguntas_frecuencia`
--
ALTER TABLE `preguntas_frecuencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `preguntas_sin_frecuencia`
--
ALTER TABLE `preguntas_sin_frecuencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT de la tabla `respuestas_frecuencia`
--
ALTER TABLE `respuestas_frecuencia`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `respuestas_sin_frecuencia`
--
ALTER TABLE `respuestas_sin_frecuencia`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `opciones_preguntas_frecuencia`
--
ALTER TABLE `opciones_preguntas_frecuencia`
  ADD CONSTRAINT `opciones_preguntas_frecuencia_ibfk_1` FOREIGN KEY (`id_pregunta`) REFERENCES `preguntas_frecuencia` (`id`);

--
-- Filtros para la tabla `respuestas_frecuencia`
--
ALTER TABLE `respuestas_frecuencia`
  ADD CONSTRAINT `fk_codigo_usuario_frecuencia` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`codigo_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `respuestas_frecuencia_ibfk_1` FOREIGN KEY (`id_pregunta`) REFERENCES `preguntas_frecuencia` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `respuestas_sin_frecuencia`
--
ALTER TABLE `respuestas_sin_frecuencia`
  ADD CONSTRAINT `fk_codigo_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`codigo_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `respuestas_sin_frecuencia_ibfk_2` FOREIGN KEY (`id_pregunta`) REFERENCES `preguntas_sin_frecuencia` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

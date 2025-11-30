import React, { useState } from 'react';
import { Card, Input, Button, Typography, message, Row, Col } from 'antd';
import api from '../services/api';
import './styles/CrearPreguntaConFrecuencia.css';

const { Title } = Typography;

const CrearPreguntaConFrecuencia = () => {
  const [pregunta, setPregunta] = useState('');
  const [frecuenciaHoras, setFrecuenciaHoras] = useState('');
  const [respuestas, setRespuestas] = useState(['', '', '', '']);
  const [frecuencias, setFrecuencias] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleRespuestaChange = (index, value) => {
    const nuevas = [...respuestas];
    nuevas[index] = value;
    setRespuestas(nuevas);
  };

  const handleFrecuenciaChange = (index, value) => {
    const nuevas = [...frecuencias];
    nuevas[index] = value;
    setFrecuencias(nuevas);
  };

  const handleSubmit = async () => {
    if (!pregunta.trim() || !frecuenciaHoras || !respuestas[0] || !frecuencias[0]) {
      message.warning('La pregunta, la frecuencia general, la respuesta 1 y su frecuencia son obligatorias.');
      return;
    }

    setLoading(true);
    try {
      // 1. Crear la pregunta
      const res = await api.post('/preguntas_frecuencia', {
        pregunta: pregunta.trim(),
        frecuencia_horas: parseFloat(frecuenciaHoras),
      });

      const idPregunta = res.data?.id;
      if (!idPregunta) throw new Error('No se recibió el ID de la pregunta');

      // 2. Enviar las respuestas asociadas con sus frecuencias (pueden estar vacías salvo la 1)
      await api.post('/opciones_preguntas_frecuencia', {
        id_pregunta: idPregunta,
        respuesta_1: respuestas[0],
        respuesta_2: respuestas[1] || null,
        respuesta_3: respuestas[2] || null,
        respuesta_4: respuestas[3] || null,
        nueva_frecuencia: parseFloat(frecuencias[0]),
        nueva_frecuencia2: frecuencias[1] ? parseFloat(frecuencias[1]) : null,
        nueva_frecuencia3: frecuencias[2] ? parseFloat(frecuencias[2]) : null,
        nueva_frecuencia4: frecuencias[3] ? parseFloat(frecuencias[3]) : null,
      });

      message.success('Pregunta y opciones creadas correctamente.');
      setPregunta('');
      setFrecuenciaHoras('');
      setRespuestas(['', '', '', '']);
      setFrecuencias(['', '', '', '']);
    } catch (error) {
      console.error('Error al crear pregunta o respuestas:', error);
      message.error('Hubo un error al crear la pregunta o las opciones.');
    }
    setLoading(false);
  };

  return (
    <div className="crear-pregunta-frecuencia-container">
      <Card className="crear-pregunta-frecuencia-card">
        <Title level={3}>Crear Pregunta con Frecuencia</Title>

        <Input
          placeholder="Pregunta"
          value={pregunta}
          onChange={e => setPregunta(e.target.value)}
          className="input-pregunta"
        />

        <Input
          placeholder="Frecuencia general en horas (ej. 0.001)"
          value={frecuenciaHoras}
          onChange={e => setFrecuenciaHoras(e.target.value)}
          className="input-pregunta"
        />

        <Title level={4}>Opciones de respuesta</Title>
        {respuestas.map((respuesta, i) => (
          <Row gutter={8} key={i} className="input-respuesta-row">
            <Col span={16}>
              <Input
                placeholder={`Respuesta ${i + 1}`}
                value={respuesta}
                onChange={e => handleRespuestaChange(i, e.target.value)}
                className="input-respuesta"
              />
            </Col>
            <Col span={8}>
              <Input
                placeholder={`Freq ${i + 1}`}
                value={frecuencias[i]}
                onChange={e => handleFrecuenciaChange(i, e.target.value)}
              />
            </Col>
          </Row>
        ))}

        <Button
          type="primary"
          block
          onClick={handleSubmit}
          loading={loading}
          className="btn-crear"
        >
          Crear Pregunta
        </Button>
      </Card>
    </div>
  );
};

export default CrearPreguntaConFrecuencia;

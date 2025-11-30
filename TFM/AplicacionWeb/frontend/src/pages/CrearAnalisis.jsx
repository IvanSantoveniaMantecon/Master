import React, { useState } from 'react';
import { Card, Input, Button, Typography, message } from 'antd';
import api from '../services/api';
import './styles/CrearAnalisis.css';

const { Title } = Typography;

const CrearAnalisis = () => {
  const [preguntaNatural, setPreguntaNatural] = useState('');
  const [preguntaSQL, setPreguntaSQL] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCrear = async () => {
    if (!preguntaNatural.trim() || !preguntaSQL.trim()) {
      message.warning('Por favor completa ambos campos.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/analisis', {
        pregunta_natural: preguntaNatural,
        pregunta_sql: preguntaSQL,
      });
      message.success('Análisis creado correctamente.');
      setPreguntaNatural('');
      setPreguntaSQL('');
    } catch (error) {
      console.error(error);
      message.error('Error al crear el análisis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crear-analisis-container">
      <Card className="crear-analisis-card">
        <Title level={3}>Crear nuevo Análisis</Title>
        <label>Pregunta natural:</label>
        <Input.TextArea
          rows={3}
          value={preguntaNatural}
          onChange={(e) => setPreguntaNatural(e.target.value)}
          placeholder="Escribe la pregunta en lenguaje natural"
        />

        <label>Consulta SQL:</label>
        <Input.TextArea
          rows={4}
          value={preguntaSQL}
          onChange={(e) => setPreguntaSQL(e.target.value)}
          placeholder="Escribe la consulta SQL"
        />

        <Button
          type="primary"
          onClick={handleCrear}
          loading={loading}
          className="crear-btn"
        >
          Crear análisis
        </Button>
      </Card>
    </div>
  );
};

export default CrearAnalisis;

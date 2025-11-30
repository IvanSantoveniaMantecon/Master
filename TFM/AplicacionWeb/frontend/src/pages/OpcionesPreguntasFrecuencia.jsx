import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Form, Input, Card, message, Button, Row, Col } from 'antd';
import api from '../services/api';
import './styles/OpcionesPreguntasFrecuencia.css';

const OpcionesPreguntasFrecuencia = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const idPregunta = searchParams.get('id');
  const textoPregunta = searchParams.get('pregunta');

  const [opciones, setOpciones] = useState(null);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOpciones = async () => {
      try {
        const response = await api.get('/opciones_preguntas_frecuencia');
        const matched = response.data.find(o => o.id_pregunta.toString() === idPregunta);
        if (matched) {
          setOpciones(matched);
          form.setFieldsValue(matched);
          setIsEditing(false);
        } else {
          setOpciones(null);
          form.resetFields();
          setIsEditing(true);
        }
      } catch (error) {
        message.error('Error al cargar las opciones.');
      }
    };

    fetchOpciones();
  }, [idPregunta, form]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const payload = {
        id_pregunta: parseInt(idPregunta),
        respuesta_1: values.respuesta_1,
        respuesta_2: values.respuesta_2,
        respuesta_3: values.respuesta_3 || '',
        respuesta_4: values.respuesta_4 || '',
        nueva_frecuencia: values.nueva_frecuencia || '',
        nueva_frecuencia2: values.nueva_frecuencia2 || '',
        nueva_frecuencia3: values.nueva_frecuencia3 || '',
        nueva_frecuencia4: values.nueva_frecuencia4 || ''
      };

      if (opciones) {
        await api.put(`/opciones_preguntas_frecuencia/${opciones.id}`, payload);
        message.success('Opciones actualizadas correctamente.');
        setOpciones({ ...opciones, ...values });
      } else {
        await api.post('/opciones_preguntas_frecuencia', payload);
        message.success('Opciones creadas correctamente.');

        const response = await api.get('/opciones_preguntas_frecuencia');
        const matched = response.data.find(o => o.id_pregunta.toString() === idPregunta);
        if (matched) {
          setOpciones(matched);
          form.setFieldsValue(matched);
          setIsEditing(false);
        }
      }
    } catch (error) {
      message.error('Error al guardar las opciones. Asegúrate de que las respuestas 1 y 2 estén completadas.');
    } finally {
      setLoading(false);
    }
  };

  const handleVolver = () => {
    navigate('/dashboard-preguntas-con-frecuencia');
  };

  return (
    <div className="opciones-wrapper">
      <Card
        title={`Opciones para: ${textoPregunta}`}
        bordered
        className="opciones-card"
        extra={
          <div className="card-actions">
            <Button onClick={handleVolver} style={{ marginRight: 8 }}>
              Volver al Dashboard
            </Button>
            {isEditing ? (
              <Button type="primary" onClick={handleSave} loading={loading}>
                {opciones ? 'Guardar' : 'Crear opciones'}
              </Button>
            ) : (
              <Button onClick={handleEdit}>Editar</Button>
            )}
          </div>
        }
      >
        <Form form={form} layout="vertical">
          {[1, 2, 3, 4].map(num => (
            <Row gutter={16} key={num}>
              <Col span={12}>
                <Form.Item
                  name={`respuesta_${num}`}
                  label={`Respuesta ${num}`}
                  rules={num <= 2 ? [{ required: true, message: `Respuesta ${num} es obligatoria` }] : []}
                >
                  <Input disabled={!isEditing} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={`nueva_frecuencia${num === 1 ? '' : num}`}
                  label={`Nueva Frecuencia ${num}`}
                >
                  <Input disabled={!isEditing} />
                </Form.Item>
              </Col>
            </Row>
          ))}
        </Form>
      </Card>
    </div>
  );
};

export default OpcionesPreguntasFrecuencia;

import React, { useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './styles/Signup.css';

function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      await api.post('/medicos', {
        usuario: values.usuario,
        contrasena: values.contrasena,
      });

      message.success('Registro exitoso');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message || 'Error al registrar');
      } else {
        message.error('Error al conectar con el servidor');
      }
    }

    setLoading(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <Card title="Registro Médico" style={{ width: 300 }}>
          <Form name="signup" onFinish={onFinish} layout="vertical">
            
            <Form.Item
              label="Usuario (Correo electrónico)"
              name="usuario"
              rules={[
                { required: true, message: 'Por favor ingresa tu correo electrónico!' },
                { type: 'email', message: 'Por favor ingresa un correo electrónico válido!' },
              ]}
            >
              <Input placeholder="ejemplo@empresa.com" />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="contrasena"
              rules={[
                { required: true, message: 'Por favor ingresa tu contraseña!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Registrar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default SignupPage;

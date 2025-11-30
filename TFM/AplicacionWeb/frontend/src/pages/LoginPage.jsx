import React, { useState, useContext } from 'react';
import { Form, Input, Button, message, Card, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './styles/Login.css'; // ✅ Usa los estilos propios del login
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('/login', {
        usuario: values.usuario,
        contrasena: values.contrasena,
      });

      if (response.data) {
        login(response.data);
        message.success('Inicio de sesión exitoso');
        navigate('/dashboard');
      } else {
        message.error('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al hacer el login:', error);
      message.error('Hubo un error al iniciar sesión');
    }
    setLoading(false);
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Card title="Iniciar sesión">
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="Usuario"
              name="usuario"
              rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="contrasena"
              rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Iniciar sesión
              </Button>
            </Form.Item>
          </Form>

          <Divider />
          <Button type="link" block onClick={handleSignupRedirect}>
            Crear nuevo médico
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;

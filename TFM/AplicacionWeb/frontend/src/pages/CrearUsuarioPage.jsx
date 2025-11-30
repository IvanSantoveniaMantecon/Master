import React, { useState } from 'react';
import { Button, Card, Typography, message, Spin } from 'antd';
import api from '../services/api';
import './styles/CrearUsuario.css'; // 👈 importa el CSS

const { Title, Paragraph } = Typography;

const CrearUsuarioPage = () => {
  const [codigoGenerado, setCodigoGenerado] = useState('');
  const [loading, setLoading] = useState(false);

  const generarCodigo = () => {
    const letrasMayus = () =>
      Array(3).fill().map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
    const numeros = () => Math.floor(1000 + Math.random() * 9000); // 4 dígitos
    const letrasMinus = () =>
      Array(3).fill().map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
    return `${letrasMayus()}${numeros()}${letrasMinus()}`;
  };

  const crearUsuario = async () => {
    setLoading(true);
    try {
      const res = await api.get('/usuarios');
      const existentes = res.data.map(u => u.codigo_usuario);

      let nuevoCodigo = '';
      let intentos = 0;
      do {
        nuevoCodigo = generarCodigo();
        intentos++;
      } while (existentes.includes(nuevoCodigo) && intentos < 10);

      if (existentes.includes(nuevoCodigo)) {
        message.error('No se pudo generar un código único, intenta nuevamente.');
        setLoading(false);
        return;
      }

      await api.post('/usuarios', { codigo_usuario: nuevoCodigo });
      setCodigoGenerado(nuevoCodigo);
      message.success(`Usuario creado con código: ${nuevoCodigo}`);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      message.error('Hubo un error al crear el usuario.');
    }
    setLoading(false);
  };

  return (
    <div className="crear-usuario-container">
      <Card title="Crear nuevo usuario" className="crear-usuario-card">
        <Paragraph>Haz clic para generar un nuevo código único y crear un usuario.</Paragraph>
        <Button type="primary" block onClick={crearUsuario} loading={loading}>
          Generar y Crear Usuario
        </Button>
        {loading && <Spin style={{ marginTop: 20 }} />}
        {codigoGenerado && (
          <div className="codigo-generado">
            <Title level={4}>Código generado:</Title>
            <Paragraph copyable strong>{codigoGenerado}</Paragraph>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CrearUsuarioPage;

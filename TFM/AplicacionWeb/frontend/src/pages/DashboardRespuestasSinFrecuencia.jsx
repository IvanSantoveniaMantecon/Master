import React, { useEffect, useState } from 'react';
import { Table, Button, Select, message, Popconfirm, Tooltip } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../services/api';
import './styles/DashboardRespuestasSinFrecuencia.css';

const { Option } = Select;

const DashboardRespuestasSinFrecuencia = () => {
  const [respuestas, setRespuestas] = useState([]);
  const [filteredRespuestas, setFilteredRespuestas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState('all');
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRespuestas();
  }, []);

  const fetchRespuestas = async () => {
    setLoading(true);
    try {
      const response = await api.get('/respuestas_sin_frecuencia');
      const data = response.data || [];
      setRespuestas(data);
      setFilteredRespuestas(data);

      const uniqueUsers = [...new Set(data.map(item => item.id_usuario))];
      setUsuarios(uniqueUsers);
    } catch {
      message.error('Error al cargar respuestas.');
    } finally {
      setLoading(false);
    }
  };

  const handleUsuarioChange = (value) => {
    setSelectedUsuario(value);
    if (value === 'all') {
      setFilteredRespuestas(respuestas);
    } else {
      setFilteredRespuestas(respuestas.filter(r => r.id_usuario === value));
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/respuestas_sin_frecuencia/${id}`);
      message.success('Respuesta eliminada.');
      fetchRespuestas();
    } catch {
      message.error('Error al eliminar la respuesta.');
    }
  };

  const generateFilters = (key) => {
    const unique = [...new Set(respuestas.map(item => item[key]).filter(Boolean))];
    return unique.map(value => ({ text: value, value }));
  };

  const getFechaFilters = () => {
    const fechas = [...new Set(
      respuestas.map(r => new Date(r.fecha).toISOString().split('T')[0])
    )];
    return fechas.map(date => ({ text: date, value: date }));
  };

  const columns = [
    {
      title: 'Usuario',
      dataIndex: 'id_usuario',
      key: 'id_usuario',
      filters: usuarios.map(user => ({ text: user, value: user })),
      onFilter: (value, record) => record.id_usuario === value,
    },
    {
      title: 'Problema 1',
      dataIndex: 'problema_1',
      key: 'problema_1',
      filters: generateFilters('problema_1'),
      onFilter: (value, record) => record.problema_1 === value,
    },
    {
      title: 'Problema 2',
      dataIndex: 'problema_2',
      key: 'problema_2',
      filters: generateFilters('problema_2'),
      onFilter: (value, record) => record.problema_2 === value,
    },
    {
      title: 'Problema 3',
      dataIndex: 'problema_3',
      key: 'problema_3',
      filters: generateFilters('problema_3'),
      onFilter: (value, record) => record.problema_3 === value,
    },
    {
      title: 'Comentarios',
      dataIndex: 'comentarios',
      key: 'comentarios',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (text) => new Date(text).toLocaleString(),
      filters: getFechaFilters(),
      onFilter: (value, record) =>
        new Date(record.fecha).toISOString().split('T')[0] === value,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tooltip title="Ver detalles">
            <Button
              type="default"
              icon={<EyeOutlined />}
              onClick={() =>
                (window.location.href = `/detalle-respuesta?id=${record.id}`)
              }
            />
          </Tooltip>

          <Tooltip title="Eliminar respuesta">
            <Popconfirm
              title="¿Eliminar esta respuesta?"
              onConfirm={() => handleDelete(record.id)}
              okText="Sí"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="dashboard-respuestas-wrapper">
      <div className="dashboard-header">
        <h2>Respuestas Sin Frecuencia</h2>
        <div className="selector-paginacion" style={{ display: 'flex', gap: '16px' }}>
          <Select
            value={selectedUsuario}
            onChange={handleUsuarioChange}
            style={{ minWidth: 200 }}
          >
            <Option value="all">Todos los usuarios</Option>
            {usuarios.map(user => (
              <Option key={user} value={user}>{user}</Option>
            ))}
          </Select>

          <Select
            value={pageSize}
            onChange={value => setPageSize(value)}
            style={{ width: 120 }}
          >
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
            <Option value={respuestas.length}>Todas</Option>
          </Select>
        </div>
      </div>

      <div className="tabla-con-margen">
        <Table
          dataSource={filteredRespuestas}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize }}
          loading={loading}
          bordered
        />
      </div>
    </div>
  );
};

export default DashboardRespuestasSinFrecuencia;

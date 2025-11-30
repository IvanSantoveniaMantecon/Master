import React, { useEffect, useState } from 'react';
import { Table, Button, Select, message, Popconfirm, Tooltip } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../services/api';
import './styles/DashboardRespuestasConFrecuencia.css';

const { Option } = Select;

const DashboardRespuestasConFrecuencia = () => {
  const [respuestas, setRespuestas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [filteredRespuestas, setFilteredRespuestas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState('all');

  useEffect(() => {
    fetchRespuestas();
  }, []);

  const fetchRespuestas = async () => {
    setLoading(true);
    try {
      const response = await api.get('/respuestas_frecuencia');
      setRespuestas(response.data || []);
      setFilteredRespuestas(response.data || []);

      const uniqueUsuarios = Array.from(new Set(response.data.map(r => r.id_usuario)));
      setUsuarios(uniqueUsuarios);
    } catch (error) {
      message.error('Error al cargar las respuestas.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/respuestas_frecuencia/${id}`);
      message.success('Respuesta eliminada.');
      const updated = respuestas.filter(r => r.id !== id);
      setRespuestas(updated);
      filterByUsuario(selectedUsuario, updated);
    } catch (error) {
      message.error('Error al eliminar la respuesta.');
    } finally {
      setLoading(false);
    }
  };

  const filterByUsuario = (usuario, data = respuestas) => {
    if (usuario === 'all') {
      setFilteredRespuestas(data);
    } else {
      setFilteredRespuestas(data.filter(r => r.id_usuario === usuario));
    }
  };

  const handleUsuarioChange = (value) => {
    setSelectedUsuario(value);
    filterByUsuario(value);
  };

  const getPreguntaIDFilters = () => {
    const unique = Array.from(new Set(respuestas.map(r => r.id_pregunta)));
    return unique.map(val => ({ text: val.toString(), value: val }));
  };

  const getRespuestaFilters = () => {
    const unique = Array.from(new Set(respuestas.map(r => r.respuesta).filter(Boolean)));
    return unique.map(val => ({ text: val, value: val }));
  };

  const getFechaFilters = () => {
    const unique = Array.from(new Set(
      respuestas.map(r => new Date(r.fecha).toISOString().split('T')[0])
    ));
    return unique.map(val => ({ text: val, value: val }));
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    {
      title: 'Usuario',
      dataIndex: 'id_usuario',
      key: 'id_usuario',
      filters: usuarios.map(u => ({ text: u, value: u })),
      onFilter: (value, record) => record.id_usuario === value,
    },
    {
      title: 'Pregunta ID',
      dataIndex: 'id_pregunta',
      key: 'id_pregunta',
      width: 100,
      filters: getPreguntaIDFilters(),
      onFilter: (value, record) => record.id_pregunta === value,
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      width: 180,
      render: (text) => new Date(text).toLocaleString(),
      filters: getFechaFilters(),
      onFilter: (value, record) =>
        new Date(record.fecha).toISOString().split('T')[0] === value,
    },
    {
      title: 'Respuesta',
      dataIndex: 'respuesta',
      key: 'respuesta',
      filters: getRespuestaFilters(),
      onFilter: (value, record) => record.respuesta === value,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      width: 150,
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
              title="¿Seguro que quieres eliminar esta respuesta?"
              onConfirm={() => handleDelete(record.id)}
              okText="Sí"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} loading={loading} />
            </Popconfirm>
          </Tooltip>
        </div>
      )
    }
  ];

  return (
    <div className="dashboard-respuestas-frecuencia-wrapper">
      <div className="dashboard-header">
        <h2>Respuestas con Frecuencia</h2>
        <div className="selector-paginacion" style={{ display: 'flex', gap: '16px' }}>
          <Select
            value={selectedUsuario}
            onChange={handleUsuarioChange}
            style={{ minWidth: 200 }}
            placeholder="Filtrar por usuario"
          >
            <Option value="all">Todos los usuarios</Option>
            {usuarios.map(u => (
              <Option key={u} value={u}>{u}</Option>
            ))}
          </Select>

          <Select
            value={pageSize}
            onChange={value => setPageSize(value === 'all' ? filteredRespuestas.length : value)}
            style={{ width: 120 }}
          >
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
            <Option value="all">Todas</Option>
          </Select>
        </div>
      </div>

      <div className="tabla-con-margen">
        <Table
          dataSource={filteredRespuestas}
          columns={columns}
          rowKey="id"
          loading={loading}
          bordered
          pagination={{
            pageSize,
            showSizeChanger: false,
          }}
        />
      </div>
    </div>
  );
};

export default DashboardRespuestasConFrecuencia;

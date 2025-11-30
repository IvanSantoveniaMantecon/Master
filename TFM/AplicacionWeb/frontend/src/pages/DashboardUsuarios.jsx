import React, { useEffect, useState } from 'react';
import { Table, Button, Select, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import api from '../services/api';
import './styles/DashboardUsuarios.css';

const { Option } = Select;

const DashboardUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await api.get('/usuarios');
      setUsuarios(response.data);
    } catch {
      message.error('Error al cargar usuarios.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/usuarios/${id}`);
      message.success('Usuario eliminado correctamente.');
      fetchUsuarios();
    } catch {
      message.error('Error al eliminar usuario.');
    } finally {
      setLoading(false);
    }
  };

  const getFechaFilters = () => {
    const fechas = [...new Set(
      usuarios.map(u => new Date(u.fecha_registro).toISOString().split('T')[0])
    )];
    return fechas.map(date => ({ text: date, value: date }));
  };

  const columns = [
    {
      title: 'Código Usuario',
      dataIndex: 'codigo_usuario',
      key: 'codigo_usuario',
    },
    {
      title: 'Fecha de Registro',
      dataIndex: 'fecha_registro',
      key: 'fecha_registro',
      render: (text) => new Date(text).toLocaleString(),
      filters: getFechaFilters(),
      onFilter: (value, record) =>
        new Date(record.fecha_registro).toISOString().split('T')[0] === value,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Popconfirm
          title="¿Seguro que quieres eliminar este usuario?"
          onConfirm={() => handleDelete(record.id)}
          okText="Sí"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  const dataToShow = pageSize === 'all' ? usuarios : usuarios.slice(0, pageSize);

  return (
    <div className="dashboard-usuarios-wrapper">
      <div className="dashboard-header">
        <h2>Listado de Usuarios</h2>
        <div className="selector-paginacion">
          <span className="controls-label">Mostrar:</span>
          <Select
            value={pageSize}
            onChange={(value) => setPageSize(value)}
            style={{ width: 120 }}
          >
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
            <Option value="all">Todos</Option>
          </Select>
        </div>
      </div>

      <div className="tabla-con-margen">
        <Table
          columns={columns}
          dataSource={dataToShow}
          rowKey="id"
          loading={loading}
          pagination={false}
          locale={{ emptyText: 'No hay usuarios' }}
          bordered
        />
      </div>
    </div>
  );
};

export default DashboardUsuarios;

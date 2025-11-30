import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Tooltip,
  Select,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../services/api';
import './styles/DashboardPreguntasConFrecuencia.css';

const { Option } = Select;

const DashboardAnalisis = () => {
  const [analisis, setAnalisis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingAnalisis, setEditingAnalisis] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState(10);
  const [deletingId, setDeletingId] = useState(null);

  const fetchAnalisis = async () => {
    setLoading(true);
    try {
      const res = await api.get('/analisis');
      setAnalisis(res.data);
    } catch (error) {
      message.error('Error al cargar los análisis.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalisis();
  }, []);

  const handleEdit = (record) => {
    setEditingAnalisis(record);
    form.setFieldsValue({
      pregunta_natural: record.pregunta_natural,
      pregunta_sql: record.pregunta_sql,
    });
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await api.put(`/analisis/${editingAnalisis.id}`, {
        pregunta_natural: values.pregunta_natural,
        pregunta_sql: values.pregunta_sql,
      });
      message.success('Análisis actualizado.');
      setIsModalVisible(false);
      fetchAnalisis();
    } catch (error) {
      message.error('Error al actualizar el análisis.');
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await api.delete(`/analisis/${id}`);
      message.success('Análisis eliminado correctamente.');
      setAnalisis((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      message.error('Error al eliminar el análisis.');
    } finally {
      setDeletingId(null);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Pregunta Natural',
      dataIndex: 'pregunta_natural',
      key: 'pregunta_natural',
      render: (text) => <div style={{ whiteSpace: 'normal' }}>{text}</div>,
    },
    {
      title: 'Consulta SQL',
      dataIndex: 'pregunta_sql',
      key: 'pregunta_sql',
      render: (text) => (
        <code
          style={{
            whiteSpace: 'pre-wrap',
            backgroundColor: '#f5f5f5',
            padding: '6px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            display: 'block',
          }}
        >
          {text}
        </code>
      ),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      width: 100,
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tooltip title="Editar análisis">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>

          <Tooltip title="Eliminar análisis">
            <Popconfirm
              title="¿Eliminar este análisis?"
              onConfirm={() => handleDelete(record.id)}
              okText="Sí"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} loading={deletingId === record.id} />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="dashboard-preguntas">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Lista de Análisis</h2>
        <div className="selector-paginacion">
          <span>Ver:</span>
          <Select
            defaultValue={10}
            onChange={(value) =>
              setPageSize(value === 'all' ? analisis.length : value)
            }
            style={{ width: 120, marginLeft: 8 }}
          >
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
            <Option value="all">Todas</Option>
          </Select>
        </div>
      </div>

      <Table
        className="tabla-con-margen"
        dataSource={analisis}
        columns={columns}
        rowKey="id"
        loading={loading}
        bordered
        pagination={{ pageSize, showSizeChanger: false }}
        locale={{ emptyText: 'No hay análisis disponibles.' }}
      />

      <Modal
        title="Editar Análisis"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleUpdate}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="pregunta_natural"
            label="Pregunta Natural"
            rules={[
              { required: true, message: 'Por favor ingresa la pregunta natural' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="pregunta_sql"
            label="Consulta SQL"
            rules={[
              { required: true, message: 'Por favor ingresa la consulta SQL' },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DashboardAnalisis;

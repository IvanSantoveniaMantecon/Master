import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm } from 'antd';
import { EditOutlined } from '@ant-design/icons'; // ⬅️ Importamos el ícono
import api from '../services/api';
import './styles/DashboardPreguntasSinFrecuencia.css';

const { Option } = Select;

const DashboardPreguntasSinFrecuencia = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingPregunta, setEditingPregunta] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [pageSize, setPageSize] = useState(10);

  const fetchPreguntas = async () => {
    setLoading(true);
    try {
      const response = await api.get('/preguntas_sin_frecuencia');
      setPreguntas(response.data);
    } catch (error) {
      message.error('Error al cargar las preguntas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreguntas();
  }, []);

  const getUniqueFilters = (data, dataIndex) => {
    const uniqueValues = Array.from(new Set(data.map(item => item[dataIndex]))).filter(v => v !== undefined && v !== null);
    return uniqueValues.map(value => ({
      text: dataIndex === 'abierta' ? (value === 1 || value === '1' ? 'Sí' : 'No') : value,
      value: value
    }));
  };

  const handleEdit = (record) => {
    setEditingPregunta(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/preguntas_sin_frecuencia/${id}`);
      message.success('Pregunta eliminada.');
      fetchPreguntas();
    } catch (error) {
      message.error('Error al eliminar la pregunta.');
    }
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await api.put(`/preguntas_sin_frecuencia/${editingPregunta.id}`, {
        menu_1: values.menu_1,
        menu_2: values.menu_2,
        menu_3: values.menu_3,
        abierta: parseInt(values.abierta)
      });
      message.success('Pregunta actualizada.');
      setIsModalVisible(false);
      fetchPreguntas();
    } catch (error) {
      message.error('Error al actualizar la pregunta.');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Menú 1',
      dataIndex: 'menu_1',
      key: 'menu_1',
      filters: getUniqueFilters(preguntas, 'menu_1'),
      onFilter: (value, record) => record.menu_1 === value,
    },
    {
      title: 'Menú 2',
      dataIndex: 'menu_2',
      key: 'menu_2',
      filters: getUniqueFilters(preguntas, 'menu_2'),
      onFilter: (value, record) => record.menu_2 === value,
    },
    {
      title: 'Menú 3',
      dataIndex: 'menu_3',
      key: 'menu_3',
      filters: getUniqueFilters(preguntas, 'menu_3'),
      onFilter: (value, record) => record.menu_3 === value,
    },
    {
      title: 'Abierta',
      dataIndex: 'abierta',
      key: 'abierta',
      filters: [
        { text: 'Sí', value: 1 },
        { text: 'No', value: 0 }
      ],
      onFilter: (value, record) => record.abierta === value,
      render: (value) => (value === 1 || value === '1' ? 'Sí' : 'No')
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <div className="acciones-btns">
          <Button
            icon={<EditOutlined />} // ⬅️ Botón con lápiz
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="¿Seguro que quieres eliminar?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sí"
            cancelText="No"
          >
            <Button danger>Eliminar</Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  return (
    <div className="dashboard-preguntas">
      <div className="dashboard-header">
        <h2>Preguntas Sin Frecuencia</h2>
        <div className="selector-paginacion">
          <span>Ver:</span>
          <Select
            defaultValue={10}
            onChange={(value) => setPageSize(value === 'all' ? preguntas.length : value)}
            style={{ width: 120, marginLeft: 8 }}
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
          dataSource={preguntas}
          columns={columns}
          rowKey="id"
          loading={loading}
          bordered
          pagination={{
            pageSize,
            showSizeChanger: false
          }}
        />
      </div>

      <Modal
        title="Editar Pregunta"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleUpdate}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="menu_1" label="Menú 1" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="menu_2" label="Menú 2">
            <Input />
          </Form.Item>
          <Form.Item name="menu_3" label="Menú 3">
            <Input />
          </Form.Item>
          <Form.Item name="abierta" label="Abierta" rules={[{ required: true }]}>
            <Select>
              <Option value={1}>Sí</Option>
              <Option value={0}>No</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DashboardPreguntasSinFrecuencia;

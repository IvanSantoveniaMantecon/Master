import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Popconfirm,
  Tooltip,
} from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import api from '../services/api';
import './styles/DashboardPreguntasConFrecuencia.css';

const { Option } = Select;

const DashboardPreguntasConFrecuencia = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingPregunta, setEditingPregunta] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState(10);

  const fetchPreguntas = async () => {
    setLoading(true);
    try {
      const response = await api.get('/preguntas_frecuencia');
      setPreguntas(response.data);
    } catch (error) {
      message.error('Error al cargar las preguntas.');
    } finally {
      setLoading(false);
    }
  };

  const fetchOpcionesByPreguntaId = async (preguntaId) => {
    try {
      const response = await api.get('/opciones_preguntas_frecuencia');
      return response.data.filter(opcion => opcion.id_pregunta === preguntaId);
    } catch (error) {
      console.error('Error al obtener las opciones:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchPreguntas();
  }, []);

  const handleEdit = (record) => {
    setEditingPregunta(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await api.put(`/preguntas_frecuencia/${editingPregunta.id}`, {
        pregunta: values.pregunta,
        frecuencia_horas: parseFloat(values.frecuencia_horas),
      });
      message.success('Pregunta actualizada.');
      setIsModalVisible(false);
      fetchPreguntas();
    } catch (error) {
      message.error('Error al actualizar la pregunta.');
    }
  };

  const handleDelete = async (preguntaId) => {
    try {
      const opcionesRelacionadas = await fetchOpcionesByPreguntaId(preguntaId);
      for (const opcion of opcionesRelacionadas) {
        await api.delete(`/opciones_preguntas_frecuencia/${opcion.id}`);
      }
      await api.delete(`/preguntas_frecuencia/${preguntaId}`);
      message.success('Pregunta y opciones eliminadas correctamente.');
      fetchPreguntas();
    } catch (error) {
      message.error('Error al eliminar la pregunta y sus opciones.');
    }
  };

  const getFrecuenciaFilters = () => {
    const unicos = Array.from(
      new Set(preguntas.map(p => p.frecuencia_horas).filter(v => v !== null && v !== undefined))
    );
    return unicos.map(value => ({
      text: value.toString(),
      value: value,
    }));
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Pregunta', dataIndex: 'pregunta', key: 'pregunta' },
    {
      title: 'Frecuencia (horas)',
      dataIndex: 'frecuencia_horas',
      key: 'frecuencia_horas',
      filters: getFrecuenciaFilters(),
      onFilter: (value, record) => record.frecuencia_horas === value,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <div className="acciones-btns">
          <Tooltip title="Editar pregunta">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>

          <Tooltip title="Eliminar pregunta">
            <Popconfirm
              title="¿Seguro que deseas eliminar?"
              onConfirm={() => handleDelete(record.id)}
              okText="Sí"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>

          <Tooltip title="Ver detalles">
            <Button
              type="default"
              icon={<EyeOutlined />}
              onClick={() =>
                (window.location.href = `/opciones-preguntas-frecuencia?id=${record.id}&pregunta=${encodeURIComponent(
                  record.pregunta
                )}`)
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="dashboard-preguntas">
      <div className="dashboard-header">
        <h2>Preguntas Con Frecuencia</h2>
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

      <Table
        dataSource={preguntas}
        columns={columns}
        rowKey="id"
        loading={loading}
        bordered
        pagination={{
          pageSize,
          showSizeChanger: false,
        }}
      />

      <Modal
        title="Editar Pregunta con Frecuencia"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleUpdate}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="pregunta"
            label="Pregunta"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="frecuencia_horas"
            label="Frecuencia (en horas)"
            rules={[{ required: true, type: 'number', min: 0.01 }]}
          >
            <InputNumber step={0.01} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DashboardPreguntasConFrecuencia;

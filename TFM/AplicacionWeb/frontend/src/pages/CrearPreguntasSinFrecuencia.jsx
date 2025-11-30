import React, { useState, useEffect } from 'react';
import { Card, AutoComplete, Select, Button, message, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import api from '../services/api';
import './styles/CrearPreguntasSinFrecuencia.css';

const { Title } = Typography;
const { Option } = Select;

const CrearPreguntasSinFrecuencia = () => {
  const [menu1, setMenu1] = useState('');
  const [menu2List, setMenu2List] = useState(['']);
  const [menu3List, setMenu3List] = useState(['']);
  const [abierta, setAbierta] = useState(0);
  const [loading, setLoading] = useState(false);

  const [opcionesMenu1, setOpcionesMenu1] = useState([]);
  const [opcionesMenu2, setOpcionesMenu2] = useState([]);
  const [opcionesMenu3, setOpcionesMenu3] = useState([]);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const res = await api.get('/preguntas_sin_frecuencia');
        const preguntas = res.data;

        const unique = (arr) => [...new Set(arr.filter(Boolean))];
        setOpcionesMenu1(unique(preguntas.map(p => p.menu_1)));
        setOpcionesMenu2(unique(preguntas.map(p => p.menu_2)));
        setOpcionesMenu3(unique(preguntas.map(p => p.menu_3)));
      } catch (error) {
        console.error('Error al obtener preguntas:', error);
      }
    };

    fetchPreguntas();
  }, []);

  const handleMenu2Change = (value, index) => {
    const newList = [...menu2List];
    newList[index] = value;
    setMenu2List(newList);
  };

  const addMenu2Field = () => {
    setMenu2List([...menu2List, '']);
  };

  const handleMenu3Change = (value, index) => {
    const newList = [...menu3List];
    newList[index] = value;
    setMenu3List(newList);
  };

  const addMenu3Field = () => {
    setMenu3List([...menu3List, '']);
  };

  const handleSubmit = async () => {
    if (!menu1.trim()) {
      message.warning('El campo Menu 1 es obligatorio.');
      return;
    }

    setLoading(true);
    try {
      const validMenu2s = menu2List.filter(m2 => m2.trim() !== '');
      const validMenu3s = menu3List.filter(m3 => m3.trim() !== '');

      const promises = [];

      if (validMenu2s.length === 0 && validMenu3s.length === 0) {
        promises.push(api.post('/preguntas_sin_frecuencia', {
          menu_1: menu1,
          menu_2: '',
          menu_3: '',
          abierta: parseInt(abierta),
        }));
      } else if (validMenu2s.length === 0) {
        validMenu3s.forEach(m3 => {
          promises.push(api.post('/preguntas_sin_frecuencia', {
            menu_1: menu1,
            menu_2: '',
            menu_3: m3,
            abierta: parseInt(abierta),
          }));
        });
      } else if (validMenu3s.length === 0) {
        validMenu2s.forEach(m2 => {
          promises.push(api.post('/preguntas_sin_frecuencia', {
            menu_1: menu1,
            menu_2: m2,
            menu_3: '',
            abierta: parseInt(abierta),
          }));
        });
      } else {
        validMenu2s.forEach(m2 => {
          validMenu3s.forEach(m3 => {
            promises.push(api.post('/preguntas_sin_frecuencia', {
              menu_1: menu1,
              menu_2: m2,
              menu_3: m3,
              abierta: parseInt(abierta),
            }));
          });
        });
      }

      await Promise.all(promises);

      message.success('Preguntas creadas correctamente.');
      setMenu1('');
      setMenu2List(['']);
      setMenu3List(['']);
      setAbierta(0);
    } catch (error) {
      console.error('Error al crear la pregunta:', error);
      message.error('Error al crear la pregunta.');
    }
    setLoading(false);
  };

  return (
    <div className="crear-pregunta-container">
      <Card className="crear-pregunta-card">
        <Title level={3}>Crear Pregunta sin Frecuencia</Title>

        <AutoComplete
          value={menu1}
          onChange={setMenu1}
          options={opcionesMenu1.map(op => ({ value: op }))}
          placeholder="Menu 1 (obligatorio)"
          className="input-pregunta"
          filterOption={(inputValue, option) =>
            option.value.toLowerCase().includes(inputValue.toLowerCase())
          }
        />

        {menu2List.map((menu2, index) => (
          <AutoComplete
            key={`menu2-${index}`}
            value={menu2}
            onChange={value => handleMenu2Change(value, index)}
            options={opcionesMenu2.map(op => ({ value: op }))}
            placeholder={`Menu 2 (opcional) ${index + 1}`}
            className="input-pregunta"
            filterOption={(inputValue, option) =>
              option.value.toLowerCase().includes(inputValue.toLowerCase())
            }
          />
        ))}
        <Button
          type="dashed"
          onClick={addMenu2Field}
          icon={<PlusOutlined />}
          style={{ width: '100%', marginBottom: 16 }}
        >
          Añadir otra respuesta para Menu 2
        </Button>

        {menu3List.map((menu3, index) => (
          <AutoComplete
            key={`menu3-${index}`}
            value={menu3}
            onChange={value => handleMenu3Change(value, index)}
            options={opcionesMenu3.map(op => ({ value: op }))}
            placeholder={`Menu 3 (opcional) ${index + 1}`}
            className="input-pregunta"
            filterOption={(inputValue, option) =>
              option.value.toLowerCase().includes(inputValue.toLowerCase())
            }
          />
        ))}
        <Button
          type="dashed"
          onClick={addMenu3Field}
          icon={<PlusOutlined />}
          style={{ width: '100%', marginBottom: 16 }}
        >
          Añadir otra respuesta para Menu 3
        </Button>

        <Select
          value={abierta}
          onChange={value => setAbierta(value)}
          className="select-abierta"
        >
          <Option value={1}>Abierta</Option>
          <Option value={0}>Cerrada</Option>
        </Select>

        <Button
          type="primary"
          block
          onClick={handleSubmit}
          loading={loading}
          className="btn-crear"
        >
          Crear pregunta con frecuencia
        </Button>
      </Card>
    </div>
  );
};

export default CrearPreguntasSinFrecuencia;

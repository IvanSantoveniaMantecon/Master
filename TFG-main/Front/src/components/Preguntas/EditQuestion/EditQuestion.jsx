import React, { useState, useEffect } from 'react';
import './EditQuestion.css';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function EditarQuestion() {
  const [NumTest, setNumTest] = useState('');
  const [Pregunta, setPregunta] = useState('');
  const [RespuestaBuena, setRespuestaBuena] = useState('');
  const [RespuestaMala1, setRespuestaMala1] = useState('');
  const [RespuestaMala2, setRespuestaMala2] = useState('');
  const [RespuestaMala3, setRespuestaMala3] = useState('');
  const [NumAsignatura, setNumAsignatura] = useState('');

  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(() => {
    const fetchAsignaturas = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_URL + '/asignaturas');
        if (!response.ok) {
          throw new Error('Error al obtener las asignaturas');
        }
        const data = await response.json();
        setAsignaturas(data);
      } catch (error) {
        console.error('Error fetching asignaturas:', error);
        // Handle error as needed
      }
    };

    fetchAsignaturas();
  }, []);

  const handleLogout = () => {
    // Eliminar el token de autenticación u otra información relacionada con la sesión
    localStorage.removeItem('token');
    // Redirigir a la página de inicio de sesión u otra página después de cerrar sesión
    window.location.href = '/login'; // Redirige a la página de inicio de sesión
  };

  const username = localStorage.getItem('user');
  const rol = localStorage.getItem('rol');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_URL + '/editarPregunta', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          NumTest,
          Pregunta,
          RespuestaBuena,
          RespuestaMala1,
          RespuestaMala2,
          RespuestaMala3,
          NumAsignatura,
        }),
      });
      if (response.ok) {
        alert('Pregunta actualizada correctamente');
        // Limpiar el formulario después de editar la pregunta
        setNumTest('');
        setPregunta('');
        setRespuestaBuena('');
        setRespuestaMala1('');
        setRespuestaMala2('');
        setRespuestaMala3('');
        setNumAsignatura('');
      } else {
        throw new Error('Error al actualizar la pregunta');
      }
    } catch (error) {
      console.error('Error al actualizar pregunta:', error);
      alert('Hubo un error al actualizar la pregunta');
    }
  };

  return (
    <div className="editar-pregunta-container">
      <Sidebar username={username} rol={rol} handleLogout={handleLogout} /> {/* Usando el componente Sidebar */}
      <h2>Editar Pregunta</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Número de Asignatura:
          <select
            value={NumAsignatura}
            onChange={(e) => setNumAsignatura(e.target.value)}
            required
          >
            <option value="">Selecciona una asignatura</option>
            {asignaturas.map(asignatura => (
              <option key={asignatura.NumAsignatura} value={asignatura.NumAsignatura}>
                {asignatura.NombreAsignatura}
              </option>
            ))}
          </select>
        </label>
        <label>
          Número de Test:
          <input
            type="text"
            value={NumTest}
            onChange={(e) => setNumTest(e.target.value)}
            required
          />
        </label>
        <label>
          Pregunta:
          <input
            type="text"
            value={Pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            required
          />
        </label>
        <label>
          Respuesta Buena:
          <input
            type="text"
            value={RespuestaBuena}
            onChange={(e) => setRespuestaBuena(e.target.value)}
            required
          />
        </label>
        <label>
          Respuesta Mala 1:
          <input
            type="text"
            value={RespuestaMala1}
            onChange={(e) => setRespuestaMala1(e.target.value)}
            required
          />
        </label>
        <label>
          Respuesta Mala 2:
          <input
            type="text"
            value={RespuestaMala2}
            onChange={(e) => setRespuestaMala2(e.target.value)}
            required
          />
        </label>
        <label>
          Respuesta Mala 3:
          <input
            type="text"
            value={RespuestaMala3}
            onChange={(e) => setRespuestaMala3(e.target.value)}
            required
          />
        </label>
        <button type="submit">Editar Pregunta</button>
      </form>
    </div>
  );
}

export default EditarQuestion;

import React, { useState, useEffect } from 'react';
import './RemoveQuestion.css';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function RemoveQuestion() {
  const [numTest, setNumTest] = useState('');
  const [pregunta, setPregunta] = useState('');
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
      const response = await fetch(import.meta.env.VITE_URL + '/removePregunta', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numTest,
          pregunta,
          NumAsignatura,
        }),
      });
      if (response.ok) {
        alert('Pregunta eliminada correctamente');
        // Limpiar el formulario después de eliminar la pregunta
        setNumTest('');
        setPregunta('');
        setNumAsignatura('');
      } else {
        throw new Error('Error al eliminar la pregunta');
      }
    } catch (error) {
      console.error('Error al eliminar pregunta:', error);
      alert('Hubo un error al eliminar la pregunta');
    }
  };

  return (
    <div className="remove-pregunta-container">
      <Sidebar username={username} rol={rol} handleLogout={handleLogout} /> {/* Usando el componente Sidebar */}
      <h2>Eliminar Pregunta</h2>
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
            value={numTest}
            onChange={(e) => setNumTest(e.target.value)}
            required
          />
        </label>
        <label>
          Pregunta:
          <input
            type="text"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            required
          />
        </label>
        <button type="submit">Eliminar Pregunta</button>
      </form>
    </div>
  );
}

export default RemoveQuestion;

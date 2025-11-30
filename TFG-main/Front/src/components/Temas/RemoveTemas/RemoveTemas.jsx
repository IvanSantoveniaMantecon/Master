import React, { useState, useEffect } from 'react';
import './RemoveTemas.css';
import Sidebar from '../../Sidebar/Sidebar.jsx';

function RemoveTemas() {
  const [numAsignatura, setNumAsignatura] = useState('');
  const [numTema, setNumTema] = useState('');

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
      const response = await fetch(import.meta.env.VITE_URL + '/removeTema', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numAsignatura,
          numTema,
        }),
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el tema');
      }
      alert('Tema eliminado correctamente');
      // Limpiar el formulario después de eliminar el tema
      setNumAsignatura('');
      setNumTema('');
    } catch (error) {
      console.error('Error al eliminar tema:', error);
      alert('Hubo un error al eliminar el tema');
    }
  };

  return (
    <div className="remove-tema-container">
      <Sidebar username={username} rol={rol} handleLogout={handleLogout} /> {/* Usando el componente Sidebar */}
      <h2>Eliminar Tema</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Número de Asignatura:
          <select
            value={numAsignatura}
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
          Número de Tema:
          <input
            type="text"
            value={numTema}
            onChange={(e) => setNumTema(e.target.value)}
            required
          />
        </label>
        <button type="submit">Eliminar Tema</button>
      </form>
    </div>
  );
}

export default RemoveTemas;

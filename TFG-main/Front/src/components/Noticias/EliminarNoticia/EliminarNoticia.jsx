import React, { useState } from 'react';
import './EliminarNoticia.css'; // Ajusta el nombre del archivo CSS según tu estructura de archivos
import Sidebar from '../../Sidebar/Sidebar.jsx'; // Ajusta la importación según tu estructura de archivos

function EliminarNoticia() {
  const [numNoticia, setNumNoticia] = useState('');
  const [titulo, setTitulo] = useState('');

  const handleEliminarNoticia = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_URL + '/eliminarNoticia', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          NumNoticia: numNoticia,
          Titulo: titulo,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la noticia');
      }

      alert('Noticia eliminada correctamente');
      setNumNoticia('');
      setTitulo('');
    } catch (error) {
      console.error('Error al eliminar la noticia:', error);
      alert('Hubo un error al eliminar la noticia');
    }
  };

  const handleLogout = () => {
    // Implementa la función para cerrar sesión
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const username = localStorage.getItem('user');
  const rol = localStorage.getItem('rol');

  return (
    <div className="eliminar-noticia-container">
      <Sidebar username={username} rol={rol} handleLogout={handleLogout} />
      <h2>Eliminar Noticia</h2>
      <form onSubmit={handleEliminarNoticia}>
        <label>
          Número de Noticia:
          <input
            type="text"
            value={numNoticia}
            onChange={(e) => setNumNoticia(e.target.value)}
            required
          />
        </label>
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>
        <button type="submit">Eliminar Noticia</button>
      </form>
    </div>
  );
}

export default EliminarNoticia;

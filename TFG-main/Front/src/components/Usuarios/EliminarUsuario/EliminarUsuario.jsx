import React, { useState } from 'react';
import './EliminarUsuario.css';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function EliminarUsuario() {
  const [idUsuario, setIdUsuario] = useState('');
  const [username, setUsername] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirige a la página de inicio de sesión
  };

  const usernameStored = localStorage.getItem('user');
  const rolStored = localStorage.getItem('rol');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_URL + '/eliminarUsuario', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUsuario,
          username,
        }),
      });
      if (response.ok) {
        alert('Usuario eliminado correctamente');
        setIdUsuario('');
        setUsername('');
      } else {
        throw new Error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Hubo un error al eliminar el usuario');
    }
  };

  return (
    <div className="eliminar-usuario-container">
      <Sidebar username={usernameStored} rol={rolStored} handleLogout={handleLogout} />
      <h2>Eliminar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Id de Usuario:
          <input
            type="text"
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            required
          />
        </label>
        <label>
          Nombre de Usuario:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <button type="submit">Eliminar Usuario</button>
      </form>
    </div>
  );
}

export default EliminarUsuario;

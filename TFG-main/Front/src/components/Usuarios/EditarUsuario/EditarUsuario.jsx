import React, { useState } from 'react';
import './EditarUsuario.css';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function EditarUsuario() {
  const [idUsuario, setIdUsuario] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirige a la página de inicio de sesión
  };

  const usernameStored = localStorage.getItem('user');
  const rolStored = localStorage.getItem('rol');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_URL + '/editarUsuario', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUsuario,
          username,
          email,
          rol,
        }),
      });
      if (response.ok) {
        alert('Usuario actualizado correctamente');
        setIdUsuario('');
        setUsername('');
        setEmail('');
        setRol('');
      } else {
        throw new Error('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Hubo un error al actualizar el usuario');
    }
  };

  return (
    <div className="editar-usuario-container">
      <Sidebar username={usernameStored} rol={rolStored} handleLogout={handleLogout} />
      <h2>Editar Usuario</h2>
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
          Nombre de usuario nuevo:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email nuevo:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value) }
            required
          />
        </label>
        <label>
          Rol nuevo:
          <select value={rol} onChange={(e) => setRol(e.target.value)} required>
            <option value="">Selecciona un rol</option>
            <option value="usuario">Usuario</option>
            <option value="profesor">Profesor</option>
            <option value="administrador">Administrador</option>
          </select>
        </label>
        <button type="submit">Editar Usuario</button>
      </form>
    </div>
  );
}

export default EditarUsuario;

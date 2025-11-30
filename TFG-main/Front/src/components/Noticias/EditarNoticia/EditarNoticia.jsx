import React, { useState } from 'react';
import './EditarNoticia.css';
import Sidebar from '../../Sidebar/Sidebar.jsx'; // Ajusta la importación según tu estructura de archivos

function EditarNoticia() {
  const [numNoticia, setNumNoticia] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  const handleEditarNoticia = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_URL + '/editarNoticia', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          NumNoticia: numNoticia,
          Titulo: titulo,
          Descripcion: descripcion,
          Imagen: imagen,
        }),
      });
      if (!response.ok) {
        throw new Error('Error al editar la noticia');
      }
      alert('Noticia editada correctamente');
      // Redirigir a la página de noticias o realizar otras acciones después de editar
    } catch (error) {
      console.error('Error al editar la noticia:', error);
      alert('Hubo un error al editar la noticia');
    }
  };

  const handleLogout = () => {
    // Implementa la función para cerrar sesión
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleImagenSeleccionada = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagen(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const username = localStorage.getItem('user');
  const rol = localStorage.getItem('rol');

  return (
    <div className="editar-noticia-container">
      <Sidebar username={username} rol={rol} handleLogout={handleLogout} />
      <h2>Editar Noticia</h2>
      <form onSubmit={handleEditarNoticia}>
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
        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </label>
        <label>
          Imagen (solo JPG):
          <input
            type="file"
            onChange={handleImagenSeleccionada}
            accept="image/*"
            required
          />
        </label>
        <button type="submit">Editar Noticia</button>
      </form>
    </div>
  );
}

export default EditarNoticia;

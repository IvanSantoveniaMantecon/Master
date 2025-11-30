import React, { useState } from 'react';
import './CrearNoticia.css';
import Sidebar from '../../Sidebar/Sidebar.jsx';

function CrearNoticia() {
  const [numNoticia, setNumNoticia] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);

  const toggleSubjects = () => {
    setIsSubjectsOpen(!isSubjectsOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existeNoticia = await verificarExistenciaNoticia(numNoticia);
    
    if (existeNoticia) {
      alert(`Ya existe una noticia con el número ${numNoticia}. Por favor, elige otro número.`);
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_URL + '/addNoticia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numNoticia,
          titulo,
          descripcion,
          imagen,
        }),
      });
      if (!response.ok) {
        throw new Error('Error al agregar la noticia');
      }
      alert('Noticia agregada correctamente');
      setNumNoticia('');
      setTitulo('');
      setDescripcion('');
      setImagen('');
    } catch (error) {
      console.error('Error al agregar noticia:', error);
      alert('Hubo un error al agregar la noticia');
    }
  };

  const verificarExistenciaNoticia = async (numNoticia) => {
    try {
      const response = await fetch(import.meta.env.VITE_URL + `/noticias/${numNoticia}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.length > 0;
    } catch (error) {
      console.error('Error al verificar existencia de noticia:', error);
      return false;
    }
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
    <div className="crear-noticia-container">
      <Sidebar username={username} rol={rol} handleLogout={handleLogout} />
      <h2>Crear Nueva Noticia</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Agregar Noticia</button>
      </form>
    </div>
  );
}

export default CrearNoticia;

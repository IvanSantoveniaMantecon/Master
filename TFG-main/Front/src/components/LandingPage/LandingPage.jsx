import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { Link } from 'react-router-dom';

function LandingPage() {
  const [noticias, setNoticias] = useState([]);
  const username = localStorage.getItem('user');
  const rol = localStorage.getItem('rol');

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_URL + '/noticias');
        if (!response.ok) {
          throw new Error('Error al obtener las noticias');
        }
        const data = await response.json();
        console.log(import.meta.env.VITE_URL + '/noticias')
        // Procesar las noticias para convertir la imagen base64 a una URL válida
        const noticiasConImagenes = data.map(noticia => {
          const imagenUrl = `${noticia.Imagen}`; // La URL ya debería ser válida si es data:image/jpeg;base64,...
          return { ...noticia, Imagen: imagenUrl };
        });

        setNoticias(noticiasConImagenes);
      } catch (error) {
        console.error('Error al obtener las noticias:', error);
      }
    };

    fetchNoticias();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <Sidebar username={username} rol={rol} handleLogout={handleLogout} />
      <div className="main-content">
        <h1>Bienvenido a BachInfo</h1>
        <p>Tu portal de recursos educativos para Bachillerato</p>
        <div className="news-section">
          <h2>Últimas Noticias</h2>
          <div className="news-container">
            {noticias.map((noticia, index) => (
              <div className="news-item" key={index}>
                <img src={noticia.Imagen} alt={`Imagen de ${noticia.Titulo}`} className="news-image" />
                <div className="news-content">
                  <h3>{noticia.Titulo}</h3>
                  <p>{noticia.Descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-section">
          <h2>¿Qué es BachInfo?</h2>
          <p>
            BachInfo es un TFG (Trabajo de Fin de Grado) con el propósito de ayudar a estudiantes de 2º de Bachillerato,
            empleando una metodología que incluye la revisión del currículo educativo, entrevistas con docentes, y análisis
            de recursos educativos en línea para identificar contenidos relevantes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

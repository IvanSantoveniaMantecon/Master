import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Asignatura.css';
import { Link } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar.jsx';

function Asignatura() {
  const { NumAsignatura } = useParams();
  const [asignatura, setAsignatura] = useState(null);
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    const fetchAsignatura = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_URL + `/asignaturas/${NumAsignatura}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Asignatura data:', data);
        setAsignatura(data);
      } catch (error) {
        console.error('Error al obtener la asignatura:', error);
      }
    };

    const fetchTemas = async () => {
      try {
        const response = await fetch(`http://localhost:8080/temas/${NumAsignatura}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Temas data:', data);
        setTemas(data);
      } catch (error) {
        console.error('Error al obtener temas:', error);
      }
    };

    fetchAsignatura();
    fetchTemas();
  }, [NumAsignatura]);

  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);

  const toggleSubjects = () => {
    setIsSubjectsOpen(!isSubjectsOpen);
  };

  const username = localStorage.getItem('user');
  const rol = localStorage.getItem('rol');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const sortedTemas = temas.sort((a, b) => a.NumTema - b.NumTema);

  if (!asignatura) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container-asignatura">
      <Sidebar username={username} rol={rol} handleLogout={handleLogout} />
      <div className="main-content-asignatura" style={{ marginLeft: "250px"}}>
        <h1>Bienvenido a BachInfo</h1>
        <p>Tu portal de recursos educativos para Bachillerato</p>
        <div className="news-section-asignatura">
          <h2>{asignatura.NombreAsignatura}</h2>
          <div className="news-container-asignatura">
            {sortedTemas.map((tema, index) => (
              <Link to={`http://localhost:5173/asignatura/${NumAsignatura}/tema${tema.NumTema}`} className="news-item-asignatura" key={index}>
                <img src={`data:image/jpeg;base64,${tema.Imagen.toString('base64')}`} alt={`Imagen de ${tema.Titulo}`} className="news-image-asignatura"/>
                <div className="news-content-asignatura">
                  <h3>{tema.Titulo}</h3>
                  <p>{tema.Subtitulo}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="about-section-asignatura">
          <h2>¿Qué es BachInfo?</h2>
          <p>BachInfo es un TFG (Trabajo de Fin de Grado) con el propósito de ayudar a estudiantes de 2º de Bachillerato, empleando una metodología que incluye la revisión del currículo educativo, entrevistas con docentes, y análisis de recursos educativos en línea para identificar contenidos relevantes.</p>
        </div>
      </div>
    </div>
  );
}

export default Asignatura;

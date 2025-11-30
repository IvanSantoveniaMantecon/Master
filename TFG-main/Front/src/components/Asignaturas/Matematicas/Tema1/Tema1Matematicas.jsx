import React, { useState } from 'react';
import './Tema1Matematicas.css';
import { Link } from 'react-router-dom';
import Sidebar from '../../../Sidebar/Sidebar.jsx';

function Tema1Matematicas() {
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);

  const toggleSubjects = () => {
    setIsSubjectsOpen(!isSubjectsOpen);
  };

  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const username = localStorage.getItem('user');
  const rol = localStorage.getItem('rol');

  const handleLogout = () => {
    // Eliminar el token de autenticación u otra información relacionada con la sesión
    localStorage.removeItem('token');
    // Redirigir a la página de inicio de sesión u otra página después de cerrar sesión
    window.location.href = '/login'; // Redirige a la página de inicio de sesión
  };

  return (
    <div className="main-container-matematicas">
      <Sidebar username={username} rol={rol} handleLogout={handleLogout} /> {/* Usando el componente Sidebar */}
      <div className="main-content-matematicas-tema1">
        <h2>Tema 1</h2>
        <p><em>Funciones</em></p>
        <div className="dropdown-box">
          <h3 onClick={() => toggleExpand('caracteristicas')}>
            1. Características de una función <span className="arrow">&#9660;</span>
          </h3>
          {expanded['caracteristicas'] && (
            <div className="dropdown-content">
                        <p>
              Las funciones tienen características clave que las definen y describen su comportamiento.
          </p>
              <h4 onClick={() => toggleExpand('dominio')}>
                Dominio <span className="arrow">&#9660;</span>
              </h4>
              {expanded['dominio'] && (
                <ul>
                  <li>
                      <p>Es el conjunto de todos los valores de entrada para los cuales la función está definida. En otras palabras, son los valores que pueden ser ingresados en la función.</p>
                      <iframe width="200" height="150" src="https://www.youtube.com/embed/ooZRj7_lPrQ" 
                              title="Video de YouTube" frameborder="0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowfullscreen>
                      </iframe>
                  </li>
                </ul>
              )}
              <h4 onClick={() => toggleExpand('recorrido')}>
              Recorrido (o rango) <span className="arrow">&#9660;</span>
              </h4>
              {expanded['recorrido'] && (
                <ul>
                  <li>
                      <p>Es el conjunto de todos los valores de salida que produce la función para los valores en su dominio.</p>
                      <p>Es importante notar que no todos los valores de la función pueden ser alcanzados, dependiendo del tipo de función.</p>
                  </li>
                </ul>
              )}
              <h4 onClick={() => toggleExpand('punto')}>
              Puntos de corte con los ejes <span className="arrow">&#9660;</span>
              </h4>
              {expanded['punto'] && (
                <ul>
                  <li>
                      <p>Son los puntos en los cuales la gráfica de la función intersecta los ejes x e y.</p>
                      <p>Estos puntos proporcionan información sobre la relación entre las variables independiente y dependiente.</p>
                  </li>
                </ul>
              )}
              <h4 onClick={() => toggleExpand('simetria')}>
              Simetría <span className="arrow">&#9660;</span>
              </h4>
              {expanded['simetria'] && (
                <ul>
                  <li>
                      <p>Algunas funciones exhiben ciertos tipos de simetría en su gráfica, como simetría par o impar, lo que puede revelar propiedades adicionales sobre la función.</p>
                      <iframe width="200" height="150" src="https://www.youtube.com/embed/0qbF6muvsYs" 
                              title="Video de YouTube" frameborder="0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowfullscreen>
                      </iframe>
                  </li>
                </ul>
              )}
              
            </div>
          )}
        </div>

        <div className="expandable-section">
          <div className="dropdown-box">
            <h3 onClick={() => toggleExpand('tipos')}>
              2. Tipos de funciones <span className="arrow">&#9660;</span>
            </h3>
              {expanded['tipos'] && (
                <div className="dropdown-content">
                                <p>
              Hay varios tipos de funciones, cada una con sus propias características
              </p>
                  <h4 onClick={() => toggleExpand('polinomicas')}>
                  Polinómicas <span className="arrow">&#9660;</span>
                  </h4>
                  {expanded['polinomicas'] && (
                    <ul>
                      <li>
                          <p>Son funciones que se expresan como una suma de términos de la forma 𝑎𝑥(𝑛), donde 𝑎 es un coeficiente constante, 𝑛 es un número entero no negativo y 𝑥 es la variable independiente. </p>
                          <p>Ejemplos comunes incluyen las funciones lineales, cuadráticas, cúbicas, etc.</p>
                      </li>
                    </ul>
                  )}
                  <h4 onClick={() => toggleExpand('racionales')}>
                    Racionales <span className="arrow">&#9660;</span>
                  </h4>
                  {expanded['racionales'] && (
                    <ul>
                      <li>
                          <p>Estas funciones se representan como el cociente de dos polinomios.</p>
                          <p>La función puede tener valores no definidos (o discontinuidades) en los puntos donde el denominador es igual a cero.</p>
                          <iframe width="200" height="150" src="https://www.youtube.com/embed/-fJ7nXLBQew" 
                              title="Video de YouTube" frameborder="0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowfullscreen>
                      </iframe>
                      </li>
                    </ul>
                  )}
                  <h4 onClick={() => toggleExpand('inversa')}>
                  De proporcionalidad inversa <span className="arrow">&#9660;</span>
                  </h4>
                  {expanded['inversa'] && (
                    <ul>
                      <li>
                          <p>Son funciones donde una variable es inversamente proporcional a otra.</p>
                          <p>Se pueden expresar como 𝑓(𝑥)=𝑘/𝑥, donde 𝑘 es una constante distinta de cero.</p>
                          <iframe width="200" height="150" src="https://www.youtube.com/embed/l6pZGhy0hHc" 
                              title="Video de YouTube" frameborder="0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowfullscreen>
                      </iframe>
                      </li>
                    </ul>
                  )}
                  <h4 onClick={() => toggleExpand('trozos')}>
                  Definidas a trozos <span className="arrow">&#9660;</span>
                  </h4>
                  {expanded['trozos'] && (
                    <ul>
                      <li>
                        <p>Estas funciones están definidas por diferentes expresiones en diferentes intervalos del dominio. </p>
                        <p>Cada expresión define la función en un subconjunto específico del dominio.</p></li>
                        <iframe width="200" height="150" src="https://www.youtube.com/embed/3AP6OodY1W8" 
                              title="Video de YouTube" frameborder="0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowfullscreen>
                      </iframe>
                    </ul>
                  )}
                </div>
              )}
          </div>
        </div>
        <div className="quiz-button-container">
           <Link to="/asignatura/1/tema/1/quiz" className="quiz-button">Ir al Quiz</Link>
       </div>
      <div className="about-section-matematicas-tema1">
        <h2>¿Qué es BachInfo?</h2>
        <p>BachInfo es un TFG (Trabajo de Fin de Grado) con el propósito de ayudar a estudiantes de 2º de Bachillerato, empleando una metodología que incluye la revisión del currículo educativo, entrevistas con docentes, y análisis de recursos educativos en línea para identificar contenidos relevantes.</p>
      </div>
    </div>
   </div>
  );
}

export default Tema1Matematicas;

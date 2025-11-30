import React, { useState } from 'react';
import './Tema2Historia.css';
import { Link } from 'react-router-dom';
import Sidebar from '../../../Sidebar/Sidebar.jsx';

function Tema2Historia() {
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
    <div className="main-container-historia">
      <Sidebar username={username} rol={rol} handleLogout={handleLogout} /> {/* Usando el componente Sidebar */}
      <div className="main-content-historia-tema2">
        <h2>Tema 2</h2>
        <p><em>La Península Ibérica en la Edad Media: Tres culturas y un mapa político en constante cambio (711-1474)</em></p>
        <div className="dropdown-box">
          <h3 onClick={() => toggleExpand('reinos')}>
            1. Los Reinos Cristianos: La Reconquista (hasta el siglo XIV) <span className="arrow">&#9660;</span>
          </h3>
          {expanded['reinos'] && (
            <div className="dropdown-content">
              <p>
                Durante este período, la Reconquista también implicó la repoblación de tierras conquistadas por cristianos del norte y de otras partes de Europa, lo que contribuyó a la diversidad cultural y al desarrollo de nuevas formas de organización política y social en la Península Ibérica.
              </p>
              <h4 onClick={() => toggleExpand('invasion')}>
              La invasión musulmana y los primeros reinos cristianos <span className="arrow">&#9660;</span>
              </h4>
              {expanded['invasion'] && (
                <ul>
                <li>
                  <em><strong>Invasión musulmana y primeros reinos cristianos:</strong></em>
                  <ul>
                    <li>
                      <strong>Conquista Musulmana en la Península Ibérica (711):</strong>
                      <ul>
                        <li>En el año 711, los musulmanes, liderados por Tariq ibn Ziyad, cruzaron el estrecho de Gibraltar y derrotaron al rey visigodo Rodrigo en la batalla de Guadalete. Esta conquista rápida y eficaz llevó a la dominación musulmana de gran parte de la Península, estableciendo el Emirato y posteriormente el Califato de Córdoba.</li>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Invasionisl%C3%A1micaespa%C3%B1a.svg/1200px-Invasionisl%C3%A1micaespa%C3%B1a.svg.png" alt="Descripción de la imagen" width="200" height="150"></img>
                      </ul>
                    </li>
                    <li>
                      <strong>Resistencia cristiana y formación de los primeros reinos:</strong>
                      <ul>
                        <li>En las montañas del norte, pequeños núcleos de resistencia cristiana lograron mantenerse y comenzaron a formar los primeros reinos cristianos, como el Reino de Asturias. Este reino fue crucial en la preservación de la identidad cristiana y marcó el inicio de un largo proceso conocido como la Reconquista.</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
              )}
              <h4 onClick={() => toggleExpand('reconquista')}>
                Reconquista<span className="arrow">&#9660;</span>
              </h4>
              {expanded['reconquista'] && (
                <ul>
                <li>
                  <em><strong>Avance de la Reconquista:</strong></em>
                  <ul>
                    <li><strong>Siglo X-XI:</strong> Durante este período, se consolidaron los reinos de León y Castilla, mientras que Aragón comenzó a expandirse hacia el sur y el este.</li>
                    <li><strong>Siglo XII:</strong> La unión dinástica entre Castilla y León en 1230 bajo Fernando III fue un hito importante. Además, la conquista de Toledo en 1085 por Alfonso VI de León y Castilla marcó un avance significativo para los cristianos.</li>
                    <img src="https://descargas.intef.es/recursos_educativos/It_didac/CCSS/5/11/La_Edad_Media_II/183418_jpg_1.jpg" alt="Descripción de la imagen" width="200" height="150"></img>
                    <li><strong>Siglo XIII:</strong> Fue un siglo de grandes conquistas, destacándose la toma de Córdoba (1236) y Sevilla (1248) por Fernando III de Castilla y la expansión aragonesa hacia el Mediterráneo con la conquista de Valencia (1238) por Jaime I.</li>
                  </ul>
                </li>
              </ul>
              
            
              )}
              <h4 onClick={() => toggleExpand('final')}>
                Final<span className="arrow">&#9660;</span>
              </h4>
              {expanded['final'] && (
                <ul>
                <li>
                  <em><strong>Reconquista en la Península Ibérica:</strong></em>
                  <ul>
                    <li><strong>Periodo:</strong> Desde la invasión musulmana en 711 hasta la caída del Reino Nazarí de Granada en 1492.</li>
                    <li>
                      <strong>Implicaciones demográficas:</strong>
                      <ul>
                        <li><strong>Repoblación:</strong> Tras cada avance cristiano, se repoblaron las tierras conquistadas con cristianos del norte de la península y de otras partes de Europa.</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Implicaciones sociales:</strong>
                      <ul>
                        <li><strong>Nuevos sistemas políticos y sociales:</strong> Se establecieron nuevos órdenes políticos y sociales en las tierras reconquistadas.</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Implicaciones culturales:</strong>
                      <ul>
                        <li><strong>Mixtura cultural:</strong> La convivencia de cristianos, musulmanes y judíos dejó una huella cultural profunda en la península ibérica.</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Implicaciones religiosas:</strong>
                      <ul>
                        <li><strong>Unificación territorial y religiosa:</strong> Con la caída de Granada en 1492, se completó la unificación territorial bajo el dominio cristiano y se impuso la ortodoxia católica.</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
              )}
            </div>
          )}
        </div>

        <div className="expandable-section">
          <div className="dropdown-box">
            <h3 onClick={() => toggleExpand('preromano')}>
              2. La Crisis Política y Social de los Siglos XIV y XV: La Evolución de los Reinos Peninsulares <span className="arrow">&#9660;</span>
            </h3>
            {expanded['preromano'] && (
              <div className="dropdown-content">
                <p>
                La Edad Media en la Península Ibérica fue un período de transformación profunda, con una mezcla única de conflicto y convivencia que dejó una herencia duradera en la historia y cultura de la región. 
                </p>
                <h4 onClick={() => toggleExpand('crisis')}>
                Crisis del siglo XIV <span className="arrow">&#9660;</span>
                </h4>
                {expanded['crisis'] && (
                  <ul>
                  <li>
                    <ul>
                      <li><strong>Peste Negra (1348-1351):</strong> La pandemia devastó la población, causando una grave crisis demográfica y económica.</li>
                      <img src="https://estaticos-cdn.prensaiberica.es/clip/0f72ca61-284e-42d6-9ce7-2265ace828fd_alta-libre-aspect-ratio_default_0.jpg" alt="Descripción de la imagen" width="200" height="150"></img>
                      <li><strong>Conflictos internos y guerras civiles:</strong>
                        <ul>
                          <li>En Castilla, la guerra civil entre Pedro I y Enrique II (1366-1369) desestabilizó el reino.</li>
                          <li>Aragón también sufrió conflictos internos y problemas sucesorios.</li>
                        </ul>
                      </li>
                      <li><strong>Crisis agraria y hambrunas:</strong> Las malas cosechas y la reducción de la mano de obra debido a la peste llevaron a crisis alimentarias.</li>
                    </ul>
                  </li>
                </ul>
                )}
                <h4 onClick={() => toggleExpand('recuperacion')}>
                Siglo XV: Recuperación y consolidación<span className="arrow">&#9660;</span>
                </h4>
                {expanded['recuperacion'] && (
                  <ul>
                  <li>
                    <ul>
                      <li>
                        <strong>Castilla:</strong> Bajo los Reyes Católicos, Isabel I de Castilla y Fernando II de Aragón se casaron en 1469, unificando los reinos y sentando las bases para la creación del Reino de España. Implementaron reformas administrativas y militares que fortalecieron el poder real.
                      </li>
                      <li>
                        <strong>Aragón:</strong> Enfrentó desafíos como la Guerra Civil Catalana (1462-1472), pero hacia finales del siglo XV logró cierta estabilidad.
                      </li>
                      <li>
                        <strong>Portugal:</strong> Experimentó relativa estabilidad interna y comenzó su expansión marítima, iniciando la Era de los Descubrimientos.
                      </li>
                      <img src="https://historiauniversal.org/wp-content/uploads/reconquista-espanola.jpg" alt="Descripción de la imagen" width="200" height="150"></img>
                    </ul>
                  </li>
                </ul>
              )}
              <h4 onClick={() => toggleExpand('cambios')}>
              Cambios sociales y económicos<span className="arrow">&#9660;</span>
                </h4>
                {expanded['cambios'] && (
                  <ul>
                  <li>
                    <em><strong>Desarrollo Urbano y Comercial:</strong></em>
                    <ul>
                      <li><strong>Crecimiento de las ciudades y comercio:</strong> El crecimiento urbano se aceleró, convirtiendo las ciudades en centros dinámicos de comercio y actividad económica. Esto fue impulsado por la expansión de mercados y rutas comerciales tras la finalización de la Reconquista en 1492.</li>
                    </ul>
                  </li>
                  <li>
                    <em><strong>Nobleza y Monarquía:</strong></em>
                    <ul>
                      <li><strong>Consolidación del poder monárquico:</strong> Los Reyes Católicos implementaron políticas para reducir el poder de la nobleza y fortalecer un gobierno centralizado. Esto incluyó la unión de las coronas de Castilla y Aragón, creando un estado español más cohesivo y poderoso.</li>
                    </ul>
                  </li>
                  <li>
                    <em><strong>Religión y Sociedad:</strong></em>
                    <ul>
                      <li><strong>Intolerancia religiosa:</strong> Se promulgaron políticas cada vez más intolerantes, como la Inquisición española, que buscaba eliminar la herejía y afirmar el catolicismo como la única fe aceptada. Esto culminó en la expulsión de los judíos en 1492 y presiones sobre los musulmanes para convertirse o abandonar la península.</li>
                    </ul>
                  </li>
                </ul>               
              )}
              </div>
            )}
          </div>
        </div>
       <div className="quiz-button-container">
          <Link to="/asignatura/2/tema/2/quiz" className="quiz-button">Ir al Quiz</Link>
        </div>
      <div className="about-section-historia-tema2">
        <h2>¿Qué es BachInfo?</h2>
        <p>BachInfo es un TFG (Trabajo de Fin de Grado) con el propósito de ayudar a estudiantes de 2º de Bachillerato, empleando una metodología que incluye la revisión del currículo educativo, entrevistas con docentes, y análisis de recursos educativos en línea para identificar contenidos relevantes.</p>
      </div>
    </div>
   </div>
  );
}

export default Tema2Historia;

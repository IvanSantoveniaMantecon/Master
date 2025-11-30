import React, { useState } from 'react';
import './Tema1Historia.css';
import { Link } from 'react-router-dom';
import Sidebar from '../../../Sidebar/Sidebar.jsx';

function Tema1Historia() {
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
      <div className="main-content-historia-tema1">
        <h2>Tema 1</h2>
        <p><em>La Península Ibérica en la Edad Antigua: los tiempos prerromanos y la Hispania romana.</em></p>
        <div className="dropdown-box">
          <h3 onClick={() => toggleExpand('homini')}>
            1. El proceso de hominización en la Península Ibérica (del Paleolítico a la Edad del Bronce) <span className="arrow">&#9660;</span>
          </h3>
          {expanded['homini'] && (
            <div className="dropdown-content">
              <p>
                La historia de la Península Ibérica se remonta a tiempos muy antiguos, cuando los primeros grupos de humanos llegaron a la región durante el Paleolítico temprano. A lo largo de milenios, estas sociedades cazadoras y recolectoras evolucionaron, adaptándose a los desafíos del entorno y desarrollando nuevas técnicas y herramientas para sobrevivir.
              </p>
              <h4 onClick={() => toggleExpand('paleolitico')}>
                Paleolítico <span className="arrow">&#9660;</span>
              </h4>
              {expanded['paleolitico'] && (
                  <ul>
                  <li>
                  <em><strong>Paleolítico Inferior:</strong></em>
                    <ul>
                      <li><strong>Periodo:</strong> Desde hace aproximadamente 2.5 millones de años hasta hace unos 200,000 años.</li>
                      <li>
                        <strong>Desarrollo de herramientas:</strong>
                        <ul>
                          <li><strong>Primeras herramientas:</strong> En esta etapa, los homínidos como el Homo habilis y el Homo erectus desarrollaron las primeras herramientas de piedra simples. Estas herramientas, conocidas como la industria olduvayense, consistían en cantos tallados y lascas utilizadas para cortar, raspar y procesar alimentos.</li>
                          <li><strong>Herramientas bifaciales:</strong> Con el tiempo, las herramientas evolucionaron hacia formas más complejas como los bifaces (hachas de mano) características de la industria achelense, utilizadas tanto para la caza como para el procesamiento de animales.</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Sitios arqueológicos importantes:</strong>
                        <ul>
                          <li>Atapuerca: La región de Atapuerca, en el norte de España, es uno de los sitios más importantes. Aquí se han encontrado restos fósiles y herramientas de piedra que proporcionan información valiosa sobre los primeros homínidos en la Península Ibérica. Los yacimientos de la Gran Dolina y Sima de los Huesos son especialmente relevantes, con restos de Homo antecessor y Homo heidelbergensis.</li>
                          <img src="https://www.ubu.es/sites/default/files/article/images/atapuerca-intro.jpg" alt="Descripción de la imagen" width="200" height="150"></img>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                  <em><strong>Paleolítico Medio:</strong></em>
                    <ul>
                      <li><strong>Periodo:</strong> Desde hace aproximadamente 200,000 años hasta hace unos 40,000 años.</li>
                      <li>
                        <strong>Habitantes principales:</strong>
                        <ul>
                          <li><strong>Neandertales:</strong> Durante este periodo, los neandertales fueron los principales habitantes de la región. Estos homínidos desarrollaron herramientas más refinadas pertenecientes a la industria musteriense, caracterizada por la técnica Levallois que permitía la creación de hojas y puntas más eficientes.</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Adaptación y cultura:</strong>
                        <ul>
                          <li><strong>Caza avanzada:</strong> Los neandertales desarrollaron técnicas avanzadas de caza, como el uso de lanzas y herramientas bifaciales para capturar grandes presas.</li>
                          <li><strong>Rituales funerarios:</strong> Existe evidencia de prácticas funerarias, como se observa en enterramientos con restos humanos acompañados de herramientas y otros objetos, sugiriendo posibles creencias en el más allá.</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Sitios arqueológicos importantes:</strong>
                        <ul>
                          <li>Cueva de El Sidrón (Asturias): Donde se han encontrado numerosos restos de neandertales, proporcionando información sobre su dieta, enfermedades y comportamiento social.</li>
                          <img src="https://www.lavanguardia.com/files/og_thumbnail/uploads/2017/09/22/5fa3d7c4a756e.jpeg" alt="Descripción de la imagen" width="200" height="150"></img>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                  <em><strong>Paleolítico Superior:</strong></em>
                    <ul>
                      <li><strong>Periodo:</strong> Desde hace aproximadamente 40,000 años hasta el final de la última era glacial (alrededor de 10,000 años atrás).</li>
                      <li>
                        <strong>Habitantes principales:</strong>
                        <ul>
                          <li><strong>Homo sapiens:</strong> En esta etapa, los humanos modernos se establecieron en la Península Ibérica, trayendo consigo avances tecnológicos y culturales significativos.</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Desarrollo de herramientas y técnicas:</strong>
                        <ul>
                          <li><strong>Herramientas especializadas:</strong> Introdujeron herramientas más sofisticadas como hojas de sílex, arpones de hueso y marfil, así como técnicas avanzadas de caza y recolección.</li>
                          <li><strong>Arte rupestre:</strong> Se produjo una notable expansión del arte rupestre, con pinturas y grabados en cuevas que representaban escenas de caza, animales y figuras antropomorfas. Este arte refleja una complejidad simbólica y cultural avanzada.</li>
                          <img src="https://historia.nationalgeographic.com.es/medio/2022/10/07/la-cueva-de-altamira-es-uno-de-los-maximo-exponentes-de-arte-rupestre_0bb1abe5_1280x854.jpeg" alt="Descripción de la imagen" width="200" height="150"></img>
                        </ul>
                      </li>
                      <li>
                        <strong>Sitios arqueológicos importantes:</strong>
                        <ul>
                          <li>Cueva de Altamira (Cantabria): Famosa por sus pinturas de bisontes y otras figuras, es uno de los ejemplos más destacados del arte rupestre paleolítico.</li>
                          <li>Cueva de Lascaux (aunque en Francia, influyó en la región ibérica): Conocida por sus detalladas pinturas de animales.</li>
                          <li>Cueva de Tito Bustillo (Asturias): Con importantes representaciones de arte rupestre y objetos de adorno personal.</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
                
              )}
              <h4 onClick={() => toggleExpand('mesoloico')}>
                Mesoloico<span className="arrow">&#9660;</span>
              </h4>
              {expanded['mesoloico'] && (
                <ul>
                <li>
                    <ul>
                        <li><strong>Periodo:</strong> Desde hace aproximadamente 10,000 años hasta hace unos 5,000 años.</li>
                        <li>
                            <strong>Estilo de vida:</strong>
                            <ul>
                                <li>Durante el Mesolítico en la Península Ibérica, las comunidades humanas mantuvieron una subsistencia principalmente cazadora-recolectora, adaptándose de manera significativa a un clima más cálido y estable tras la última glaciación.</li>
                                <li>Hubo una diversificación en las estrategias de subsistencia, incluyendo una mayor recolección de plantas y mariscos, además de la caza de animales.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Tecnología:</strong>
                            <ul>
                                <li>Las herramientas de piedra evolucionaron hacia formas más especializadas y refinadas, destacándose los microlitos.</li>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Flechette_Gavaudun_231-3_%283%29.jpg/282px-Flechette_Gavaudun_231-3_%283%29.jpg" alt="Descripción de la imagen" width="200" height="150"></img>
                                <li>Estas pequeñas herramientas permitían una mayor movilidad y eficiencia en actividades como la caza, pesca y recolección, reflejando una adaptación avanzada al entorno postglacial cambiante.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Cambios culturales:</strong>
                            <ul>
                                <li>Culturalmente, el Mesolítico marcó un periodo de cambios significativos en la Península Ibérica. Hubo una mayor cooperación social y una especialización más marcada en la explotación de recursos naturales.</li>
                                <li>Se observó una mayor complejidad en las prácticas funerarias y expresiones artísticas, como el arte rupestre mesolítico encontrado en cuevas y abrigos rocosos, que muestra una creciente sofisticación simbólica y cultural.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Impacto ambiental:</strong>
                            <ul>
                                <li>El Mesolítico fue un periodo de adaptación continua a los cambios ambientales postglaciales. La vegetación y la fauna experimentaron transformaciones significativas, influyendo en las estrategias de subsistencia y movilidad de las comunidades mesolíticas.</li>
                                <li>Este periodo de transición ambiental requirió innovaciones tecnológicas y culturales para asegurar la supervivencia y el bienestar de las poblaciones mesolíticas en la Península Ibérica.</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            
              )}
              <h4 onClick={() => toggleExpand('neolitico')}>
                Neolítico<span className="arrow">&#9660;</span>
              </h4>
              {expanded['neolitico'] && (
                <ul>
                  <li>
                    <strong>Inicio del Neolítico:</strong>
                    <ul>
                      <li>
                        El Neolítico en la Península Ibérica comenzó alrededor de hace 7,000 años y marcó un período de importantes cambios en la forma de vida de las comunidades humanas. Este período se caracterizó por la transición de una economía de cazadores-recolectores a una economía agrícola y ganadera, así como por el desarrollo de asentamientos permanentes y la aparición de la cerámica.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Revolución agrícola:</strong>
                    <ul>
                      <li>
                        Una de las características más destacadas del Neolítico fue el desarrollo de la agricultura y la domesticación de plantas y animales. En la Península Ibérica, las comunidades humanas comenzaron a cultivar cereales como el trigo y la cebada, así como legumbres y hortalizas. La domesticación de animales como el ganado, ovejas, cabras y cerdos también desempeñó un papel importante en la subsistencia de las comunidades neolíticas.
                      </li>
                      <img src="https://caminandoporlahistoria.com/wp-content/uploads/2018/03/Portada-facebook-2.jpg" alt="Descripción de la imagen" width="200" height="150"></img>
                    </ul>
                  </li>
                  <li>
                    <strong>Establecimiento de asentamientos:</strong>
                    <ul>
                      <li>
                        Con la introducción de la agricultura, las comunidades neolíticas comenzaron a establecer asentamientos permanentes, abandonando el estilo de vida nómada de sus antepasados paleolíticos y mesolíticos. Estos asentamientos, que consistían en viviendas construidas con materiales como barro y madera, proporcionaban seguridad y estabilidad a las comunidades, así como un mayor control sobre los recursos naturales.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Desarrollo de la cerámica:</strong>
                    <ul>
                      <li>
                        Otro avance importante durante el Neolítico fue el desarrollo de la cerámica. Las comunidades neolíticas comenzaron a fabricar recipientes de cerámica para almacenar alimentos y agua, así como para usos rituales y decorativos. La cerámica no solo facilitó la vida diaria de estas comunidades, sino que también reflejó su capacidad para trabajar y manipular materiales.
                      </li>
                      <img src="https://s1.abcstatics.com/media/ciencia/2021/12/29/ceramica-neolitica-hjuygsdf-kawE--1248x698@abc.jpg" alt="Descripción de la imagen" width="200" height="150"></img>
                    </ul>
                  </li>
                  <li>
                    <strong>Organización social y cultural:</strong>
                    <ul>
                      <li>
                        El Neolítico también vio el desarrollo de nuevas formas de organización social y cultural en la Península Ibérica. Se observa una mayor diferenciación en las funciones sociales y una mayor complejidad en la estructura de las comunidades neolíticas, con líderes y especialistas emergentes en actividades como la agricultura, la alfarería y la construcción.
                      </li>
                    </ul>
                  </li>
                </ul>
            
              )}
              <h4 onClick={() => toggleExpand('edadBronce')}>
                Edad de Bronce<span className="arrow">&#9660;</span>
              </h4>
              {expanded['edadBronce'] && (
                <ul>
                  <li>
                    <strong>Inicio de la Edad de Bronce:</strong>
                    <ul>
                      <li>Este período se caracteriza por el uso generalizado del bronce, una aleación de cobre y estaño, en la fabricación de herramientas, armas y objetos de lujo.</li>
                      <li>Marca un avance tecnológico importante en la metalurgia, permitiendo la creación de herramientas y armas más duraderas y efectivas que las de piedra.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Desarrollo de la metalurgia del bronce:</strong>
                    <ul>
                      <li>La habilidad para trabajar el bronce significó un gran avance. Los herreros y metalurgistas dominaban técnicas avanzadas de fundición, forja y aleación para producir una amplia variedad de objetos.</li>
                      <li>Esto contribuyó no solo a mejoras en herramientas y armas, sino también al desarrollo de objetos de prestigio y arte decorativo.</li>
                      <img src="https://www.lavanguardia.com/files/article_main_microformat/uploads/2021/02/03/601a8f3a5e0ab.jpeg" alt="Descripción de la imagen" width="200" height="150"></img>
                    </ul>
                  </li>
                  <li>
                    <strong>Expansión del comercio y la interacción cultural:</strong>
                    <ul>
                      <li>La metalurgia del bronce facilitó una mayor interacción entre comunidades, no solo en la Península Ibérica, sino también con otras regiones del Mediterráneo.</li>
                      <li>Se intensificó el comercio de materias primas y productos manufacturados, así como de objetos de prestigio como cerámica y joyas, fortaleciendo redes comerciales y culturales.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Desarrollo de asentamientos fortificados:</strong>
                    <ul>
                      <li>Se observó un aumento en la construcción de asentamientos fortificados con murallas y bastiones defensivos.</li>
                      <li>Estos reflejan la necesidad de seguridad y la competencia por recursos en una sociedad en evolución hacia mayor complejidad social.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Arte y expresión cultural:</strong>
                    <ul>
                      <li>La Edad de Bronce fue un período de florecimiento cultural evidenciado en la producción artística y decorativa.</li>
                      <li>Se desarrollaron estilos artísticos distintivos que reflejaban las creencias religiosas, los valores sociales y las tradiciones de las comunidades de la época.</li>
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
              2. Los tiempos prerromanos: invasiones indoeuropeas, colonizaciones históricas, Tartessos y el mundo de los iberos (siglos IX a 111 a.C.) <span className="arrow">&#9660;</span>
            </h3>
            {expanded['preromano'] && (
              <div className="dropdown-content">
                <p>
                  Durante los tiempos prerromanos, la Península Ibérica experimentó las invasiones indoeuropeas, seguidas por colonizaciones históricas de fenicios, griegos y cartagineses. Tartessos, en el sur, emergió como un próspero centro comercial, mientras que los iberos, en diversas tribus y ciudades-estado, forjaron una cultura distintiva que fusionaba influencias locales y externas.
                </p>
                <h4 onClick={() => toggleExpand('invasiones')}>
                  Invasiones Indoeuropeas <span className="arrow">&#9660;</span>
                </h4>
                {expanded['invasiones'] && (
                  <ul>
                  <li>
                      <strong>Llegada de los pueblos indoeuropeos:</strong>
                      <p>Las Invasiones indoeuropeas en la Península Ibérica se remontan al segundo milenio antes de Cristo, cuando grupos de habla indoeuropea, como los celtas, comenzaron a migrar desde Europa Central hacia el sur y el oeste de Europa. Estos pueblos trajeron consigo una nueva lengua, tecnología y formas de organización social que influirían profundamente en la región ibérica.</p>
                  </li>
                  <li>
                      <strong>Impacto cultural y lingüístico:</strong>
                      <p>La llegada de los pueblos indoeuropeos tuvo un impacto significativo en la cultura y la sociedad de la Península Ibérica. Introdujeron nuevas prácticas agrícolas, técnicas metalúrgicas y sistemas de creencias que se fusionaron con las tradiciones locales, dando lugar a una cultura híbrida y diversa.</p>
                      <p>Además, la influencia lingüística de los indoeuropeos es evidente en las lenguas habladas en la Península Ibérica, con la aparición de palabras y estructuras lingüísticas de origen indoeuropeo en las lenguas ibéricas.</p>
                  </li>
                  <li>
                      <strong>Expansión territorial y conflictos:</strong>
                      <p>Con la llegada de los pueblos indoeuropeos, se produjo una expansión territorial y la formación de diversos grupos étnicos y tribales en la Península Ibérica. Esta expansión no estuvo exenta de conflictos y enfrentamientos con las poblaciones locales, lo que llevó a la creación de alianzas y rivalidades entre diferentes grupos.</p>
                  </li>
                  <li>
                      <strong>Legado cultural:</strong>
                      <p>Aunque las invasiones indoeuropeas marcaron el comienzo de una nueva era en la Península Ibérica, su legado cultural perduró a lo largo de los siglos. Muchos aspectos de la cultura, la lengua y la sociedad ibérica posterior reflejan la influencia de los pueblos indoeuropeos y su interacción con las poblaciones locales.</p>
                  </li>
              </ul>
              
                )}
                <h4 onClick={() => toggleExpand('colonizaciones')}>
                  Colonizaciones Historicas<span className="arrow">&#9660;</span>
                </h4>
                {expanded['colonizaciones'] && (
                  <ul>
                  <li>
                      <em><strong>Fenicios:</strong></em>
                      <ul>
                          <li>
                              <strong>Colonización y Ciudades Principales:</strong>
                              <ul>
                                  <li><strong>Gadir (actual Cádiz):</strong> Fundada alrededor del 1100 a.C., Gadir se convirtió en uno de los principales centros de comercio fenicio en el Atlántico. Gracias a su ubicación estratégica, facilitó el comercio de metales preciosos (como plata y estaño), productos agrícolas y bienes de lujo entre la península y otros lugares del Mediterráneo oriental.</li>
                                  <li><strong>Malaka (actual Málaga):</strong> Otro importante centro fenicio en la costa sur de la península, Malaka también sirvió como un puerto clave para el comercio y la interacción cultural entre fenicios y pueblos locales.</li>
                                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Rutas_comerciales_fenicias-es.svg/450px-Rutas_comerciales_fenicias-es.svg.png" alt="Descripción de la imagen" width="200" height="150"></img>
                              </ul>
                          </li>
                          <li>
                              <strong>Cultura y Legado:</strong>
                              <ul>
                                  <li>Los fenicios introdujeron técnicas avanzadas de navegación, como la construcción de barcos robustos y el uso de la estrella polar para la navegación nocturna.</li>
                                  <li>Contribuyeron al desarrollo de la metalurgia y la manufactura, especialmente en la producción de artículos de lujo y objetos de bronce.</li>
                                  <li>La influencia fenicia en la península se puede ver en elementos arquitectónicos, sistemas de escritura (aunque menos influyentes que el alfabeto griego y latino posteriormente), y en términos lingüísticos y culturales que perduraron en las regiones que colonizaron.</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li>
                  <em><strong>Griegos:</strong></em>
                      <ul>
                          <li>
                              <strong>Colonización y Ciudades Principales:</strong>
                              <ul>
                                  <li><strong>Emporion (actual Ampurias):</strong> Fundada alrededor del 600 a.C., Emporion se convirtió en un importante enclave comercial griego en la costa noreste de la península. Facilitó el comercio de vinos, aceites y cerámica griega con las poblaciones locales.</li>
                                  <li><strong>Otros pequeños enclaves griegos:</strong> como Rhode (cerca de Roses) también contribuyeron al intercambio cultural y comercial en la región.</li>
                                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Greek_Colonization_Archaic_Period-es.svg/1200px-Greek_Colonization_Archaic_Period-es.svg.png" alt="Descripción de la imagen" width="200" height="150"></img>
                              </ul>
                          </li>
                          <li>
                              <strong>Cultura y Legado:</strong>
                              <ul>
                                  <li>Introdujeron el arte y la arquitectura griega, incluyendo técnicas de construcción y decoración que influirían en el desarrollo posterior de la arquitectura romana y románica en la península.</li>
                                  <li>Contribuyeron al desarrollo de técnicas agrícolas y comerciales que ayudaron a las comunidades locales a mejorar la productividad y la gestión de recursos.</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li>
                  <em><strong>Cartagineses:</strong></em>
                      <ul>
                          <li>
                              <strong>Colonización y Ciudades Principales:</strong>
                              <ul>
                                  <li><strong>Carthago Nova (actual Cartagena):</strong> Fundada en el 227 a.C., Carthago Nova se convirtió en la capital de los territorios cartagineses en la península. Fue un centro vital para el comercio y la actividad naval en el Mediterráneo occidental.</li>
                                  <li><strong>Otros asentamientos cartagineses:</strong> incluyen Saguntum (actual Sagunto), que tuvo un papel crucial en los conflictos entre cartagineses y romanos en la península.</li>
                                  <img src="https://historiaespana.es/wp-content/uploads/mapa-cartago-hispania.jpg" alt="Descripción de la imagen" width="200" height="150"></img>
                              </ul>
                          </li>
                          <li>
                              <strong>Cultura y Legado:</strong>
                              <ul>
                                  <li>Los cartagineses introdujeron sistemas administrativos más centralizados y estructurados, que influirían en la organización política de las regiones donde establecieron sus colonias.</li>
                                  <li>Contribuyeron al desarrollo de infraestructuras portuarias y defensivas, fortaleciendo las capacidades comerciales y militares de la península.</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
              </ul>
              )}

              <h4 onClick={() => toggleExpand('tartessos')}>
              Tartessos y el mundo de los iberos (siglos IX a 111 a.C.)<span className="arrow">&#9660;</span>
                </h4>
                {expanded['tartessos'] && (
                  <ul>
                    <li>
                        <strong>Tartessos:</strong>
                        <p>Tartessos fue una antigua civilización en el sur de la Península Ibérica, que floreció durante los siglos IX al VI a.C. Se cree que su capital estaba situada en la zona de la desembocadura del río Guadalquivir. Tartessos era conocida por su riqueza en minerales, especialmente en plata, que comerciaba con otras civilizaciones mediterráneas como los fenicios.</p>
                        <img src="https://dehistoriae.com/wp-content/uploads/2016/10/tartesos.jpg?w=900&h=682" alt="Descripción de la imagen" width="200" height="150"></img>
                    </li>
                    <li>
                        <strong>Influencia fenicia:</strong>
                        <p>Los fenicios establecieron relaciones comerciales con Tartessos, lo que contribuyó a su prosperidad y desarrollo económico. La influencia fenicia se reflejó en la cultura material y en las prácticas comerciales de Tartessos, así como en la adopción de la escritura y otros aspectos de la civilización fenicia.</p>
                    </li>
                    <li>
                        <strong>Mundo de los iberos:</strong>
                        <p>Los iberos eran un pueblo indígena que habitaba la Península Ibérica durante la Antigüedad. Se organizaron en diversas tribus y ciudades-estado, cada una con su propio sistema político y social. Los iberos eran conocidos por su habilidad en la metalurgia, la cerámica y la alfarería, así como por su arte distintivo, que incluía esculturas, cerámica pintada y arte rupestre.</p>
                    </li>
                    <li>
                        <strong>Interacción cultural:</strong>
                        <p>Hubo una intensa interacción cultural entre Tartessos, los fenicios y los iberos, que contribuyó al intercambio de conocimientos, tecnologías y bienes materiales. Esta interacción se reflejó en la arquitectura, el arte, la religión y otras áreas de la vida cotidiana de estas civilizaciones.</p>
                    </li>
                  </ul>
              )}
              </div>
            )}
          </div>
        </div>

        <div className="expandable-section">
          <div className="dropdown-box">
            <h3 onClick={() => toggleExpand('romas')}>
              3. La conquista romana de la península Ibérica y el proceso de romanización. La Hispania romana (siglos 111 a.C. -IV d.C.).<span className="arrow">&#9660;</span>
            </h3>
            {expanded['romas'] && (
              <div className="dropdown-content">
                <p>
                  La historia de la Península Ibérica se remonta a tiempos muy antiguos, cuando los primeros grupos de humanos llegaron a la región durante el Paleolítico temprano. A lo largo de milenios, estas sociedades cazadoras y recolectoras evolucionaron, adaptándose a los desafíos del entorno y desarrollando nuevas técnicas y herramientas para sobrevivir.
                </p>
                <h4 onClick={() => toggleExpand('conquista')}>
                  La conquista romana de la Peninsula Ibérica <span className="arrow">&#9660;</span>
                </h4>
                {expanded['conquista'] && (
                  <ul>
                  <li>
                    <em><strong>Inicio de la conquista:</strong></em>
                    <ul>
                      <li>La conquista romana de la Península Ibérica comenzó en el año 218 a.C. durante la Segunda Guerra Púnica, cuando las legiones romanas dirigidas por Aníbal Barca llegaron a la región.</li>
                      <li>Tras la derrota de Aníbal en el año 202 a.C., Roma intensificó su expansión hacia el sur y el oeste de la península, consolidando gradualmente su dominio.</li>
                      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgP3u3_NLC7PdQDBjkXT9IixW5c7hhzlvmNthyphenhyphenRKcgAyTnyzjaAV4v0wIVQo5Idhw6u2OWkVx7WQNWPmzMAk8evS1SjnFrDJmm4ynP49C25gDXgRcrV8Y6zfZj1m1jCRhDc1M-KLqf7GQc/s1600/2.+ETAPAS+DE+LA+CONQUISTA+ROMANA.gif" alt="Descripción de la imagen" width="200" height="150"></img>
                    </ul>
                  </li>
                  <li>
                    <em><strong>Sometimiento de los pueblos indígenas:</strong></em>
                    <ul>
                      <li>En los siglos II y I a.C., Roma sometió a los diversos pueblos que habitaban la península, como los íberos en el este y los celtíberos en el centro y norte.</li>
                      <li>A través de campañas militares y alianzas con tribus locales, Roma extendió su control sobre la región, estableciendo una red de ciudades y fortificaciones para consolidar su dominio.</li>
                    </ul>
                  </li>
                  <li>
                    <em><strong>Resistencia y rebeliones:</strong></em>
                    <ul>
                      <li>A pesar de la conquista romana, hubo varias rebeliones y resistencias por parte de los pueblos indígenas contra el dominio romano.</li>
                      <li>Destaca la resistencia de Viriato, líder lusitano, quien desafió a Roma durante la segunda mitad del siglo II a.C., aunque finalmente fue asesinado por traidores.</li>
                    </ul>
                  </li>
                  <li>
                    <em><strong>Impacto cultural:</strong></em>
                    <ul>
                      <li>La conquista romana introdujo significativos cambios culturales en la Península Ibérica.</li>
                      <li>Se implantó la lengua latina, el derecho romano y la organización urbana, transformando profundamente la estructura social y política de la región.</li>
                      <li>Además, se promovió la construcción de infraestructuras como calzadas y acueductos, que facilitaron la administración y el comercio.</li>
                      <li>El arte y la arquitectura romana también dejaron una huella duradera, evidenciada en la construcción de templos, teatros y villas romanas.</li>
                    </ul>
                  </li>
                </ul>
                )}
                <h4 onClick={() => toggleExpand('romanizacion')}>
                  El proceso de romanización <span className="arrow">&#9660;</span>
                </h4>
                {expanded['romanizacion'] && (
                  <ul>
                  <li>
                    <ul>
                      <li><em><strong>Introducción de la cultura romana:</strong></em>
                        <ul>
                          <li><strong>Lengua y legislación:</strong> La lengua latina se impuso como la lengua oficial y administrativa, utilizada en documentos legales, inscripciones y comunicaciones oficiales. Las leyes romanas proporcionaron un marco legal uniforme que reemplazó a las leyes locales preexistentes.</li>
                          <li><strong>Religión y costumbres:</strong> La religión romana, con sus rituales y deidades, se difundió junto con las prácticas culturales y sociales romanas. Los festivales romanos y las ceremonias públicas se incorporaron a la vida cotidiana.</li>
                        </ul>
                      </li>
                      <li><em>Economía y urbanización:</em>
                        <ul>
                          <li><strong>Infraestructura:</strong> La construcción de calzadas, puentes y acueductos fue fundamental para conectar y desarrollar las ciudades y las regiones rurales. Estas infraestructuras facilitaron el comercio interno y externo, mejorando la integración económica de la península con el resto del Imperio Romano.</li>
                          <li><strong>Actividades económicas:</strong> La agricultura experimentó mejoras significativas con nuevas técnicas y cultivos introducidos por los romanos. Además, la explotación minera y la producción artesanal se expandieron, contribuyendo a la riqueza y diversificación económica de la región.</li>
                        </ul>
                      </li>
                      <li><em><strong>Impacto social y cultural:</strong></em>
                        <ul>
                          <li><strong>Sociedad:</strong> Las élites locales adoptaron la cultura romana para ascender socialmente y obtener la ciudadanía romana, lo que implicaba derechos y privilegios especiales. Esto llevó a una estratificación social más compleja y diferenciada.</li>
                          <li><strong>Cultura híbrida:</strong> La romanización no fue simplemente una imposición cultural, sino que también se produjo una fusión de elementos locales con elementos romanos. Esto se reflejó en la arquitectura, el arte, la literatura y las tradiciones populares, creando una cultura híbrida que perduró mucho tiempo después de la caída del Imperio Romano en la región.</li>
                          <li><strong>Legado duradero:</strong> La influencia romana dejó un legado profundo en la Península Ibérica, visible en la organización urbana, las infraestructuras, las prácticas agrícolas y las tradiciones culturales. Incluso después de la desintegración del Imperio Romano de Occidente, muchos de estos aspectos continuaron influenciando la vida y la cultura en la península durante siglos.</li>
                          <img src="https://eolapaz.com/wp-content/uploads/2020/09/historia-romanizacion.jpg" alt="Descripción de la imagen" width="200" height="150"></img>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              
                )}
                <h4 onClick={() => toggleExpand('historia')}>
                  La historia romana <span className="arrow">&#9660;</span>
                </h4>
                {expanded['historia'] && (
                  <ul>
                  <li>
                    <em><strong>Organización Política:</strong></em>
                    <ul>
                      <li>
                        Durante la dominación romana, la Península Ibérica se estructuró en diversas provincias con su propia administración y gobernador. Las principales eran:
                        <ul>
                          <li>Hispania Citerior (más cercana a Roma)</li>
                          <li>Hispania Ulterior (más lejana)</li>
                          <li>Lusitania (zona occidental)</li>
                        </ul>
                      </li>
                      <li>
                        Ciudades importantes como Tarraco (Tarragona), Corduba (Córdoba) y Emerita Augusta (Mérida) funcionaban como centros administrativos y culturales, ejerciendo influencia romana en la región.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <em><strong>Crisis y Declive del Imperio Romano:</strong></em>
                    <ul>
                      <li>
                        En el siglo III d.C., el Imperio Romano enfrentó serias crisis internas y externas, afectando también a Hispania.
                      </li>
                      <li>
                        Las invasiones de pueblos bárbaros como los suevos, vándalos y alanos intensificaron las dificultades del imperio y amenazaron las fronteras de la Península Ibérica.
                      </li>
                      <li>
                        Estos pueblos establecieron reinos dentro del territorio romano, desafiando la autoridad imperial y contribuyendo al debilitamiento del control romano sobre Hispania.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <em><strong>Reino Suevo y el Fin de la Hispania Romana:</strong></em>
                    <ul>
                      <li>
                        En el año 409 d.C., los suevos establecieron un reino en el noroeste de la península, en la región que corresponde a Galicia y parte de Portugal.
                      </li>
                      <li>
                        Este hecho marcó el inicio del fin del dominio romano sobre Hispania, evidenciando la pérdida de control efectivo del Imperio Romano en grandes áreas de la península.
                      </li>
                      <li>
                        La autoridad imperial se debilitó aún más, y otras partes de la península fueron ocupadas por diferentes grupos bárbaros, lo que contribuyó al inicio de la Edad Media en la región.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <em><strong>Inicio de la Edad Media en la Región:</strong></em>
                    <ul>
                      <li>
                        La presencia y establecimiento de reinos bárbaros en la Península Ibérica marcaron el inicio de la Edad Media.
                      </li>
                      <li>
                        Aunque el dominio romano no desapareció de inmediato en algunas áreas del sur y este de la península, la estructura política y social experimentó cambios profundos.
                      </li>
                      <li>
                        La llegada de los visigodos a principios del siglo V d.C. fue crucial, ya que establecieron un reino que configuró el futuro político de la península durante la Edad Media.
                      </li>
                    </ul>
                  </li>
                </ul>
                )}
              </div>
            )}
          </div>
       </div>
       <div className="quiz-button-container">
          <Link to="/asignatura/2/tema/1/quiz" className="quiz-button">Ir al Quiz</Link>
        </div>
      <div className="about-section-historia-tema1">
        <h2>¿Qué es BachInfo?</h2>
        <p>BachInfo es un TFG (Trabajo de Fin de Grado) con el propósito de ayudar a estudiantes de 2º de Bachillerato, empleando una metodología que incluye la revisión del currículo educativo, entrevistas con docentes, y análisis de recursos educativos en línea para identificar contenidos relevantes.</p>
      </div>
    </div>
   </div>
  );
}

export default Tema1Historia;

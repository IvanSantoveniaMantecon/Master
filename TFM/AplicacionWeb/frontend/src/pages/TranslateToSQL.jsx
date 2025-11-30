import React, { useState, useEffect } from 'react';
import api from '../services/api'; // <-- Nuevo
import './styles/TranslateToSQL.css';

const TranslateToSQL = () => {
  const [question, setQuestion] = useState('');
  const [sql, setSql] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState('todo');

  const [preguntasFrecuencia, setPreguntasFrecuencia] = useState([]);
  const [preguntaFrecuenciaSeleccionada, setPreguntaFrecuenciaSeleccionada] = useState(null);

  const [preguntasSinFrecuencia, setPreguntasSinFrecuencia] = useState([]);
  const [preguntaSinFrecuenciaSeleccionada, setPreguntaSinFrecuenciaSeleccionada] = useState(null);

  const [opcionesRespuesta, setOpcionesRespuesta] = useState([]);

  const sugerencias = [
    'Todos los usuarios que respondieron en un plazo de 2 días a la pregunta sin frecuencia de id 8, 3 veces',
    '¿Qué usuarios han respondido con frecuencia "Nunca" a la pregunta con ID 1 en los últimos 7 días?',
    '¿Qué usuarios respondieron sin frecuencia "Ruido en los oídos" como problema 3 en los últimos 3 días?',
  ];

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const [resFrecuencia, resSinFrecuencia] = await Promise.all([
          api.get('/preguntas_frecuencia'),
          api.get('/preguntas_sin_frecuencia'),
        ]);
        setPreguntasFrecuencia(resFrecuencia.data);
        setPreguntasSinFrecuencia(resSinFrecuencia.data);
      } catch (err) {
        console.error('Error al cargar preguntas:', err);
      }
    };
    fetchPreguntas();
  }, []);

  useEffect(() => {
    const fetchOpcionesRespuesta = async () => {
      if (!preguntaFrecuenciaSeleccionada?.id) {
        setOpcionesRespuesta([]);
        return;
      }
      try {
        const res = await api.get(`/opciones_preguntas_frecuencia/${preguntaFrecuenciaSeleccionada.id}`);
        const { respuesta_1, respuesta_2, respuesta_3, respuesta_4 } = res.data;
        setOpcionesRespuesta(
          [respuesta_1, respuesta_2, respuesta_3, respuesta_4].filter(Boolean)
        );
      } catch (err) {
        console.error('Error al obtener opciones de respuesta:', err);
        setOpcionesRespuesta([]);
      }
    };
    fetchOpcionesRespuesta();
  }, [preguntaFrecuenciaSeleccionada]);

  const handleTranslate = async () => {
    setLoading(true);
    setError(null);
    setSql('');

    try {
      const response = await api.post('/translate-to-sql', {
        question,
        option: selectedOption,
        preguntaFrecuenciaId: preguntaFrecuenciaSeleccionada?.id || null,
        preguntaSinFrecuenciaId: preguntaSinFrecuenciaSeleccionada?.id || null,
      });

      const cleanedSql = response.data.sql.replace(/```/g, '').trim();
      setSql(cleanedSql);
    } catch (err) {
      setError('Error al traducir a SQL');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="translate-sql-wrapper">
      <h2>Traductor de Preguntas a SQL</h2>

      {/* Sugerencias */}
      <div className="form-group sugerencias-box">
        <label>Sugerencias de preguntas:</label>
        <ul>
          {sugerencias.map((sug, index) => (
            <li
              key={index}
              onClick={() => setQuestion(sug)}
              className="sugerencia-item"
            >
              {sug}
            </li>
          ))}
        </ul>
      </div>

      {/* Selector de preguntas con frecuencia */}
      {selectedOption === 'con_frecuencia' && (
        <div className="form-group">
          <label>Selecciona o escribe una pregunta de frecuencia:</label>
          <div className="frecuencia-selector">
            <input
              list="frecuenciaOptions"
              className="selectBox"
              value={preguntaFrecuenciaSeleccionada?.pregunta || ''}
              onChange={(e) => {
                const selected = preguntasFrecuencia.find(p => p.pregunta === e.target.value);
                setPreguntaFrecuenciaSeleccionada(selected || { pregunta: e.target.value, id: null });
              }}
              placeholder="Escribe o selecciona una pregunta..."
            />
            <datalist id="frecuenciaOptions">
              <option value="" />
              {preguntasFrecuencia.map((p) => (
                <option key={p.id} value={p.pregunta} />
              ))}
            </datalist>

            <input
              type="text"
              value={preguntaFrecuenciaSeleccionada?.id || ''}
              readOnly
              className="idBox"
            />
          </div>

          {opcionesRespuesta.length > 0 && (
            <div className="opciones-respuesta">
              <label>Opciones de respuesta:</label>
              <ul>
                {opcionesRespuesta.map((respuesta, index) => (
                  <li key={index}>{respuesta}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Selector de preguntas sin frecuencia */}
      {selectedOption === 'sin_frecuencia' && (
        <div className="form-group">
          <label>Selecciona o escribe una pregunta sin frecuencia:</label>
          <div className="frecuencia-selector">
            <input
              list="sinFrecuenciaOptions"
              className="selectBox"
              value={
                preguntaSinFrecuenciaSeleccionada?.menu_1
                  ? [preguntaSinFrecuenciaSeleccionada.menu_1, preguntaSinFrecuenciaSeleccionada.menu_2, preguntaSinFrecuenciaSeleccionada.menu_3]
                      .filter(Boolean)
                      .join(' → ')
                  : ''
              }
              onChange={(e) => {
                const value = e.target.value;
                const selected = preguntasSinFrecuencia.find(p =>
                  `${p.menu_1} → ${p.menu_2} → ${p.menu_3}` === value
                );
                if (selected) {
                  setPreguntaSinFrecuenciaSeleccionada(selected);
                } else {
                  const [menu_1 = '', menu_2 = '', menu_3 = ''] = value.split('→').map(s => s.trim());
                  setPreguntaSinFrecuenciaSeleccionada({ id: null, menu_1, menu_2, menu_3 });
                }
              }}
              placeholder="Escribe o selecciona una pregunta..."
            />
            <datalist id="sinFrecuenciaOptions">
              <option value="" />
              {preguntasSinFrecuencia.map((p) => (
                <option key={p.id} value={`${p.menu_1} → ${p.menu_2} → ${p.menu_3}`} />
              ))}
            </datalist>

            <input
              type="text"
              value={preguntaSinFrecuenciaSeleccionada?.id || ''}
              readOnly
              className="idBox"
            />
          </div>
        </div>
      )}

      {/* Tipo de pregunta */}
      <div className="form-group">
        <label>Selecciona tipo de respuesta:</label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={selectedOption === 'todo'}
              onChange={() => setSelectedOption('todo')}
            />
            Todo
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOption === 'sin_frecuencia'}
              onChange={() => setSelectedOption('sin_frecuencia')}
            />
            Respuesta sin frecuencia
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedOption === 'con_frecuencia'}
              onChange={() => setSelectedOption('con_frecuencia')}
            />
            Respuesta con frecuencia
          </label>
        </div>
      </div>

      {/* Entrada libre */}
      <div className="form-group">
        <label htmlFor="inputQuestion">Pregunta (ingresa texto):</label>
        <textarea
          id="inputQuestion"
          className="inputBox"
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Escribe tu pregunta aquí..."
        />
      </div>

      {/* Botón */}
      <div className="form-group">
        <button
          onClick={handleTranslate}
          disabled={loading || !question.trim()}
          className="btnTranslate"
        >
          {loading ? 'Traduciendo...' : 'Traducir a SQL'}
        </button>
      </div>

      {error && <p className="errorMsg">{error}</p>}

      {/* Resultado */}
      <div className="form-group">
        <label htmlFor="outputSQL">Consulta SQL generada:</label>
        <textarea
          id="outputSQL"
          className="outputBox"
          rows={8}
          value={sql}
          readOnly
          spellCheck={false}
          placeholder="Aquí aparecerá la consulta SQL traducida"
        />
      </div>
    </div>
  );
};

export default TranslateToSQL;

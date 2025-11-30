import React, { useState, useEffect } from 'react';
import './AddQuestion.css';
import Sidebar from '../../../components/Sidebar/Sidebar.jsx';

function AddQuestionForm() {
  const [questionText, setQuestionText] = useState('');
  const [answerOptions, setAnswerOptions] = useState([
    { answerText: '', isCorrect: false },
    { answerText: '', isCorrect: false },
    { answerText: '', isCorrect: false },
    { answerText: '', isCorrect: false },
  ]);
  const [testNumber, setTestNumber] = useState('');
  const [NumAsignatura, setNumAsignatura] = useState('');
  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(() => {
    const fetchAsignaturas = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_URL + '/asignaturas');
        if (!response.ok) {
          throw new Error('Error al obtener las asignaturas');
        }
        const data = await response.json();
        setAsignaturas(data);
      } catch (error) {
        console.error('Error fetching asignaturas:', error);
      }
    };

    fetchAsignaturas();
  }, []);

  const handleAnswerTextChange = (index, newText) => {
    const updatedAnswerOptions = [...answerOptions];
    updatedAnswerOptions[index].answerText = newText;
    setAnswerOptions(updatedAnswerOptions);
  };

  const handleCorrectAnswerChange = (index) => {
    const updatedAnswerOptions = answerOptions.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));
    setAnswerOptions(updatedAnswerOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const correctAnswer = answerOptions.find(option => option.isCorrect);
    const incorrectAnswers = answerOptions.filter(option => !option.isCorrect);
  
    if (!correctAnswer) {
      alert('Por favor, selecciona una respuesta correcta.');
      return; // Salir si no hay respuesta correcta
    }
  
    // Preparar el cuerpo con la respuesta correcta en la posición correcta
    const body = {
      NumAsignatura,
      testNumber,
      questionText,
      answerOptions: [
        correctAnswer, // Respuesta correcta
        ...(incorrectAnswers.length > 0 ? incorrectAnswers : [{ answerText: '', isCorrect: false }]), // Respuestas incorrectas
        { answerText: '', isCorrect: false }, // Asegurar que haya un espacio para RespuestaMala2 y RespuestaMala3
        { answerText: '', isCorrect: false },
      ].slice(0, 4), // Asegurarnos de que solo haya 4 opciones
    };
  
    try {
      const response = await fetch(import.meta.env.VITE_URL + '/addQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error('Error al agregar pregunta');
      }
      alert('Pregunta agregada correctamente');
      // Limpiar el formulario
      setTestNumber('');
      setQuestionText('');
      setAnswerOptions([
        { answerText: '', isCorrect: false },
        { answerText: '', isCorrect: false },
        { answerText: '', isCorrect: false },
        { answerText: '', isCorrect: false },
      ]);
      setNumAsignatura('');
    } catch (error) {
      console.error('Error al agregar pregunta:', error);
      alert('Hubo un error al agregar la pregunta');
    }
  };
  const username = localStorage.getItem('user');
  const rol = localStorage.getItem('rol');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="add-question-form-container">
      <Sidebar username={username} rol={rol} handleLogout={handleLogout} />
      <h2>Añadir Nueva Pregunta</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Número de Asignatura:
          <select
            value={NumAsignatura}
            onChange={(e) => setNumAsignatura(e.target.value)}
            required
          >
            <option value="">Selecciona una asignatura</option>
            {asignaturas.map(asignatura => (
              <option key={asignatura.NumAsignatura} value={asignatura.NumAsignatura}>
                {asignatura.NombreAsignatura}
              </option>
            ))}
          </select>
        </label>
        <label>
          Número de Test:
          <input
            type="text"
            value={testNumber}
            onChange={(e) => setTestNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Pregunta:
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </label>
{answerOptions.map((option, index) => (
  <div key={index} className="answer-option">
    <label className="answer-label">
      Opción {index + 1}:
    </label>
    <div className="answer-input-container">
      <input
        type="text"
        value={option.answerText}
        onChange={(e) => handleAnswerTextChange(index, e.target.value)}
        required
      />
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={option.isCorrect}
          onChange={() => handleCorrectAnswerChange(index)}
        />
        Correcta
      </label>
    </div>
  </div>
))}



        <button type="submit">Agregar Pregunta</button>
      </form>
    </div>
  );
}

export default AddQuestionForm;

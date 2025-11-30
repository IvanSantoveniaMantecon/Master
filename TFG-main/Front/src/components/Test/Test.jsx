import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Test.css';
import Sidebar from '../Sidebar/Sidebar.jsx';

function Test() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const { NumAsignatura, NumTest } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_URL + `/test/${NumAsignatura}/${NumTest}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const formattedQuestions = data.map(pregunta => {
          const answerOptions = [
            { answerText: pregunta.RespuestaBuena, isCorrect: true },
            { answerText: pregunta.RespuestaMala1, isCorrect: false },
            { answerText: pregunta.RespuestaMala2, isCorrect: false },
            { answerText: pregunta.RespuestaMala3, isCorrect: false }
          ];

          return {
            questionText: pregunta.Pregunta,
            answerOptions: shuffle(answerOptions) // Shuffle the answer options
          };
        });

        setQuestions(formattedQuestions);
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
      }
    };

    fetchQuestions();
  }, [NumAsignatura, NumTest]);

  // Function to shuffle an array
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    const previousQuestion = currentQuestion - 1;
    if (previousQuestion >= 0) {
      setCurrentQuestion(previousQuestion);
    }
  };

  const username = localStorage.getItem('user');
  const rol = localStorage.getItem('rol');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className='main-container-quiz-matematicas-tema2'>
      <Sidebar username={username} rol={rol} handleLogout={handleLogout} />
      {showScore ? (
        <div className='score-section'>
          Lograste {score} de {questions.length}
          <div className="finish-button-container">
            <a href="/landing-page" className='finish-button'>Finalizar</a>
          </div>
        </div>
      ) : (
        <div className='quiz-container'>
          <div className='question-section'>
            <div className='question-count'>
              <span>Pregunta {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='question-text'>{questions[currentQuestion]?.questionText}</div>
            <div className='answer-section'>
              {questions[currentQuestion]?.answerOptions.map((answerOption, index) => (
                <button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                  {answerOption.answerText}
                </button>
              ))}
            </div>
          </div>
          <div className='navigation-buttons'>
            <button
              className='prev-button circular-button'
              onClick={handlePreviousQuestion}
              style={{ visibility: currentQuestion === 0 ? 'hidden' : 'visible' }}
            >
              &#9664; {/* Left arrow */}
            </button>
            <button className='finish-button' onClick={() => setShowScore(true)}>
                Finalizar
            </button>

              <button className='next-button circular-button' onClick={handleNextQuestion} style={{ visibility: currentQuestion < questions.length - 1 ? 'visible' : 'hidden' }}>
                &#9654; {/* Right arrow */}
              </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Test;
import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_URL + '/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Inicio de sesión exitoso:', data);
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', data.username);
        localStorage.setItem('rol', data.roles);
        navigate('/landing-page');
      } else {
        const errorData = await response.json();
        console.error('Error al iniciar sesión:', errorData);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleCreateUser = () => {
    navigate('/create-user');
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Iniciar Sesion</h2>
        <label>
          Usuario:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <div className="button-container">
          <button onClick={handleLogin}>Iniciar Sesion</button>
        </div>
        <p className="signup-text">
          ¿No tienes usuario? <span onClick={handleCreateUser} className="signup-link">Crear usuario</span>
        </p>
      </div>
    </div>
  );
};

export default Login;

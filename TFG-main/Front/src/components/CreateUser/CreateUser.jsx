import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';

const CreateUser = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const role = 'user'; // Rol predefinido como 'user'

    const handleSignUp = async () => {
        if (username.trim() === '') {
            alert('Por favor, rellena el campo de usuario.');
            return;
        }
        if (password.trim() === '') {
            alert('Por favor, rellena el campo de contraseña.');
            return;
        }
        if (email.trim() === '') {
            alert('Por favor, rellena el campo de email.');
            return;
        }

        try {
            const response = await fetch(import.meta.env.VITE_URL + '/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, roles: [role], email }),
            });

            if (response.ok) {
                alert("Usuario creado con éxito");
                navigate("/");
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleGoBack = () => {
        navigate("/");
    };

    return (
        <div className="create-user-wrapper">
            <div className="create-user-container">
                <h2>Crear Usuario</h2>
                <label>
                    Usuario:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Contraseña:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <div className="button-container">
                    <button onClick={handleSignUp}>
                        Crear Usuario
                    </button>
                </div>
                <p className="signin-text">
                    ¿Ya tienes usuario? <span onClick={handleGoBack} className="signin-link">Iniciar sesión</span>
                </p>
            </div>
        </div>
    );
};

export default CreateUser;

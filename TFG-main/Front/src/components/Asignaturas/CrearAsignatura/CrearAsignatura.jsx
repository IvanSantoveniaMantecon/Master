import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import './CrearAsignatura.css';
import Sidebar from '../../Sidebar/Sidebar.jsx';

const CrearAsignatura = () => {
    const [nombreAsignatura, setNombreAsignatura] = useState('');
    const [colorFondo, setColorFondo] = useState('#ffffff');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nombreAsignatura,
            colorFondo,
        };

        try {
            const response = await fetch(import.meta.env.VITE_URL + '/addAsignatura', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error al crear la asignatura');
            }

            alert('Asignatura creada correctamente');
        } catch (error) {
            console.error('Error al enviar la asignatura:', error);
            alert('Error al crear la asignatura');
        }
    };

    const handleColorChange = (color) => {
        setColorFondo(color.hex);
    };

    const username = localStorage.getItem('user');
    const rol = localStorage.getItem('rol');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="crear-asignatura-container">
            <Sidebar username={username} rol={rol} handleLogout={handleLogout} />
            <h2>Crear Nueva Asignatura</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombreAsignatura">Nombre de la Asignatura:</label>
                <input
                    type="text"
                    id="nombreAsignatura"
                    value={nombreAsignatura}
                    onChange={(e) => setNombreAsignatura(e.target.value)}
                    required
                />

                <label>Color de Fondo:</label>
                <div className="color-picker-container">
                    <SketchPicker
                        color={colorFondo}
                        onChangeComplete={handleColorChange}
                    />
                </div>

                <button type="submit">Crear Asignatura</button>
            </form>
        </div>
    );
};

export default CrearAsignatura;

import React, { useState, useEffect } from 'react';
import './EditarAsignatura.css'; // Archivo de estilos CSS para el formulario
import Sidebar from '../../Sidebar/Sidebar.jsx';

const EditarAsignatura = () => {
    const [numAsignatura, setNumAsignatura] = useState('');
    const [nombreAsignatura, setNombreAsignatura] = useState('');
    const [colorFondo, setColorFondo] = useState('#ffffff'); // Color de fondo por defecto en blanco
    const [asignaturas, setAsignaturas] = useState([]);

    useEffect(() => {
        // Obtener asignaturas desde el backend
        const fetchAsignaturas = async () => {
            try {
                const response = await fetch('http://localhost:8080/asignaturas');
                if (!response.ok) {
                    throw new Error('Error al obtener las asignaturas');
                }
                const data = await response.json();
                setAsignaturas(data);
            } catch (error) {
                console.error('Error fetching asignaturas:', error);
                // Handle error as needed
            }
        };

        fetchAsignaturas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            NumAsignatura: numAsignatura,
            NombreAsignatura: nombreAsignatura,
            ColorFondo: colorFondo
        };

        try {
            const response = await fetch(import.meta.env.VITE_URL + '/editAsignatura', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error al editar la asignatura');
            }

            alert('Asignatura editada correctamente');
            // Aquí podrías redirigir a otra página o realizar alguna otra acción después de editar la asignatura
        } catch (error) {
            console.error('Error al enviar la asignatura:', error);
            alert('Error al editar la asignatura');
        }
    };

    const handleColorChange = (e) => {
        setColorFondo(e.target.value);
    };

    const username = localStorage.getItem('user');
    const rol = localStorage.getItem('rol');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="editar-asignatura-container">
            <Sidebar username={username} rol={rol} handleLogout={handleLogout} />
            <h2>Editar Asignatura</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="numAsignatura">Número de Asignatura:</label>
                <select
                    id="numAsignatura"
                    value={numAsignatura}
                    onChange={(e) => {
                        const selectedAsignatura = asignaturas.find(asignatura => asignatura.NumAsignatura === parseInt(e.target.value));
                        setNumAsignatura(e.target.value);
                        setNombreAsignatura(selectedAsignatura ? selectedAsignatura.NombreAsignatura : '');
                    }}
                    required
                >
                    <option value="">Selecciona una asignatura</option>
                    {asignaturas.map(asignatura => (
                        <option key={asignatura.NumAsignatura} value={asignatura.NumAsignatura}>
                            {asignatura.NombreAsignatura}
                        </option>
                    ))}
                </select>

                <label htmlFor="nombreAsignatura">Nombre de la Asignatura:</label>
                <input
                    type="text"
                    id="nombreAsignatura"
                    value={nombreAsignatura}
                    onChange={(e) => setNombreAsignatura(e.target.value)}
                    required
                />

                <label htmlFor="colorFondo">Color de Fondo:</label>
                <input
                    type="color"
                    id="colorFondo"
                    value={colorFondo}
                    onChange={handleColorChange}
                    style={{ marginLeft: '10px' }}
                    required
                />
                <button type="submit">Editar Asignatura</button>
            </form>
        </div>
    );
};

export default EditarAsignatura;

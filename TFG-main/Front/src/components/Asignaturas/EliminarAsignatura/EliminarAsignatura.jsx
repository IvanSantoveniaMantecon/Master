import React, { useState, useEffect } from 'react';
import './EliminarAsignatura.css'; // Archivo de estilos CSS para el formulario
import Sidebar from '../../Sidebar/Sidebar.jsx';

const EliminarAsignatura = () => {
    const [numAsignatura, setNumAsignatura] = useState('');
    const [nombreAsignatura, setNombreAsignatura] = useState('');
    const [asignaturas, setAsignaturas] = useState([]);

    useEffect(() => {
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

        try {
            const response = await fetch(import.meta.env.VITE_URL + '/eliminarAsignatura', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ NumAsignatura: numAsignatura, NombreAsignatura: nombreAsignatura }),
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la asignatura');
            }

            alert('Asignatura eliminada correctamente');
            setNumAsignatura('');
            setNombreAsignatura('');
            // Aquí podrías redirigir a otra página o realizar alguna otra acción después de eliminar la asignatura
        } catch (error) {
            console.error('Error al eliminar la asignatura:', error);
            alert('Error al eliminar la asignatura');
        }
    };

    const handleNumAsignaturaChange = (e) => {
        const selectedAsignatura = asignaturas.find(asignatura => asignatura.NumAsignatura === parseInt(e.target.value));
        setNumAsignatura(e.target.value);
        setNombreAsignatura(selectedAsignatura ? selectedAsignatura.NombreAsignatura : '');
    };

    const username = localStorage.getItem('user');
    const rol = localStorage.getItem('rol');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="eliminar-asignatura-container">
            <Sidebar username={username} rol={rol} handleLogout={handleLogout} />
            <h2>Eliminar Asignatura</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="numAsignatura">Número de Asignatura:</label>
                <select
                    id="numAsignatura"
                    value={numAsignatura}
                    onChange={handleNumAsignaturaChange}
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

                <button type="submit">Eliminar Asignatura</button>
            </form>
        </div>
    );
};

export default EliminarAsignatura;

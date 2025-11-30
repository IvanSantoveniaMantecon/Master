import React, { useEffect, useState } from 'react';
import { Typography, message, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './styles/Dashboard.css';

const { Title, Text } = Typography;

const DashboardPage = () => {
    const navigate = useNavigate();
    const [medico, setMedico] = useState(null);
    const [analisisResultados, setAnalisisResultados] = useState([]);
    const [lastSentAt, setLastSentAt] = useState(null);

    const fetchData = async () => {
        try {
            const analisisRes = await api.get('/analisis');

            const respuestas = await Promise.all(
                analisisRes.data.map(async (item) => {
                    try {
                        const res = await api.post('/ejecutar-analisis', { sql: item.pregunta_sql });
                        return {
                            id: item.id,
                            pregunta_natural: item.pregunta_natural,
                            sql: item.pregunta_sql,
                            resultado: res.data.resultado,
                        };
                    } catch (err) {
                        return {
                            id: item.id,
                            pregunta_natural: item.pregunta_natural,
                            sql: item.pregunta_sql,
                            resultado: `❌ Error: ${err.response?.data?.error || err.message}`,
                        };
                    }
                })
            );

            setAnalisisResultados(respuestas);

            const lastSentResponse = await api.get('/ultimo-envio-correo');
            if (lastSentResponse.data.lastSentAt) {
                setLastSentAt(new Date(lastSentResponse.data.lastSentAt));
            }
        } catch (error) {
            message.error('Error al cargar los datos del dashboard.');
            console.error('❌ Error en fetchData:', error);
        }
    };

    useEffect(() => {
        const medicoData = JSON.parse(localStorage.getItem('medico'));
        if (!medicoData || !medicoData.medico) {
            message.warning('Debes iniciar sesión');
            navigate('/login');
        } else {
            setMedico(medicoData.medico);
            fetchData();
        }
    }, [navigate]);

    const canSendEmail = () => {
        if (!lastSentAt) return true;
        const ONE_HOUR = 60 * 60 * 1000;
        return new Date() - lastSentAt > ONE_HOUR;
    };

    const handleEnviarCorreo = async () => {
        if (!canSendEmail()) {
            message.warning('No puedes enviar correos todavía. Espera 1 hora desde el último envío.');
            return;
        }

        try {
            if (analisisResultados.length === 0) {
                message.info('No hay resultados de análisis para enviar.');
                return;
            }

            const contenidoCorreo = analisisResultados
                .map(
                    (item) =>
                        `Pregunta Natural:\n${item.pregunta_natural}\nConsulta SQL:\n${item.sql}\nResultado:\n${JSON.stringify(
                            item.resultado,
                            null,
                            2
                        )}`
                )
                .join('\n\n');

            const medicosEmails = (await api.get('/medicos')).data.map((m) => m.usuario);

            await api.post('/enviar-correos', {
                correos: medicosEmails,
                contenido: contenidoCorreo,
            });

            await api.post('/guardar-envio-correo');
            setLastSentAt(new Date());
            message.success('Correos enviados correctamente.');
        } catch (error) {
            message.error('Error al enviar correos.');
            console.error('Error enviando correos:', error);
        }
    };

    if (!medico) return null;

    return (
        <div className="dashboard-container">
            <Card className="dashboard-card" variant="outlined">
                <Title level={3}>Bienvenido Dr. {medico.usuario || 'Usuario'}</Title>
                <p>Este es tu panel de control.</p>

                <Button
                    type="primary"
                    danger
                    onClick={handleEnviarCorreo}
                    className="send-alerts-button"
                    style={{ marginBottom: 20 }}
                >
                    Enviar resultados de análisis por correo
                </Button>

                <Title level={4} style={{ marginTop: 30 }}>
                    📊 Resultados de análisis SQL
                </Title>
                <div className="analisis-section">
                    {analisisResultados.map((item) => (
                        <div key={item.id} className="analisis-item" style={{ marginBottom: 20 }}>
                            <Text strong>Pregunta Natural:</Text>
                            <p>{item.pregunta_natural}</p>

                            <Text strong>Consulta SQL:</Text>
                            <pre>{item.sql}</pre>

                            <Text strong>Resultado:</Text>
                            <pre>{JSON.stringify(item.resultado, null, 2)}</pre>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default DashboardPage;

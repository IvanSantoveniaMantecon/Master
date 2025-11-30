import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SignupPage from './pages/SignupPage';
import CrearUsuarioPage from './pages/CrearUsuarioPage';
import CrearPreguntasFrecuencia from './pages/CrearPreguntasSinFrecuencia';
import CrearPreguntaConFrecuencia from './pages/CrearPreguntaConFrecuencia';
import DashboardPreguntasSinFrecuencia from './pages/DashboardPreguntasSinFrecuencia';
import DashboardPreguntasConFrecuencia from './pages/DashboardPreguntasConFrecuencia';
import OpcionesPreguntasFrecuencia from './pages/OpcionesPreguntasFrecuencia';
import DashboardUsuarios from './pages/DashboardUsuarios';
import DashboardRespuestasSinFrecuencia from './pages/DashboardRespuestasSinFrecuencia';
import DashboardRespuestasConFrecuencia from './pages/DashboardRespuestasConFrecuencia';
import CrearAnalisis from './pages/CrearAnalisis';                 // ⬅️ Nueva importación
import DashboardAnalisis from './pages/DashboardAnalisis'; 
import TranslateToSQL from './pages/TranslateToSQL';       // ⬅️ Nueva importación
import Header from './components/common/Header';
import Footer from './components/common/Footer';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/crear-usuario" element={<CrearUsuarioPage />} />
        <Route path="/dashboard-usuarios" element={<DashboardUsuarios />} />
        <Route path="/crear-pregunta-sin-frecuencia" element={<CrearPreguntasFrecuencia />} />
        <Route path="/crear-pregunta-con-frecuencia" element={<CrearPreguntaConFrecuencia />} />
        <Route path="/dashboard-preguntas-sin-frecuencia" element={<DashboardPreguntasSinFrecuencia />} />
        <Route path="/dashboard-preguntas-con-frecuencia" element={<DashboardPreguntasConFrecuencia />} />
        <Route path="/opciones-preguntas-frecuencia" element={<OpcionesPreguntasFrecuencia />} />
        <Route path="/dashboard-respuestas-sin-frecuencia" element={<DashboardRespuestasSinFrecuencia />} />
        <Route path="/dashboard-respuestas-con-frecuencia" element={<DashboardRespuestasConFrecuencia />} />
        <Route path="/translate-to-sql" element={<TranslateToSQL />} />
        <Route path="/crear-analisis" element={<CrearAnalisis />} />
        <Route path="/dashboard-analisis" element={<DashboardAnalisis />} />
        

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

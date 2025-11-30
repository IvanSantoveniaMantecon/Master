import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import CreateUser from './components/CreateUser/CreateUser.jsx'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import HistoriaEspañaTema1 from './components/Asignaturas/HistoriaEspaña/Tema1/Tema1Historia.jsx'
import HistoriaEspañaTema2 from './components/Asignaturas/HistoriaEspaña/Tema2/Tema2Historia.jsx'
import MatematicasTema1 from './components/Asignaturas/Matematicas/Tema1/Tema1Matematicas.jsx'
import MatematicasTema2 from './components/Asignaturas/Matematicas/Tema2/Tema2Matematicas.jsx'
import DashboardUsuarios from './components/DashboardUsuarios/DashboardUsuarios.jsx'
import Correo from './components/Correo/Correo.jsx';
import AddQuestionForm from './components/Preguntas/AddQuestion/AddQuestion.jsx';
import RemoveQuestion from './components/Preguntas/RemoveQuestion/RemoveQuestion.jsx';
import AddTema from './components/Temas/AddTema/AddTema.jsx';
import RemoveTemas from './components/Temas/RemoveTemas/RemoveTemas.jsx';
import EditTema from './components/Temas/EditarTemas/EditarTemas.jsx';
import EditarQuestion from './components/Preguntas/EditQuestion/EditQuestion.jsx';
import EditarUsuario from './components/Usuarios/EditarUsuario/EditarUsuario.jsx';
import EliminarUsuario from './components/Usuarios/EliminarUsuario/EliminarUsuario.jsx';
import CrearNoticia from './components/Noticias/CrearNoticia/CrearNoticia.jsx';
import EditarNoticia from './components/Noticias/EditarNoticia/EditarNoticia.jsx';
import EliminarNoticia from './components/Noticias/EliminarNoticia/EliminarNoticia.jsx';
import Asignatura from './components/Asignaturas/Asignatura/Asignatura.jsx';
import CrearAsignatura from './components/Asignaturas/CrearAsignatura/CrearAsignatura.jsx';
import EditarAsignatura from './components/Asignaturas/EditarAsignatura/EditarAsignatura.jsx';
import EliminarAsignatura from './components/Asignaturas/EliminarAsignatura/EliminarAsignatura.jsx';
import Test from './components/Test/Test.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <DashboardUsuarios />
  },
  {
    path: "/create-user",
    element: <CreateUser />
  }  ,
  {
    path: "/landing-page",
    element: <LandingPage />
  },
  { 
    path: "/asignatura/2/tema1",
    element: <HistoriaEspañaTema1 />
  },
  { 
    path: "/asignatura/2/tema2",
    element: <HistoriaEspañaTema2 />
  },
  {
    path: "/asignatura/1/tema1",
    element: <MatematicasTema1 />
  },
  {
    path: "/asignatura/1/tema2",
    element: <MatematicasTema2 />
  },
  {
    path: "/correo",
    element: <Correo />
  },
  {
    path: "/addQuestion",
    element: <AddQuestionForm />
  },
  {
    path: "/addTema",
    element: <AddTema />
  },
  {
    path: "/removeTemas",
    element: <RemoveTemas />
  },
  {
    path: "/editTema",
    element: <EditTema />
  },
  {
    path: "/removequestion",
    element: <RemoveQuestion />
  },
  {
    path: "/editQuestion",
    element: <EditarQuestion />
  },
  {
    path: "/editUsuario",
    element: <EditarUsuario />
  },
  {
    path: "/eliminarUsuario",
    element: <EliminarUsuario />
  },
  {
    path: "/crearNoticia",
    element: <CrearNoticia />
  },
  {
    path: "/editarNoticia",
    element: <EditarNoticia />
  },
  {
    path: "/eliminarNoticia",
    element: <EliminarNoticia />
  },
  {
    path: "/asignatura/:NumAsignatura",
    element: <Asignatura />,
  },
  {
    path: "/asignatura/:NumAsignatura/tema/:NumTest/quiz",
    element: <Test />,
  },
  {
    path: "/crearAsignatura",
    element: <CrearAsignatura />,
  },  
  {
    path: "/editarAsignatura",
    element: <EditarAsignatura />,
  },
  {
    path: "/eliminarAsignatura",
    element: <EliminarAsignatura />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)

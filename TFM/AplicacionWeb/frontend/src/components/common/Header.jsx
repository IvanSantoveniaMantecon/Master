import React, { useContext, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Header.css';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/images/logo.jpeg';

const { Header } = Layout;
const { SubMenu } = Menu;

function CustomHeader() {
  const { medico, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {}, [medico]);

  return (
    <Header className="custom-header">
      <div className="logo">
        <img src={logo} alt="SymptoRules Logo" />
        SymptoRules
      </div>
      <Menu theme="dark" mode="horizontal" className="menu">
        {medico ? (
          <>
            <Menu.Item key="dashboard">
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>

            <SubMenu key="usuarios" title="Usuarios">
              <Menu.Item key="dashboard-usuarios">
                <Link to="/dashboard-usuarios">Dashboard Usuarios</Link>
              </Menu.Item>
              <Menu.Item key="crear-usuario">
                <Link to="/crear-usuario">Crear Usuario</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="preguntas" title="Preguntas">
              <SubMenu key="sin-frecuencia" title="Sin Frecuencia">
                <Menu.Item key="dashboard-preguntas-sin-frecuencia">
                  <Link to="/dashboard-preguntas-sin-frecuencia">Ver Preguntas</Link>
                </Menu.Item>
                <Menu.Item key="crear-pregunta-sin-frecuencia">
                  <Link to="/crear-pregunta-sin-frecuencia">Crear Pregunta</Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="con-frecuencia" title="Con Frecuencia">
                <Menu.Item key="dashboard-preguntas-con-frecuencia">
                  <Link to="/dashboard-preguntas-con-frecuencia">Ver Preguntas</Link>
                </Menu.Item>
                <Menu.Item key="crear-pregunta-con-frecuencia">
                  <Link to="/crear-pregunta-con-frecuencia">Crear Pregunta</Link>
                </Menu.Item>
              </SubMenu>
            </SubMenu>

            <SubMenu key="respuestas" title="Respuestas">
              <Menu.Item key="dashboard-respuestas-sin-frecuencia">
                <Link to="/dashboard-respuestas-sin-frecuencia">Sin Frecuencia</Link>
              </Menu.Item>
              <Menu.Item key="dashboard-respuestas-con-frecuencia">
                <Link to="/dashboard-respuestas-con-frecuencia">Con Frecuencia</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="analisis" title="Análisis">
              <Menu.Item key="traducir-sql">
                <Link to="/translate-to-sql">Traductor SQL</Link>
              </Menu.Item>
              <Menu.Item key="crear-analisis">
                <Link to="/crear-analisis">Crear Análisis</Link>
              </Menu.Item>
              <Menu.Item key="dashboard-analisis">
                <Link to="/dashboard-analisis">Dashboard Análisis</Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="logout" className="logout-item" onClick={handleLogout}>
              Cerrar sesión
            </Menu.Item>
          </>
        ) : (
          <Menu.Item key="login">
            <Link to="/login">Iniciar sesión</Link>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
}

export default CustomHeader;

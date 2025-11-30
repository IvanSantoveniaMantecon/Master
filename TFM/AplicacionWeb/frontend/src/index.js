import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import reportWebVitals from './reportWebVitals';
import logo from './assets/images/logo.jpeg'; // ✅ Importamos la imagen

// Cambiar título de la pestaña
document.title = "SymptoRules";

// Eliminar favicon anterior si existe
const oldLink = document.querySelector("link[rel='icon']");
if (oldLink) {
  oldLink.parentNode.removeChild(oldLink);
}

// Crear favicon nuevo
const link = document.createElement('link');
link.rel = 'icon';
link.type = 'image/jpeg'; // También puede ser 'image/png' si es PNG
link.href = logo;
document.head.appendChild(link);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();

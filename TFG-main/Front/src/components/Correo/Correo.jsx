import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Sidebar from '../Sidebar/Sidebar.jsx';
import './Correo.css';

function Correo() {
    const refForm = useRef();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const username = localStorage.getItem('user');
    const rol = localStorage.getItem('rol');

    const handleSubmit = (event) => {
        event.preventDefault();
        const serviceId = 'service_x4hqjvo';
        const templateId = 'template_ue2ekuz';
        const apiKey = 'QVlmPuPPgI69VALco';

        // Obtenemos el valor del campo de mensaje
        const message = event.target.message.value;
        const asunto = event.target.asunto.value;

        // Aquí puedes usar la variable 'username' directamente
        emailjs.send(serviceId, templateId, { username, asunto, message }, apiKey)
            .then(result => {
                alert('Se envió el correo'); // Mostrar alerta en lugar de console.log
                refForm.current.reset(); // Limpiar el formulario
            })
            .catch(error => console.error(error));
    }

    return (
        <div>
            <Sidebar username={username} rol={rol} handleLogout={handleLogout} />
            <form ref={refForm} action="" onSubmit={handleSubmit}>
                <div className='header-contact-container'>
                    <h2 className='header-contact'>Contactanos</h2>
                    <fieldset className='field-asunto'>
                        <label className='symbol-required'>Asunto:</label>
                        <input maxLength='500' name='asunto' placeholder='Asunto' required></input>
                    </fieldset>
                    <fieldset className='field-message'>
                        <label className='symbol-required'>Cuerpo:</label>
                        <textarea maxLength='500' name='message' placeholder='Mensaje' rows='10' required></textarea>
                    </fieldset>
                    <button className='btn-send'>Enviar</button>
                </div>
            </form>
        </div>
    );
}

export default Correo;
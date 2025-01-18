import React from 'react';

import "../../styles/main-page.css"

const AboutPage = () => {
    return (
        <div className="main-container">
            <div className="content-container">
                {/* Header */}
                <h1>Sobre esta App</h1>

                {/* Main Content */}
                <p className="mb-4 leading-relaxed">
                    Este proyecto es una iniciativa independiente creada por{' '}
                    <span className="font-bold text-blue-500">Nicolas Dembrowky</span>, estudiante de Ingeniería en Sistemas en la UTN FRBA.
                    El propósito de esta aplicación es brindar a los estudiantes de cualquier carrera y universidad la posibilidad de gestionar
                    sus estudios de forma practica y comoda.
                </p>

                {/* Footer */}
                <p className="mt-6">
                    Si quieres conocer más sobre mis proyectos o ponerte en contacto conmigo, haz clic en el botón de abajo para visitar mi{' '}
                    <a
                        href="https://www.linkedin.com/in/dembrowkynicolas/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-indigo-600 hover:underline"
                    >
                        perfil de LinkedIn
                    </a>.
                </p>

                <a
                    href="https://www.linkedin.com/in/dembrowkynicolas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition mt-6"
                >
                    Ver LinkedIn
                </a>

                <p className="mt-6">
                    Agradecimientos a todos aquellos BetaTesters que probaron la pagina antes de su salida oficial!
                </p>
            </div>
        </div>
    );
};

export default AboutPage;

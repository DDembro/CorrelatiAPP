import React from 'react';

const AboutPage = () => {
    return (
        <div className="flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl text-gray-800">
                {/* Header */}
                <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">Sobre esta App</h1>

                {/* Main Content */}
                <p className="mb-4 leading-relaxed">
                    Este proyecto es una iniciativa independiente creada por{' '}
                    <span className="font-bold text-blue-500">Nicolas Dembrowky</span>, estudiante de Ingeniería en Sistemas en la UTN FRBA.
                    El propósito de esta aplicación es brindar a los estudiantes de cualquier carrera y universidad la posibilidad de:
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

                <div className="mt-6 text-center">
                    <a
                        href="https://www.linkedin.com/in/dembrowkynicolas/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                        Ver LinkedIn
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;

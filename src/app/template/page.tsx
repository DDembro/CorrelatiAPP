"use client";

import React from "react";

import "../../styles/main-page.css"


const TemplatePage = () => {
    // Lista de carreras con colores variados
    const careers = require('../../../public/data/careersData.json');

    // Función para descargar el archivo JSON
    const handleDownload = (fileName: string) => {
        const link = document.createElement("a");
        link.href = `/data/careers/${fileName}`; // Ruta desde la carpeta `public`
        link.setAttribute("download", fileName); // Establece el atributo de descarga
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="main-container">
            <div className="content-container">
                <h1>
                    Plantillas de Carreras
                </h1>
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {careers.map((career:any) => (
                        <div
                            className={`${career.color} text-white shadow-md rounded-lg p-6 border hover:shadow-lg transition-shadow`}
                        >
                            <h2 className="text-xl font-semibold mb-2">{career.name} - {career.college}</h2>
                            <p className="font-medium mb-4">{career.description}</p>
                            <button
                                onClick={() => handleDownload(career.file)}
                                className="w-full bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-300 transition duration-200"
                            >
                                Descargar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplatePage;

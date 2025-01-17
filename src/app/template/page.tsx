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
                    {careers.map((career: any) => (
                        <div
                            className={`flex flex-col h-full relative overflow-hidden ${career.color} text-slate-100 shadow-lg rounded-xl p-6 border hover:shadow-xl transition-shadow`}
                        >
                            <div className="relative z-10 flex-grow">
                                {/* Título */}
                                <h2 className="text-2xl font-bold mb-2">
                                    {career.name} <span className="italic">- {career.college}</span>
                                </h2>

                                {/* Autor */}
                                <p className="text-md font-semibold text-slate-300 italic mb-4">Por: {career.author}</p>

                                {/* Descripción */}
                                <p className="text-md font-semibold text-slate-200 leading-relaxed mb-6">
                                    {career.description}
                                </p>


                            </div>
                            {/* Botón */}
                            <button
                                onClick={() => handleDownload(career.file)}
                                className="mt-auto bg-slate-100 text-slate-800 font-semibold py-2 px-4 rounded-lg shadow hover:scale-105 hover:bg-slate-200 transition-transform duration-200"
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

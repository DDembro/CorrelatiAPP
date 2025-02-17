"use client";

import React from "react";

import "../../styles/main-page.css";
import careersData from "../../../public/data/careersData.json";
import Link from "next/link";

const TemplatePage = () => {
    type CareerTemplateInfo = {
        name: string;
        author: string;
        date: Date;
        lastUpdate: Date;
        college: string;
        description: string;
        color: string;
        file: string;
    };

    // Mapea y convierte el JSON en objetos que cumplen con CareerTemplateInfo
    const careers: CareerTemplateInfo[] = careersData.map((career) => ({
        ...career,
        date: new Date(career.date),
        lastUpdate: new Date(career.lastUpdate),
    }));

    const handleDownload = (fileName: string) => {
        const link = document.createElement("a");
        link.href = `/data/careers/${fileName}`;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const options: Intl.DateTimeFormatOptions = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour12: false,
    };

    return (
        <div className="main-container">
            <div className="content-container">
                <h1>Plantillas de Carreras</h1>

                {/* Organizar carreras por institución */}
                {Object.entries(
                    careers.reduce((acc: Record<string, typeof careers>, career) => {
                        if (!acc[career.college]) {
                            acc[career.college] = [];
                        }
                        acc[career.college].push(career);
                        return acc;
                    }, {})
                ).map(([college, careersInCollege]) => (
                    <div key={college} className="mb-10">
                        {/* Línea horizontal entre categorías */}
                        <hr className="mb-8 border-t-2 border-gray-400 dark:border-slate-800 w-full" />
                        {/* Título de la institución */}
                        <h1 className="text-3xl text-left">Institución: {college}</h1>
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {/* Carreras de esa institución */}
                            {careersInCollege.map((career) => (
                                <div
                                    key={career.name}
                                    className={`flex flex-col h-full relative overflow-hidden ${career.color} text-slate-100 shadow-lg rounded-xl p-6 border hover:shadow-xl dark:border-slate-800 transition-shadow`}
                                >
                                    <div className="relative z-10 flex-grow">
                                        <h2 className="text-2xl font-bold mb-2">{career.name}</h2>
                                        <p className="text-md font-semibold text-slate-300 italic">
                                            Por: {career.author}
                                        </p>
                                        <p className="text-md font-semibold text-slate-300 italic">
                                            Subido el: {career.date.toLocaleDateString("es-AR", options)}
                                        </p>
                                        <p className="text-md font-semibold text-slate-300 italic mb-4">
                                            Actualizado el: {career.lastUpdate.toLocaleDateString("es-AR", options)}
                                        </p>
                                        <p className="text-md font-semibold text-slate-200 leading-relaxed mb-6">
                                            {career.description}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDownload(career.file)}
                                        className="mt-auto bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 font-semibold py-2 px-4 rounded-lg shadow hover:scale-105 hover:bg-slate-200 dark:hover:bg-slate-800 transition-transform duration-200"
                                    >
                                        Descargar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <hr className="mb-8 border-t-2 border-gray-400 dark:border-slate-800 w-full" />
                <div>
                    ¿No encuentras tu carrera? ¡Puedes usar las plantillas disponibles para crear tu plan de estudios!{" "}
                    <br />
                    Será muy apreciado si pudieras enviar el archivo de la carrera, así es añadido a la página como una
                    plantilla nueva.
                    <br />
                    Ve a{" "}
                    <Link href="/about" className="font-bold text-indigo-600 hover:underline">
                        Sobre La App
                    </Link>{" "}
                    para encontrar mis contactos.
                </div>
            </div>
        </div>
    );
};

export default TemplatePage;

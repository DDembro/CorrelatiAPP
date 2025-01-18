"use client";

import React from "react";

import "../../styles/main-page.css";
import careersData from "../../../public/data/careersData.json";

const TemplatePage = () => {
    type CareerTemplateInfo = {
        name: string;
        author: string;
        date: Date; // Mantén `date` como Date.
        college: string;
        description: string;
        color: string;
        file: string;
    };

    // Mapea y convierte el JSON en objetos que cumplen con CareerTemplateInfo
    const careers: CareerTemplateInfo[] = careersData.map((career) => ({
        ...career,
        date: new Date(career.date), // Conviértelo a Date.
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
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };

    return (
        <div className="main-container">
            <div className="content-container">
                <h1>Plantillas de Carreras</h1>
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {careers.map((career) => (
                        <div
                            key={career.name}
                            className={`flex flex-col h-full relative overflow-hidden ${career.color} text-slate-100 shadow-lg rounded-xl p-6 border hover:shadow-xl transition-shadow`}
                        >
                            <div className="relative z-10 flex-grow">
                                <h2 className="text-2xl font-bold mb-2">
                                    {career.name} <span className="italic">- {career.college}</span>
                                </h2>
                                <p className="text-md font-semibold text-slate-300 italic">
                                    Por: {career.author}
                                </p>
                                <p className="text-md font-semibold text-slate-300 italic mb-4">
                                    Subido el:{" "}
                                    {career.date.toLocaleDateString("es-AR", options)}
                                </p>
                                <p className="text-md font-semibold text-slate-200 leading-relaxed mb-6">
                                    {career.description}
                                </p>
                            </div>
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

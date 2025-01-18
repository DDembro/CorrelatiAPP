"use client";

import React, { useState } from "react";

const CareerViewUpload = ({ onFileUpload }: { onFileUpload: (data: string) => void }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileRead = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target?.result;
            if (fileContent) {
                onFileUpload(fileContent.toString());
            }
        };
        reader.readAsText(file);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileRead(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files?.[0];
        if (file) {
            handleFileRead(file);
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div
                className={`max-w-lg w-full p-6 rounded-lg border-2 shadow-md transition-all 
                ${isDragging ? "border-blue-500 bg-blue-50" : "border-dashed border-gray-400 bg-white"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Header */}
                <h2 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
                    📂 Subir Carrera
                </h2>

                {/* Drag & Drop Area */}
                <div className="flex flex-col items-center">
                    <label
                        htmlFor="file-input"
                        className="cursor-pointer bg-indigo-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-600 transition-colors"
                    >
                        Seleccionar archivo
                    </label>
                    <input
                        id="file-input"
                        type="file"
                        accept="application/json"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <p className="mt-3 text-sm text-gray-500">
                        Arrastra y suelta un archivo aquí o haz clic en el boton para seleccionar <br />
                        Si no tienes un archivo, ve a plantillas y descarga uno para comenzar.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CareerViewUpload;

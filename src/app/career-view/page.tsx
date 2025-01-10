"use client";

import React, { useState } from "react";
import TableViewCareer from "@/components/career-view/view-modes/table/career-view-table";
import ListViewCareer from "@/components/career-view/view-modes/career-view-list";
import CareerViewNav from "@/components/career-view/career-view-nav";
import CareerViewUpload from "@/components/career-view/career-view-upload";

const CarrerViewPage = () => {
    const [viewMode, setViewMode] = useState(true); // Tabla o Lista
    const [carrerData, setCarrerData] = useState<any>(null); // Datos cargados

    const handleFileUpload = (data: string) => {
        try {
            const parsedData = JSON.parse(data); // Validar JSON
            setCarrerData(parsedData); // Actualizar estado
        } catch (error) {
            console.error("Archivo JSON inválido", error);
            alert("Error al cargar el archivo. Asegúrate de que sea un JSON válido.");
        }
    };

    // Vista de carga mientras no hay datos cargados
    if (!carrerData) {
        return (
            <div className="p-2">
                <CareerViewUpload onFileUpload={handleFileUpload} />
            </div>
        );
    }

    // Vista de la carrera cuando se cargan datos
    return (
        <div className="p-2">
            <CareerViewNav carrerData={carrerData} viewMode={viewMode} setViewMode={setViewMode} />
            <div>
                {viewMode ? (
                    <TableViewCareer carrerData={carrerData} />
                ) : (
                    <ListViewCareer carrerData={carrerData} />
                )}
            </div>
        </div>
    );
};

export default CarrerViewPage;
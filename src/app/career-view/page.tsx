"use client";

import React, { useEffect, useState } from "react";
import CareerViewTable from "@/components/career-view/view-modes/table/career-view-table";
import CareerViewNav from "@/components/career-view/career-view-nav";
import CareerViewUpload from "@/components/career-view/career-view-upload";
import { CareerData } from "@/types/career-view-types";
import { getLocalCareerData, isValidCareerData } from "@/lib/careerEditUtils";

const CareerViewPage = () => {
    const [careerData, setCareerData] = useState<CareerData | null>(null); // Datos cargados

    // Maneja la carga inicial del json
    const handleFileUpload = (data: any) => {
        try {
            const parsedData = JSON.parse(data);
            if (isValidCareerData(parsedData)) {
                setCareerData(parsedData);
            } else {
                throw new Error("El archivo no es valido o esta dañado.");
            }
        } catch (error) {
            console.error("Archivo JSON inválido", error);
            alert("El archivo no es valido o esta dañado.");
        }
    };

    // Recuperar datos de sessionStorage al cargar la página
    useEffect(() => {
        const storedData = getLocalCareerData();
        if (storedData) {
            const parsedData: CareerData = JSON.parse(storedData); // Parsear el JSON almacenado
            setCareerData(parsedData); // Establecer en el estado
        }
    }, []);

    // Vista de carga mientras no hay datos cargados
    if (!careerData) {
        return (
            <div className="p-2">
                <CareerViewUpload onFileUpload={handleFileUpload} />
            </div>
        );
    }

    // Vista de la carrera cuando se cargan datos
    return (
        <div className="p-2">
            <CareerViewNav careerData={careerData} />
            <div>
                <CareerViewTable careerData={careerData} />
            </div>
        </div>
    );
};

export default CareerViewPage;

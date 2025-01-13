"use client";

import React, { useEffect, useState } from "react";
import TableViewCareer from "@/components/career-view/view-modes/table/career-view-table";
import { CareerData } from "@/types/career-view-types";
import CareerEditNav from "@/components/career-edit/career-edit-nav";
import { getLocalCareerData } from "@/lib/careerEditUtils";

const CareerEditPage = () => {
    const [careerData, setCarrerData] = useState<CareerData | null>(null); // Datos cargados

    // Recuperar datos de sessionStorage al cargar la página
    useEffect(() => {
        const storedData = getLocalCareerData();
        if (storedData) {
            const parsedData: CareerData = JSON.parse(storedData); // Parsear el JSON almacenado
            setCarrerData(parsedData); // Establecer en el estado
        }
    }, []);

    // Vista de carga mientras no hay datos cargados
    if (!careerData) {
        return (
            <div className="p-2">
                Si esta pagina no carga, intenta volver a repetir el proceso
            </div>
        );
    }

    // Vista de la carrera cuando se cargan datos
    return (
        <div className="p-2">
            <CareerEditNav careerData={careerData} />
            <div>
                <TableViewCareer carrerData={careerData} />
            </div>
        </div>
    );
};

export default CareerEditPage;

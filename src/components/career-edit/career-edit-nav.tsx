import React, { useState } from "react";
import Link from "next/link";
import { downloadCareerData, saveLocalCareerData } from "@/lib/careerEditUtils";
import EditCareerModal from "../modal/edit-career-modal";
import { CareerData } from "@/types/career-view-types";

interface CareerEditNavProps {
    careerData: CareerData;
}

const CareerEditNav: React.FC<CareerEditNavProps> = ({ careerData }) => {
    // Estado para controlar la visibilidad del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!careerData) {
        return <></>;
    }

    return (
        <div className="p-4 flex items-center bg-gray-100 rounded-lg shadow-md text-white">
            <Link
                href="/career-view"
                className="bg-blue-500 font-medium px-4 py-2 mx-2 rounded-md shadow hover:bg-blue-700 active:shadow-inner focus:outline-none"
                onClick={() => {
                    saveLocalCareerData(careerData);
                }}
            >
                Volver al modo Vista
            </Link>

            <p className="mx-6 text-xl font-semibold text-gray-700 truncate">
                Editando: {careerData.title}
            </p>

            <button
                onClick={() => setIsModalOpen(true)} // Abrir el modal
                className="bg-blue-500 font-medium px-4 py-2 mx-2 rounded-md shadow hover:bg-blue-700 active:shadow-inner focus:outline-none"
            >
                Cambiar Datos de la Carrera
            </button>

            <button
                onClick={() => downloadCareerData(careerData)}
                className="bg-blue-500 font-medium px-4 py-2 mx-2 rounded-md shadow hover:bg-blue-700 focus:outline-none"
            >
                Descargar
            </button>

            {/* Renderizar el modal solo si está abierto */}
            {isModalOpen && (
                <EditCareerModal
                    careerData={careerData}
                    onClose={() => setIsModalOpen(false)} // Cerrar el modal
                />
            )}
        </div>
    );
};

export default CareerEditNav;

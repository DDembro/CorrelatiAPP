import React, { useState } from "react";
import { showAllSubjectInfo, hideAllSubjectInfo, initiateSubjectsDictionary } from "@/lib/subjectsUtils";
import Link from "next/link";
import { deleteLocalCareerData, downloadCareerData, saveLocalCareerData } from "@/lib/careerEditUtils";
import ViewCareerDataModal from "../modal/view-careerdata-modal";
import "@/styles/career-view.css";
import { CareerData } from "@/types/career-view-types";

interface CareerViewNavProps {
    careerData: CareerData;
}

const CareerViewNav: React.FC<CareerViewNavProps> = ({ careerData }) => {
    const [viewDataModal, setViewDataModal] = useState(false); // Estado para el modal de "Ver Datos"
    const [isVisible, setIsVisible] = useState(false);

    if (!careerData) {
        return <></>;
    }

    const openViewDataModal = () => setViewDataModal(true);
    const closeViewDataModal = () => setViewDataModal(false);

    // Al salir de la vista de una carrera mediante el boton
    const returnAction = () => {
        deleteLocalCareerData();
        if (!confirm("¿Desea salir? todo cambio no descargado se perdera")) return;
        window.location.href = "/career-view";
    };

    // Settea el sessionStorage
    saveLocalCareerData(careerData);

    return (
        <>
            <div className="view-container">
                <button onClick={() => returnAction()} className="option-button bg-blue-500 hover:bg-blue-700">
                    Salir
                </button>

                <p className="label">Viendo: {careerData.title}</p>

                <button
                    onClick={() => showAllSubjectInfo(initiateSubjectsDictionary(careerData.subjects))}
                    className="option-button bg-green-500 hover:bg-green-700"
                >
                    Expandir
                </button>

                <button
                    onClick={() => hideAllSubjectInfo(initiateSubjectsDictionary(careerData.subjects))}
                    className="option-button bg-red-500 hover:bg-red-700"
                >
                    Colapsar
                </button>

                <Link
                    href="/career-edit"
                    className="option-button edit-button bg-blue-500 hover:bg-blue-700"
                    onClick={() => {
                        saveLocalCareerData(careerData);
                    }}
                >
                    Editar
                </Link>

                <button onClick={() => openViewDataModal()} className="option-button bg-blue-500 hover:bg-blue-700">
                    Ver Datos
                </button>

                <button
                    onClick={() => downloadCareerData(careerData)}
                    className="option-button bg-blue-500 hover:bg-blue-700"
                >
                    Descargar
                </button>

                {viewDataModal && <ViewCareerDataModal careerData={careerData} onClose={closeViewDataModal} />}

                <button
                    onClick={() => setIsVisible(!isVisible)}
                    className={`option-button ${isVisible ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"} `}
                >
                    {isVisible ? "Ocultar info" : "Mostrar info"}
                </button>

                <p className="edit-warning">Edición solo esta disponible para PC.</p>
            </div>

            <div className="p-2 flex justify-center flex-wrap h-min relative">
                {isVisible && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 sm:w-max max-w-xs md:max-w-sm bg-slate-700 text-white text-base p-3 rounded-lg shadow-lg border border-slate-500 z-50">
                        <p className="py-1">
                            <span className="font-bold text-amber-500">Regularizada:</span> Materia que aún debe final.
                        </p>
                        <p className="py-1">
                            <span className="font-bold text-green-500">Aprobada:</span> Final aprobado/Libreta firmada.
                        </p>
                        <p className="py-1">
                            <span className="font-bold text-green-600">Promocionada:</span> Aprobada de forma
                            excepcional.
                        </p>
                        <p className="text-sm mt-2 italic">* Los nombres pueden variar según la institución.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default CareerViewNav;

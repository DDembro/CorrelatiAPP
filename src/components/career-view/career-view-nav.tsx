import React, { useState } from "react";
import { showAllSubjectInfo, hideAllSubjectInfo, initiateSubjectsDictionary } from "@/lib/subjectsUtils";
import Link from "next/link";
import { deleteLocalCareerData, downloadCareerData, saveLocalCareerData } from "@/lib/careerEditUtils";
import ViewCareerDataModal from "../modal/view-careerdata-modal";
import "@/styles/career-view.css"

const CareerViewNav = ({ careerData, viewMode, setViewMode }: any) => {
    const [viewDataModal, setViewDataModal] = useState(false); // Estado para el modal de "Ver Datos"

    if (!careerData) {
        return <></>;
    }


    const openViewDataModal = () => setViewDataModal(true);
    const closeViewDataModal = () => setViewDataModal(false);

    // Al salir de la vista de una carrera mediante el boton
    const returnAction = () => {
        deleteLocalCareerData();
        if (!confirm("¿Desea salir? todo cambio no descargado se perdera"))
            return;
        window.location.href = '/career-view';
    };

    // Settea el sessionStorage
    saveLocalCareerData(careerData);

    return (
        <div className="main-container">
            <button
                onClick={() => returnAction()}
                className="option-button bg-blue-500 hover:bg-blue-700"
            >
                Salir
            </button>

            <p className="label">
                Viendo: {careerData.title}
            </p>

            <button
                onClick={() => setViewMode(true)}
                className={`option-button ${viewMode ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-700"}`}
            >
                Tabla
            </button>

            <button
                onClick={() => setViewMode(false)}
                className={`option-button ${!viewMode ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-700"}`}
            >
                Lista
            </button>

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

            <button
                onClick={() => openViewDataModal()}
                className="option-button bg-blue-500 hover:bg-blue-700"
            >
                Ver Datos
            </button>

            <button
                onClick={() => downloadCareerData(careerData)}
                className="option-button bg-blue-500 hover:bg-blue-700"
            >
                Descargar
            </button>

            {viewDataModal && (
                <ViewCareerDataModal 
                    careerData={careerData} 
                    onClose={closeViewDataModal} 
                />
            )}

            <p className="edit-warning">
                Edición solo esta disponible para PC.
            </p>
        </div>
    );
};

export default CareerViewNav;

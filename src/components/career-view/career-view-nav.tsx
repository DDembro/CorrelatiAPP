import React, { useState } from "react";
import { showAllSubjectInfo, hideAllSubjectInfo, initiateSubjectsDictionary } from "@/lib/subjectsUtils";
import Link from "next/link";
import { deleteLocalCareerData, downloadCareerData, saveLocalCareerData } from "@/lib/careerEditUtils";
import ViewCareerDataModal from "../modal/view-careerdata-modal";

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
        if (!confirm("Desea salir de esta Carrera? todo cambio no Descargado se perdera"))
            return;
        window.location.href = '/career-view'
    };

    // Settea el sessionStorage
    saveLocalCareerData(careerData);

    return (
        <div className="p-4 flex items-center bg-gray-100 rounded-lg shadow-md text-white">
            <button
                onClick={() => returnAction()}
                className="bg-blue-500 font-medium px-4 py-2 mx-2 rounded-md shadow hover:bg-blue-700 active:shadow-inner focus:outline-none"
            >
                Salir
            </button>

            <p className="mx-6 text-xl font-semibold text-gray-700 truncate">
                Viendo: {careerData.title}
            </p>

            <button
                onClick={() => setViewMode(true)}
                className={`px-4 py-2 mx-2 rounded-md shadow font-medium ${viewMode ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-700"
                    } focus:outline-none`}
            >
                Tabla
            </button>

            <button
                onClick={() => setViewMode(false)}
                className={`px-4 py-2 mx-2 rounded-md shadow font-medium ${!viewMode ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-700"
                    } focus:outline-none`}
            >
                Lista
            </button>

            <button
                onClick={() => showAllSubjectInfo(initiateSubjectsDictionary(careerData.subjects))}
                className="bg-green-500 font-medium px-4 py-2 mx-2 rounded-md shadow hover:bg-green-700 focus:outline-none"
            >
                Expandir todo
            </button>

            <button
                onClick={() => hideAllSubjectInfo(initiateSubjectsDictionary(careerData.subjects))}
                className="bg-red-500 font-medium px-4 py-2 mx-2 rounded-md shadow hover:bg-red-700 focus:outline-none"
            >
                Colapsar todo
            </button>

            <Link
                href="/career-edit"
                className="bg-blue-500 font-medium px-4 py-2 mx-2 rounded-md shadow hover:bg-blue-700 active:shadow-inner focus:outline-none"
                onClick={() => {
                    saveLocalCareerData(careerData);
                }}
            >
                Editar
            </Link>

            <button
                onClick={() => openViewDataModal()}
                className="bg-blue-500 font-medium px-4 py-2 mx-2 rounded-md shadow hover:bg-blue-700 focus:outline-none"
            >
                Ver Datos
            </button>

            <button
                onClick={() => downloadCareerData(careerData)}
                className="bg-blue-500 font-medium px-4 py-2 mx-2 rounded-md shadow hover:bg-blue-700 focus:outline-none"
            >
                Descargar
            </button>

            {viewDataModal && (
                <ViewCareerDataModal 
                    careerData={careerData} 
                    onClose={closeViewDataModal} 
                />
            )}
        </div>
    );
};

export default CareerViewNav;

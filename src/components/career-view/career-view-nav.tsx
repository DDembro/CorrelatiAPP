import React from "react";
import { showAllSubjectInfo, hideAllSubjectInfo, initiateSubjectsDictionary } from "@/lib/subjectsUtils";

const CareerViewNav = ({ carrerData, viewMode, setViewMode }: any) => {
    if (!carrerData) {
        return <></>;
    }

    return (
        <div className="p-4 flex items-center bg-gray-100 rounded-lg shadow-md">
            <button
                onClick={() => window.location.href = '/career-view'}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium px-4 py-2 mx-2 rounded-md shadow hover:from-blue-600 hover:to-blue-700 active:shadow-inner focus:outline-none"
            >
                Volver
            </button>

            <p className="mx-6 text-xl font-semibold text-gray-700 truncate">
                Viendo: {carrerData.title}
            </p>

            <button
                onClick={(e) => setViewMode(true)}
                className={`px-4 py-2 mx-2 rounded-md shadow font-medium text-white ${
                    viewMode ? "bg-blue-600" : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                } focus:outline-none`}
            >
                Tabla
            </button>

            <button
                onClick={(e) => setViewMode(false)}
                className={`px-4 py-2 mx-2 rounded-md shadow font-medium text-white ${
                    !viewMode ? "bg-blue-600" : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                } focus:outline-none`}
            >
                Lista
            </button>

            <button
                onClick={(e) => showAllSubjectInfo(initiateSubjectsDictionary(carrerData.subjects))}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-medium px-4 py-2 mx-2 rounded-md shadow hover:from-green-600 hover:to-green-700 focus:outline-none"
            >
                Expandir todo
            </button>

            <button
                onClick={(e) => hideAllSubjectInfo(initiateSubjectsDictionary(carrerData.subjects))}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium px-4 py-2 mx-2 rounded-md shadow hover:from-red-600 hover:to-red-700 focus:outline-none"
            >
                Colapsar todo
            </button>
        </div>
    );
};

export default CareerViewNav;

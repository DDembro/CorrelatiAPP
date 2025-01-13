import React from "react";
import { showAllSubjectInfo, hideAllSubjectInfo, initiateSubjectsDictionary } from "@/lib/subjectsUtils";
import Link from "next/link";
import { downloadCareerData, saveLocalCareerData } from "@/lib/careerEditUtils";

const CareerEditNav = ({ careerData }: any) => {
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


            <Link
                href="/career-edit"
                className="bg-blue-500 font-medium px-4 py-2 mx-2 rounded-md shadow hover:bg-blue-700 active:shadow-inner focus:outline-none"
            >
                Editar
            </Link>

            <button
                onClick={(e) => downloadCareerData(careerData)}
                className="bg-blue-500 font-medium px-4 py-2 mx-2 rounded-md shadow hover:bg-blue-700 focus:outline-none"
            >
                Descargar
            </button>
        </div>
    );
};

export default CareerEditNav;

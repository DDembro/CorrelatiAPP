import React from "react";
import {
    checkCanEnroll,
    formatCorrelativities,
    showSubjectInfo,
} from "@/lib/subjectsUtils";
import { Duration, Modality, Subject } from "@/types/career-view-types";

const RenderEditSubjects = (
    subjectArr: any, 
    dictionary: any, 
    handleOnContextMenu: any,
    handleDragStart: (subject: Subject) => void
) => {
    let subjectsCards: React.JSX.Element[] = [];

    subjectArr.forEach((subject: Subject, index: number) => {
        subject.index = index; // Actualiza el indice

        const info = subject.info;
        const personal = subject.personal;
        const canEnroll = checkCanEnroll(subject, dictionary);

        const correlativities = formatCorrelativities(info.correlativities, dictionary);
        const duration = Duration[info.duration];
        const modality = Modality[info.modality];

        subjectsCards.push(
            <div
                key={subject.sid}
                id={`subject-${subject.sid}`}
                draggable
                onDragStart={() => handleDragStart(subject)}
                onClick={() => showSubjectInfo(subject.sid)}
                onContextMenu={(e) => handleOnContextMenu(e, subject)}
                className="rounded-sm shadow-md bg-slate-50 hover:shadow-lg transform transition-all duration-300 my-4"
            >
                {/* Título */}
                <div
                    className="text-center py-1 rounded-sm font-semibold text-white px-1 bg-stone-500"
                >
                    <h3 className="text-lg">{info.name}</h3>
                    <p className="text-xs mt-1 font-medium">
                        {info.altname} - {duration} | {info.weeklyLoad}Hs
                    </p>
                </div>

                {/* Detalles adicionales */}
                <div
                    id={`subject-${subject.sid}-info`}
                    className="hidden bg-gray-50 p-4 rounded-b-lg"
                >
                    {/* Modalidad */}
                    <div className="mb-2">
                        <p className="font-medium text-gray-700">
                            <span className="text-indigo-500">Modalidad:</span> {modality}
                        </p>
                    </div>

                    {/* Descripción */}
                    <div className="mb-2 text-gray-600 text-sm">
                        <p>{info.description}</p>
                    </div>

                    {/* Correlativas */}
                    <div>
                        <p className="font-medium text-gray-700">Requisitos:</p>
                        <div className="ml-2 text-xs text-gray-500">
                            <p>Regularizada: {correlativities.regularized}</p>
                            <p>Aprobada: {correlativities.approved}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return subjectsCards;
};

export default RenderEditSubjects;

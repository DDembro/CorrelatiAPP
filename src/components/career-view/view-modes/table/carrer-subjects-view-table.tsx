import React from "react";
import { checkCanEnroll, formatCorrelativities, showSubjectInfo, SubjectsDictionary } from "@/lib/subjectsUtils";
import { Duration, Modality, Subject, SubjectStatus } from "../../../../types/career-view-types";

const RenderViewSubjects = (subjectArr: Subject[], dictionary: SubjectsDictionary, handleOnContextMenu: any) => {
    const subjectsCards: React.JSX.Element[] = [];

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
                onClick={() => showSubjectInfo(subject.sid)}
                onContextMenu={(e) => handleOnContextMenu(e, subject)}
                className="rounded-sm shadow-md bg-slate-50 dark:bg-transparent hover:shadow-lg transform transition-all duration-300 my-4"
            >
                {/* Título */}
                <div
                    className={`text-center py-1 rounded-sm font-semibold text-white  px-1 ${
                        personal.status === SubjectStatus.Promocionado
                            ? "bg-green-700 dark:bg-green-900" // Promoted
                            : personal.status === SubjectStatus.Aprobado
                              ? "bg-green-600 dark:bg-green-700" // Approved
                              : personal.status === SubjectStatus.Regularizado
                                ? "bg-yellow-500 dark:bg-yellow-700" // Regularized
                                : canEnroll
                                  ? "bg-indigo-500 dark:bg-indigo-700" // Can Enroll
                                  : "bg-stone-400 dark:bg-stone-600" // Default
                    }`}
                >
                    <h3 className="text-lg">{info.name}</h3>
                    <p className="text-xs mt-1 font-medium">
                        {info.altname} - {duration} | {info.weeklyLoad}Hs
                    </p>
                </div>

                {/* Detalles adicionales */}
                <div
                    id={`subject-${subject.sid}-info`}
                    className="hidden bg-gray-50 dark:bg-slate-700 p-4 rounded-b-lg"
                >
                    {/* Modalidad */}
                    <div className="mb-2">
                        <p className="font-medium text-gray-300">
                            <span className="text-indigo-500">Modalidad:</span> {modality}
                        </p>
                    </div>

                    {/* Descripción */}
                    <div className="mb-2 text-gray-300 text-sm">
                        <p>{info.description}</p>
                    </div>

                    {/* Nota */}
                    <div className="mb-2 text-gray-300 text-sm">
                        <p>Nota: {personal.qualification}</p>
                    </div>

                    {/* Correlativas */}
                    <div>
                        <p className="font-medium text-gray-400">Requisitos:</p>
                        <div className="ml-2 text-xs text-gray-400">
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

export default RenderViewSubjects;

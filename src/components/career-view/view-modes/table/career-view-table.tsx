// CareerViewTable.tsx
"use client";

import React from "react";
import CareerRenderViewTable from "./career-render-view-table";
import { useContextMenu } from "@/components/context-menu/use-context-menu";
import { CareerData, Subject, SubjectStatus } from "@/types/career-view-types";
import ContextMenu from "@/components/context-menu/context-menu";
import { showCorrelativities } from "@/lib/subjectsUtils";
import { changeQualification, changeStatus } from "@/lib/careerEditUtils";

interface CareerViewTableProps {
    careerData: CareerData;
}

const CareerViewTable: React.FC<CareerViewTableProps> = ({ careerData }) => {
    const { contextMenuRef, contextMenu, handleContextMenu } = useContextMenu(careerData);

    if (!careerData) {
        return (
            <div>
                <p>No hay datos disponibles. Por favor, carga un archivo válido.</p>
            </div>
        );
    }

    return (
        <>
            <div className="p-2 flex divide-x-2 divide-gray-400 justify-center">
                {CareerRenderViewTable(careerData, handleContextMenu)}
            </div>

            <ContextMenu
                contextMenuRef={contextMenuRef}
                contextMenu={contextMenu}
                buttons={[
                    {
                        text: "Marcar No Cursada",
                        onClick: (subject: Subject) =>
                            changeStatus(careerData, subject, SubjectStatus.NA),
                    },
                    {
                        text: "Marcar Regularizada",
                        onClick: (subject: Subject) =>
                            changeStatus(careerData, subject, SubjectStatus.Regularizado),
                    },
                    {
                        text: "Marcar Aprobada",
                        onClick: (subject: Subject) =>
                            changeStatus(careerData, subject, SubjectStatus.Aprobado),
                    },
                    {
                        text: "Marcar Promocionada",
                        onClick: (subject: Subject) =>
                            changeStatus(careerData, subject, SubjectStatus.Promocionado),
                    },
                    { text: "", onClick: () => null, isSpacer: true },
                    {
                        text: "Mostrar Correlativas",
                        onClick: (subject: Subject) =>
                            showCorrelativities(careerData.subjects, subject),
                    },
                    {
                        text: "Ingresar tu Nota",
                        onClick: (subject: Subject) =>
                            changeQualification(
                                careerData,
                                subject,
                                Number(
                                    prompt(
                                        "Ingresa tu nota para " + subject.info.name
                                    )
                                )
                            ),
                    },
                ]}
            />
        </>
    );
};

export default CareerViewTable;

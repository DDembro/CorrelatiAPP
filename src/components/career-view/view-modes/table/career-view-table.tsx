"use client";

import React from "react";
import renderCareerViewTable from "./career-render-table";
import { useContextMenu } from "@/components/context-menu/use-context-menu";
import { Subject } from "@/types/career-view-types";
import ContextMenu from "@/components/context-menu/context-menu";
import { showCorrelativities } from "@/lib/subjectsUtils";
import { changeStatus } from "@/lib/careerEditUtils";

const TableViewCareer = ({ carrerData: careerData }: any) => {
    const { contextMenuRef, contextMenu, handleContextMenu, resetContextMenu } = useContextMenu(careerData);

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
                {renderCareerViewTable(careerData, handleContextMenu)}
            </div>

            <ContextMenu
                contextMenuRef={contextMenuRef}
                contextMenu={contextMenu}
                buttons={[
                    { text: "Marcar No Cursada", onClick: (subject: Subject) => changeStatus(careerData, subject, 0) },
                    { text: "Marcar Regularizada", onClick: (subject: Subject) => changeStatus(careerData, subject, 1) },
                    { text: "Marcar Aprobada", onClick: (subject: Subject) => changeStatus(careerData, subject, 2) },
                    { text: "Marcar Promocionada", onClick: (subject: Subject) => changeStatus(careerData, subject, 3) },
                    { text: "", onClick: () => null, isSpacer: true },
                    { text: "Mostrar Correlativas", onClick: (subject: Subject) => showCorrelativities(careerData.subjects, subject) },
                ]}
            />
        </>
    );
};

export default TableViewCareer;

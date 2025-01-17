"use client";

import React, { useState } from "react";
import { useContextMenu } from "@/components/context-menu/use-context-menu";
import { CareerData, Subject } from "@/types/career-view-types";
import ContextMenu from "@/components/context-menu/context-menu";
import { showCorrelativities } from "@/lib/subjectsUtils";
import CareerRenderEditTable from "./career-render-edit-table";
import EditSubjectModal from "../modal/edit-subject-modal";
import { deleteSubject, duplicateSubject } from "@/lib/careerEditUtils";

const CareerEditTable = ({ carrerData: careerData }: any) => {
    const { contextMenuRef, contextMenu, handleContextMenu, resetContextMenu } = useContextMenu(careerData);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);


    const openEditModal = (subject: Subject) => {
        setSelectedSubject(subject);
    };

    const closeEditModal = () => {
        setSelectedSubject(null);
    };

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
                {CareerRenderEditTable(careerData, handleContextMenu)}
                {selectedSubject && (
                    <EditSubjectModal
                        subject={selectedSubject}
                        careerData={careerData}
                        onClose={closeEditModal}
                    />
                )}
            </div>

            <ContextMenu
                contextMenuRef={contextMenuRef}
                contextMenu={contextMenu}
                buttons={[
                    { text: "Editar Materia", onClick: (subject: Subject) => openEditModal(subject) },
                    { text: "Editar Correlativas", onClick: (subject: Subject) => alert("TODO") },
                    { text: "Duplicar Materia", onClick: (subject: Subject) => duplicateSubject(careerData, subject) },
                    { text: "Eliminar Materia", onClick: (subject: Subject) => deleteSubject(careerData, subject) },
                    { text: "", onClick: () => null, isSpacer: true },
                    { text: "Mostrar Correlativas", onClick: (subject: Subject) => showCorrelativities(careerData.subjects, subject) },
                ]}
            />
        </>
    );
};

export default CareerEditTable;

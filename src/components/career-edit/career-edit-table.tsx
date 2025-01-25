"use client";

import React, { useState } from "react";
import { useContextMenu } from "@/components/context-menu/use-context-menu";
import { CareerData, Subject } from "@/types/career-view-types";
import ContextMenu from "@/components/context-menu/context-menu";
import { showCorrelativities } from "@/lib/subjectsUtils";
import CareerRenderEditTable from "./career-render-edit-table";
import EditSubjectModal from "../modal/edit-subject-modal";
import { deleteSubject, duplicateSubject } from "@/lib/careerEditUtils";
import EditCorrelativesModal from "../modal/edit-correlatives-modal";
import ReorderSubject from "../modal/edit-reorder-subject-modal";

interface CareerEditTableProps {
    careerData: CareerData;
}

const CareerEditTable: React.FC<CareerEditTableProps> = ({ careerData }) => {
    const { contextMenuRef, contextMenu, handleContextMenu } =
        useContextMenu(careerData);

    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [editCorrelativesSubject, setEditCorrelativesSubject] = useState<Subject | null>(null);
    const [reorderSubject, setReorderSubject] = useState<Subject | null>(null); // Estado para la función nueva

    const openEditModal = (subject: Subject) => {
        setSelectedSubject(subject);
    };

    const closeEditModal = () => {
        setSelectedSubject(null);
    };

    const openEditCorrelativesModal = (subject: Subject) => {
        setEditCorrelativesSubject(subject);
    };

    const closeEditCorrelativesModal = () => {
        setEditCorrelativesSubject(null);
    };

    const openReorderModal = (subject: Subject) => {
        setReorderSubject(subject);
    };

    const closeReorderModal = () => {
        setReorderSubject(null);
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
            <div className="p-2 flex justify-center flex-wrap">
                {CareerRenderEditTable(careerData, handleContextMenu)}
            </div>

            {selectedSubject && (
                <EditSubjectModal
                    subject={selectedSubject}
                    careerData={careerData}
                    onClose={closeEditModal}
                />
            )}
            {editCorrelativesSubject && (
                <EditCorrelativesModal
                    subject={editCorrelativesSubject}
                    careerData={careerData}
                    onClose={closeEditCorrelativesModal}
                />
            )}
            {reorderSubject && (
                <ReorderSubject
                    subject={reorderSubject}
                    careerData={careerData}
                    onClose={closeReorderModal}
                />
            )}

            <ContextMenu
                contextMenuRef={contextMenuRef}
                contextMenu={contextMenu}
                buttons={[
                    { text: "Editar Materia", onClick: (subject: Subject) => openEditModal(subject) },
                    {
                        text: "Editar Correlativas",
                        onClick: (subject: Subject) => openEditCorrelativesModal(subject),
                    },
                    {
                        text: "Cambiar orden de la columna",
                        onClick: (subject: Subject) => openReorderModal(subject),
                    },
                    {
                        text: "Duplicar Materia",
                        onClick: (subject: Subject) => duplicateSubject(careerData, subject),
                    },
                    {
                        text: "Eliminar Materia",
                        onClick: (subject: Subject) => deleteSubject(careerData, subject),
                    },
                    { text: "", onClick: () => null, isSpacer: true },
                    {
                        text: "Mostrar Correlativas",
                        onClick: (subject: Subject) =>
                            showCorrelativities(careerData.subjects, subject),
                    },
                ]}
            />
        </>
    );
};

export default CareerEditTable;

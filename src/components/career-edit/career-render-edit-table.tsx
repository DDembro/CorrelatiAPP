import React, { useState } from "react";
import { CareerData, Subject } from "@/types/career-view-types";
import { initiateSubjectsDictionary, sortSubjects } from "@/lib/subjectsUtils";
import RenderEditSubjects from "./carrer-subjects-edit-table";
import { changeSubjectYear } from "@/lib/careerEditUtils";

const CareerRenderEditTable = (careerData: CareerData, handleOnContextMenu: any) => {
    const [draggedSubject, setDraggedSubject] = useState<Subject | null>(null);
    const years = careerData.years;
    const subjects = careerData.subjects;

    const subjectsDictionary = initiateSubjectsDictionary(subjects);

    const sortedSubjects = sortSubjects(subjects, years);

    // Manejar inicio del arrastre
    const handleDragStart = (subject: Subject) => {
        setDraggedSubject(subject);
    };

    // Manejar arrastre sobre una zona válida
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Permite el drop en esta área
    };

    // Manejar la acción de soltar
    const handleDrop = (newYear: number) => {
        if (draggedSubject) {
            changeSubjectYear(careerData, draggedSubject, newYear);
            setDraggedSubject(null); // Limpiar el estado de arrastre
        }
    };

    return (
        <>
            {/* Crear columnas de años con zonas de dropeo */}
            {Array.from({ length: years }, (_, yearIndex) => (
                <div
                    key={`year-${yearIndex}`}
                    className="px-2 w-64 divide-y-2 divide-gray-400 divide-dashed"
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(yearIndex + 1)}
                >
                    {/* Header Año */}
                    <div className="text-center dark:text-gray-300">
                        <strong>Año {yearIndex + 1}</strong>
                    </div>

                    {/* Div con las Materias */}
                    <div className={`min-h-96 ${draggedSubject ? "bg-indigo-200" : ""}`}>
                        {RenderEditSubjects(
                            sortedSubjects[yearIndex],
                            subjectsDictionary,
                            handleOnContextMenu,
                            handleDragStart // Nuevo prop para manejar arrastres
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default CareerRenderEditTable;

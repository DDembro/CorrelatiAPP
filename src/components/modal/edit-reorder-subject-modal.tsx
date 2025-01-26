import React, { useState } from "react";
import { CareerData, Subject } from "@/types/career-view-types";
import { saveLocalCareerData } from "@/lib/careerEditUtils";

interface ReorderSubjectProps {
    subject: Subject;
    careerData: CareerData;
    onClose: () => void;
}

const ReorderSubject: React.FC<ReorderSubjectProps> = ({ subject, careerData, onClose }) => {
    // Filtrar materias del mismo año y ordenarlas por el índice
    const yearSubjects = careerData.subjects
        .filter((s) => s.info.year === subject.info.year)
        .sort((a, b) => a.index - b.index);

    const [subjectsInYear, setSubjectsInYear] = useState<Subject[]>(yearSubjects);
    const [draggedSubjectIndex, setDraggedSubjectIndex] = useState<number | null>(null);

    // Manejo del inicio del arrastre
    const handleDragStart = (index: number) => {
        setDraggedSubjectIndex(index);
    };

    // Manejo del sobrevuelo del elemento durante el arrastre
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();

        if (draggedSubjectIndex === null || draggedSubjectIndex === index) return;

        const updatedSubjects = [...subjectsInYear];
        const [movedSubject] = updatedSubjects.splice(draggedSubjectIndex, 1);
        updatedSubjects.splice(index, 0, movedSubject);

        setSubjectsInYear(updatedSubjects);
        setDraggedSubjectIndex(index);
    };

    // Manejo del soltar
    const handleDrop = () => {
        setDraggedSubjectIndex(null);
    };

    // Guardar los cambios
    const handleSave = () => {
        const updatedSubjects = subjectsInYear.map((s, index) => ({
            ...s,
            index: index + 1, // Actualiza el índice
        }));

        // Actualiza `careerData` globalmente
        updatedSubjects.forEach((updatedSubject) => {
            const index = careerData.subjects.findIndex((s) => s.sid === updatedSubject.sid);
            careerData.subjects[index] = updatedSubject;
        });

        saveLocalCareerData(careerData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Reordenar Materias del Año {subject.info.year}</h2>
                <div className="modal-fields">
                    <div className="space-y-2">
                        {subjectsInYear.map((subj, index) => (
                            <div
                                key={subj.sid}
                                className="p-4 bg-indigo-100 dark:bg-indigo-500 rounded-md shadow-sm flex items-center justify-between"
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={handleDrop}
                            >
                                <p className="font-semibold">{subj.info.altname} - {subj.info.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="modal-actions">
                    <button
                        onClick={onClose}
                        className="modal-button modal-cancel-button"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="modal-button modal-save-button"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReorderSubject;

import React, { useState } from "react";
import { CareerData, Subject, SubjectStatus } from "@/types/career-view-types";
import { saveLocalCareerData } from "@/lib/careerEditUtils";

interface EditCorrelativesModalProps {
    careerData: CareerData;
    subject: Subject;
    onClose: () => void;
}

const EditCorrelativesModal: React.FC<EditCorrelativesModalProps> = ({ subject, careerData, onClose }) => {
    const [regularizedSubjects, setRegularizedSubjects] = useState<Set<string>>(
        new Set(subject.info.correlativities.regularized)
    );
    const [approvedSubjects, setApprovedSubjects] = useState<Set<string>>(
        new Set(subject.info.correlativities.approved)
    );

    const handleCheckboxChange = (sid: string, targetSet: SubjectStatus.Regularizado | SubjectStatus.Aprobado) => {
        if (targetSet === SubjectStatus.Regularizado) {
            if (regularizedSubjects.has(sid)) {
                setRegularizedSubjects((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(sid);
                    return newSet;
                });
            } else {
                setRegularizedSubjects((prev) => new Set(prev).add(sid));
                setApprovedSubjects((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(sid);
                    return newSet;
                });
            }
        } else if (targetSet === SubjectStatus.Aprobado) {
            if (approvedSubjects.has(sid)) {
                setApprovedSubjects((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(sid);
                    return newSet;
                });
            } else {
                setApprovedSubjects((prev) => new Set(prev).add(sid));
                setRegularizedSubjects((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(sid);
                    return newSet;
                });
            }
        }
    };

    const handleSave = () => {
        subject.info.correlativities.regularized = Array.from(regularizedSubjects);
        subject.info.correlativities.approved = Array.from(approvedSubjects);

        saveLocalCareerData(careerData);
        onClose();
    };

    const filteredSubjects = careerData.subjects.filter((s) => s.sid !== subject.sid);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Editar Correlativas de: {subject.info.name}</h2>
                <div className="modal-fields">
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr >
                                <th className="border border-gray-300 p-2 text-left bg-indigo-100 dark:bg-indigo-500">Materias</th>
                                <th className="border border-gray-300 p-2 text-center bg-yellow-100 dark:bg-yellow-500">Regularizadas</th>
                                <th className="border border-gray-300 p-2 text-center bg-green-100 dark:bg-green-500">Aprobadas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubjects.map((s) => (
                                <tr key={s.sid}>
                                    <td className="border border-gray-300 p-2">
                                        {s.info.altname} - {s.info.name}
                                    </td>
                                    <td
                                        className={`border border-gray-300 text-center ${
                                            regularizedSubjects.has(s.sid) ? "bg-yellow-200" : ""
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={regularizedSubjects.has(s.sid)}
                                            onChange={() => handleCheckboxChange(s.sid, SubjectStatus.Regularizado)}
                                            className="w-5 h-5 cursor-pointer align-middle"
                                        />
                                    </td>
                                    <td
                                        className={`border border-gray-300 text-center ${
                                            approvedSubjects.has(s.sid) ? "bg-green-200" : ""
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={approvedSubjects.has(s.sid)}
                                            onChange={() => handleCheckboxChange(s.sid, SubjectStatus.Aprobado)}
                                            className="w-5 h-5 cursor-pointer align-middle"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="modal-actions">
                    <button onClick={onClose} className="modal-button modal-cancel-button">
                        Cancelar
                    </button>
                    <button onClick={handleSave} className="modal-button modal-save-button">
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCorrelativesModal;

import React, { useState } from "react";
import { Subject, CareerData, Modality, Duration } from "@/types/career-view-types";
import { changeSubjectInfo } from "@/lib/careerEditUtils";
import "../../styles/edit-modal.css"

type EditSubjectModalProps = {
    subject: Subject;
    careerData: CareerData;
    onClose: () => void;
};

const EditSubjectModal: React.FC<EditSubjectModalProps> = ({ subject, careerData, onClose }) => {
    // Estado inicial del formulario
    const [formValues, setFormValues] = useState({
        name: subject.info.name,
        altname: subject.info.altname || "",
        modality: subject.info.modality as Modality,
        description: subject.info.description || "",
        duration: subject.info.duration as Duration,
        weeklyLoad: subject.info.weeklyLoad || 0,
    });

    // Estructura para definir los campos del formulario
    const fields = [
        { name: "name", label: "Nombre", type: "text" },
        { name: "altname", label: "Acronimo", type: "text" },
        { name: "weeklyLoad", label: "Carga Semanal (en horas)", type: "number" },
        {
            name: "modality",
            label: "Modalidad",
            type: "select",
            options: Object.entries(Modality).filter(([key]) => isNaN(Number(key)))
        },
        {
            name: "duration",
            label: "Duración",
            type: "select",
            options: Object.entries(Duration).filter(([key]) => isNaN(Number(key)))
        },
        { name: "description", label: "Descripción", type: "textarea" },
    ];

    // Manejar cambios en los inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: ["modality", "duration", "weeklyLoad"].includes(name)
                ? Number(value)
                : value,
        }));
    };

    // Guardar cambios y cerrar modal
    const handleSave = () => {
        const { name, altname, modality, description, duration, weeklyLoad } = formValues;
        changeSubjectInfo(careerData, subject, modality, name, altname, description, duration, weeklyLoad);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Editando: {subject.info.name}</h2>
                <div className="modal-fields">
                    {fields.map((field) => (
                        <div className="modal-field" key={field.name}>
                            <label htmlFor={field.name} className="modal-label">
                                {field.label}
                            </label>
                            {field.type === "textarea" && (
                                <textarea
                                    id={field.name}
                                    name={field.name}
                                    value={(formValues as any)[field.name]}
                                    onChange={handleInputChange}
                                    className="modal-input modal-textarea"
                                />
                            )}
                            {field.type === "select" && field.options && (
                                <select
                                    id={field.name}
                                    name={field.name}
                                    value={(formValues as any)[field.name]}
                                    onChange={handleInputChange}
                                    className="modal-input modal-select"
                                >
                                    {field.options.map(([key, value]) => (
                                        <option key={value} value={value}>
                                            {key}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {field.type !== "textarea" && field.type !== "select" && (
                                <input
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    value={(formValues as any)[field.name]}
                                    onChange={handleInputChange}
                                    className="modal-input"
                                />
                            )}
                        </div>
                    ))}
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

export default EditSubjectModal;

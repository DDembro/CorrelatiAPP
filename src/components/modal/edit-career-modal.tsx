import React, { useState } from "react";
import { CareerData } from "@/types/career-view-types";
import "../../styles/edit-modal.css";
import { changeCareerInfo } from "@/lib/careerEditUtils";

type EditCareerModalProps = {
    careerData: CareerData;
    onClose: () => void;
};

const EditCareerModal: React.FC<EditCareerModalProps> = ({ careerData, onClose }) => {
    // Estado inicial del formulario
    const [formValues, setFormValues] = useState({
        title: careerData.title,
        author: careerData.author,
        years: careerData.years,
    });

    // Estructura para definir los campos del formulario
    const fields = [
        { name: "title", label: "Nombre Carrera", type: "text" },
        { name: "author", label: "Autor de la plantilla", type: "text" },
        { name: "years", label: "Años de duracion", type: "number" },
    ];

    // Manejar cambios en los inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: name === "years" ? Number(value) : value, // Convierte `years` a número
        }));
    };

    // Guardar cambios y cerrar el modal
    const handleSave = () => {
        const { title, author, years } = formValues;
        changeCareerInfo(careerData, title, author, years);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Editar Carrera</h2>
                <div className="modal-fields">
                    {fields.map((field) => (
                        <div className="modal-field" key={field.name}>
                            <label htmlFor={field.name} className="modal-label">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={(formValues as any)[field.name]}
                                onChange={handleInputChange}
                                className="modal-input"
                            />
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

export default EditCareerModal;

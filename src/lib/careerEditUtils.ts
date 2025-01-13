import { CareerData, Subject } from "@/types/career-view-types";

// Guarda CareerData
export const saveLocalCareerData = (careerData: CareerData) => {
    sessionStorage.setItem("careerData", JSON.stringify(careerData));
};

// Devuelve CareerData
export const getLocalCareerData = () => {
    return sessionStorage.getItem("careerData");
};

// Valida un CareerData
export const isValidCareerData = (data: CareerData): data is CareerData => {
    return (
        data !== null 
        && typeof data === "object"
        && typeof data.id === "number"
        && typeof data.title === "string"
        && typeof data.author === "string"
        && typeof data.years === "number"
        && typeof data.color === "string"
        && Array.isArray(data.subjects)
    );
};

// Descarga el objeto CareerData como archivo JSON (gracias chat gpt)
export const downloadCareerData = (careerData: CareerData) => {
    saveLocalCareerData(careerData);
    // Convierte careerData a JSON
    const dataStr = JSON.stringify(careerData, null, 2); // Indentado para legibilidad
    const blob = new Blob([dataStr], { type: "application/json" });

    // Genera una URL para el Blob
    const url = URL.createObjectURL(blob);

    // Crea un enlace temporal para la descarga
    const a = document.createElement("a");
    a.href = url;
    a.download = `${careerData.title}.json`; // Nombre del archivo
    document.body.appendChild(a); // Añadir el enlace al DOM (necesario para algunos navegadores)
    a.click(); // Simular clic para iniciar la descarga

    // Limpiar después de la descarga
    document.body.removeChild(a); // Elimina el enlace temporal
    URL.revokeObjectURL(url); // Libera recursos asociados con la URL
};

export const changeStatus = (careerData: CareerData, subject: Subject, status: number) => {
    let subj = careerData.subjects.find(subj => subj.sid === subject.sid); // Encontrar el subject con el mismo sid
    if (subj) {
        subj.personal.status = status; // Actualizar el campo status
    }
    // Guarda en sessionStorage para tener los cambios sincronizados
    sessionStorage.setItem("careerData", JSON.stringify(careerData));
};
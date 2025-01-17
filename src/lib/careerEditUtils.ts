import { CareerData, Subject, SubjectStatus } from "@/types/career-view-types";

// Guarda CareerData
export const saveLocalCareerData = (careerData: CareerData, updateDate?: boolean) => {
    // En caso de ser una actualizacion al formato, se altera la fecha de ultima actualizacion antes de guardar
    if(updateDate)
        careerData.lastUpdateDate = new Date();

    localStorage.setItem("careerData", JSON.stringify(careerData));
};

// Devuelve CareerData
export const getLocalCareerData = () => {
    return localStorage.getItem("careerData");
};

// Borra CarrerData
export const deleteLocalCareerData = () => {
    return localStorage.removeItem("careerData");
};

// Valida un CareerData
export const isValidCareerData = (data: CareerData): data is CareerData => {
    return (
        data !== null 
        && typeof data === "object"
        && typeof data.title === "string"
        && typeof data.author === "string"
        && typeof data.years === "number"
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

export const changeStatus = (careerData: CareerData, subject: Subject, status: SubjectStatus) => {
    subject.personal.status = status;
    saveLocalCareerData(careerData);
};

export const changeQualification = (careerData: CareerData, subject: Subject, qualification: number) => {
    if (isNaN(qualification) || qualification < 0) {
        alert("Ingrese un valor valido");
        return;
    }

    subject.personal.qualification = qualification;
    saveLocalCareerData(careerData);
};

/* 
================================================================================

Funciones que editan estructura de CareerData

================================================================================
*/

/* Cambia los datos de la materia y los guarda en careerData */
export const changeSubjectInfo = (
    careerData: CareerData,
    subject: Subject,
    modality?: number,
    name?: string,
    altname?: string,
    description?: string,
    duration?: number,
    weeklyLoad?: number,
) => {
    let info = subject.info;
    if (modality !== undefined) info.modality = modality;
    if (name !== undefined) info.name = name;
    if (altname !== undefined) info.altname = altname;
    if (description !== undefined) info.description = description;
    if (duration !== undefined) info.duration = duration;
    if (weeklyLoad !== undefined) info.weeklyLoad = weeklyLoad;

    saveLocalCareerData(careerData, true);
};

/* Cambia los datos de la Carrera y los guarda */
export const changeCareerInfo = (
    careerData: CareerData,
    title?: string,
    author?: string,
    years?: number,
) => {
    if (title !== undefined) careerData.title = title;
    if (author !== undefined) careerData.author = author;

    if (years !== undefined) changeCareerYears(careerData, years);

    saveLocalCareerData(careerData, true);
};

/* Funcion auxiliar para cambiar los años de la carrera, ya que es un caso sencible */
const changeCareerYears = (
    careerData: CareerData,
    yearsNewVal: number,
) => {
    if(careerData.years == yearsNewVal)
        return; // Si el valor no cambio, sale sin hacer nada

    if(yearsNewVal <= 0 || yearsNewVal > 10) {
        alert("El año no puede ser menor que 1 ni mayor que 10");
        throw new Error("El año no puede ser menor que 1 ni mayor que 10");
    }

    // Si la nueva cantidad de años es menor a la actual
    if (yearsNewVal < careerData.years) {
        const removedYears = Array.from({ length: careerData.years - yearsNewVal }, (_, i) => yearsNewVal + 1 + i);

        careerData.subjects.forEach((subject) => {
            if (removedYears.includes(subject.info.year)) {
                subject.info.year = yearsNewVal; // Las asignamos al último año válido
            }
        });
    }

    careerData.years = yearsNewVal;
};

/* Cambia los datos de la Carrera y los guarda */
export const changeSubjectYear = (
    careerData: CareerData,
    subject: Subject,
    newYear: number,
    newIndex: number | null = null // Opcional: índice en el nuevo año
) => {  
    if (newYear > careerData.years) {
        alert("El año de la materia no puede superar la cantidad de años de la carrera");
        throw new Error("El año de la materia no puede superar la cantidad de años de la carrera");
    }
    if (newYear <= 0) {
        alert("El año de la materia no puede ser menor a 1");
        throw new Error("El año de la materia no puede ser menor a 1");
    }
    subject.index = -1;
    subject.info.year = newYear;

    saveLocalCareerData(careerData, true);
};

/* Borra una materia del careerData */
export const deleteSubject = (careerData: CareerData, subject: Subject) => {
    if (!confirm("Confirme el borrado de: " + subject.info.name))
        return;

    const index = careerData.subjects.findIndex(s => s.sid === subject.sid);
    if (index === -1) {
        console.warn("La materia no existe en los datos de la carrera");
        return;
    }
    careerData.subjects.splice(index, 1);

    saveLocalCareerData(careerData, true);
};

/* Duplica una materia y la inserta al fondo del año */
export const duplicateSubject = (careerData: CareerData, subject: Subject) => {
    const maxSid = Math.max(...careerData.subjects.map(s => Number(s.sid)), 0);

    const newSubj: Subject = JSON.parse(JSON.stringify(subject));
    newSubj.sid = (Number(maxSid) + 1).toString();
    newSubj.index = careerData.subjects.length;

    careerData.subjects.push(newSubj);

    saveLocalCareerData(careerData, true);
};








// Tipos usados para las funciones

import { Subject } from "@/types/career-view-types";


interface Correlativities {
    regularized: string[];
    approved: string[];
}

interface DictionaryEntry {
    altname: string;
    status: "promoted" | "approved" | "regularized" | "na";
}

type SubjectsDictionary = Record<string, DictionaryEntry>;

type FormattedCorrelativities = {
    regularized: string;
    approved: string;
};

// Acomoda las materias según su año e índice
export const sortSubjects = (subjects: Subject[], years: number): Subject[][] => {
    let sortedArr: Subject[][] = Array.from({ length: years }, () => []);

    // Ordena las materias por índice
    subjects.sort((a, b) => a.index - b.index);

    subjects.forEach(subject => {
        const pos = subject.info.year - 1;
        sortedArr[pos].push(subject);
    });

    return sortedArr;
};

// Crea un diccionario { sid: { altname: "", status: "" } } por cada materia
export const initiateSubjectsDictionary = (subjectsArr: Subject[]): SubjectsDictionary => {
    let dictionary: SubjectsDictionary = {};

    subjectsArr.forEach(subject => {
        const pers = subject.personal;
        dictionary[subject.sid] = {
            altname: subject.info.altname,
            status: 
                pers.status === 3 ? "promoted" :
                pers.status === 2 ? "approved" :
                pers.status === 1 ? "regularized" :
                "na",
        };
    });

    return dictionary;
};

// Reemplaza los números por altname usando el diccionario
export const formatCorrelativities = (
    corrStruct: Correlativities,
    dictionary: SubjectsDictionary
): FormattedCorrelativities => {
    let formattedCorr: FormattedCorrelativities = {
        regularized: "",
        approved: "",
    };

    formattedCorr.regularized = corrStruct.regularized
        .map(corr => dictionary[corr]?.altname || "")
        .join(", ");
    formattedCorr.approved = corrStruct.approved
        .map(corr => dictionary[corr]?.altname || "")
        .join(", ");

    if (formattedCorr.regularized === "") formattedCorr.regularized = "-";
    if (formattedCorr.approved === "") formattedCorr.approved = "-";

    return formattedCorr;
};

// Formatea la duración de una materia
export const formatDuration = (duration: number): string => {
    switch (duration) {
        case 1:
            return "Cuatrimestral";
        case 2:
            return "Anual";
        default:
            return "Error";
    }
};

// Formatea la modalidad de una materia
export const formatModality = (modality: number): string => {
    switch (modality) {
        case 1:
            return "Presencial";
        case 2:
            return "Virtual";
        case 3:
            return "Hibrido";
        default:
            return "Error";
    }
};

// Verifica si es posible inscribirse a esa materia según sus correlatividades
export const checkCanEnroll = (
    subject: Subject,
    dictionary: SubjectsDictionary
): boolean => {
    const personal = subject.personal;
    const correlativities = subject.info.correlativities;

    if (personal.status) {
        return true;
    }

    let canEnroll = true;

    correlativities.regularized.forEach(sid => {
        if (dictionary[sid]?.status === "na") {
            canEnroll = false;
        }
    });

    correlativities.approved.forEach(sid => {
        if (
            dictionary[sid]?.status === "na" ||
            dictionary[sid]?.status === "regularized"
        ) {
            canEnroll = false;
        }
    });

    return canEnroll;
};

// Muestra / oculta la información de una materia
export const showSubjectInfo = (sid: string, mode?:boolean): void => {
    const subjectInfo = document.getElementById(`subject-${sid}-info`);

    if (mode == null)
        subjectInfo?.classList.toggle("hidden");
    else {
        if (mode)
            subjectInfo?.classList.remove("hidden");
        else
            subjectInfo?.classList.add("hidden");
    }
};

// Muestra toda la información de las materias
export const showAllSubjectInfo = (dictionary: SubjectsDictionary): void => {
    Object.keys(dictionary).forEach(sid => {
        showSubjectInfo(sid, true);
    });
};

// Oculta toda la información de las materias
export const hideAllSubjectInfo = (dictionary: SubjectsDictionary): void => {
    Object.keys(dictionary).forEach(sid => {
        showSubjectInfo(sid, false);
    });
};

// Resalta las materias correlativas de un target
export const showCorrelativities = (
    subjectArr: Subject[],
    targetSubject: Subject
): void => {
    const regularizedNeeded = targetSubject.info.correlativities.regularized;
    const approvedNeeded = targetSubject.info.correlativities.approved;

    const targetSubj = document.getElementById(`subject-${targetSubject.sid}`);
    if (targetSubj) {
        targetSubj.classList.add("border-8", "border-black");
    }

    subjectArr.forEach(subject => {
        const subj = document.getElementById(`subject-${subject.sid}`);

        if (subj) {
            if (regularizedNeeded.includes(subject.sid)) {
                subj.classList.add("border-8", "border-amber-700");
            } else if (approvedNeeded.includes(subject.sid)) {
                subj.classList.add("border-8", "border-emerald-800");
            }
        }
    });
};

// Limpia los estilos generados en showCorrelativities
export const hideCorrelativities = (subjectArr: Subject[]): void => {
    subjectArr.forEach(subject => {
        const subj = document.getElementById(`subject-${subject.sid}`);
        if (subj) {
            subj.classList.remove(
                "border-8",
                "border-amber-700",
                "border-emerald-800",
                "border-black"
            );
        }
    });
};
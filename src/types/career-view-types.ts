export interface CareerData {
    title: string,
    author: string,
    years: number,
    creationDate: Date,
    lastUpdateDate: Date;
    subjects: [Subject]
}

export enum Modality {
    Presencial = 0,
    Virtual = 1,
    Hibrido = 2,
}

export enum Duration {
    Cuatrimestral = 0,
    Anual = 1,
}

export enum SubjectStatus {
    NA = 0, // Not Available
    Regularizado = 1,
    Aprobado = 2,
    Promocionado = 3,
}

export interface Subject {
    sid: string;
    index: number;
    info: {
        year: number;
        modality: Modality; // Reemplazo con el enum
        name: string;
        altname: string;
        description?: string;
        duration: Duration;
        weeklyLoad: number;
        correlativities: {
            regularized: string[];
            approved: string[];
        };
    };
    personal: {
        status: SubjectStatus; // Reemplazo con el enum
        qualification: number;
    };
}

export interface ContextMenuState {
    position: { x: number; y: number };
    toggled: boolean;
    subjectClicked: Subject | null;
}

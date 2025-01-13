export interface CareerData {
    id: number,
    title: string,
    author: string,
    years: number,
    color: string,
    creationDate: Date,
    subjects: [Subject]
}

export interface Subject {
    sid: string;
    index: number;
    info: {
        year: number;
        modality: number;
        name: string;
        altname: string;
        description?: string;
        duration: number;
        weeklyLoad: number;
        correlativities: {
            regularized: string[];
            approved: string[];
        };
    };
    personal: {
        status: number; // 0 na, 1 regularizado, 2 aprobado, 3 promocionado
        qualification: number;
    };
}

export interface ContextMenuState {
    position: { x: number; y: number };
    toggled: boolean;
    subjectClicked: Subject | null;
}

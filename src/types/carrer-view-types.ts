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
        isPromoted: boolean;
        isApproved: boolean;
        isRegularized: boolean;
    };
}

export interface ContextMenuState {
    position: { x: number; y: number };
    toggled: boolean;
    subjectClicked: Subject | null;
}

import { useState, useRef, useEffect } from "react";
import { CareerData, ContextMenuState, Subject } from "@/types/career-view-types";
import { hideCorrelativities } from "@/lib/subjectsUtils";

export const useContextMenu = (
    careerData: CareerData,
    initialState: ContextMenuState = { 
        position: { x: 0, y: 0 }, 
        toggled: false, 
        subjectClicked: null 
    }
) => {
    const contextMenuRef = useRef<HTMLDivElement | null>(null);
    const [contextMenu, setContextMenu] = useState<ContextMenuState>(initialState);
    const subjectsRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const handleContextMenu = (e: React.MouseEvent, subject: Subject) => {
        e.preventDefault();
        const isLeft = e.clientX < window.innerWidth / 2;

        // Quita los estilos de las correlativas anteriores
        hideCorrelativities(careerData.subjects);
        // Limpia la referencia previa
        if (contextMenu.subjectClicked) {
            const prevElement = subjectsRefs.current[contextMenu.subjectClicked.sid];
            prevElement?.classList.remove("shadow-md", "shadow-slate-700");
        }
        // Añade estilos al elemento actual
        const currentElement = subjectsRefs.current[subject.sid];
        currentElement?.classList.add("shadow-md", "shadow-slate-700");

        setContextMenu({
            position: {
                x: isLeft ? e.clientX : e.clientX - (contextMenuRef.current?.offsetWidth || 0),
                y: e.clientY,
            },
            toggled: true,
            subjectClicked: subject,
        });
    };

    const resetContextMenu = () => {
        if (contextMenu.subjectClicked) {
            const subj = document.getElementById(
                `subject-${contextMenu.subjectClicked.sid}`
            );
            subj?.classList.remove("shadow-md", "shadow-slate-700");
        }
        setContextMenu({ position: { x: 0, y: 0 }, toggled: false, subjectClicked: null });
    };

    // Cerrar el menu contextual al hacer click
    useEffect(() => {
        const handler = () => resetContextMenu();
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    });

    return {
        contextMenuRef,
        contextMenu,
        handleContextMenu,
        resetContextMenu,
    };
};

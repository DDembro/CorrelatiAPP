"use client"

import React, { useEffect, useRef, useState } from 'react'
import { ContextMenuState, Subject } from '@/types/carrer-view-types'
import renderCareerViewTable from './career-render-table'
import { hideCorrelativities } from '@/lib/subjectsUtils'

// Como indica el nombre, es solo un maquetado de ejemplo que sirve para ver como seran los estilos finales
const TableViewCareer = ({ carrerData }: any) => {

    // Si no cargo ninguna carrera da alerta
    if (!carrerData) {
        return (
            <div>
                <p>No hay datos disponibles. Por favor, carga un archivo válido.</p>
            </div>
        );
    }

    /* ============ CONTEXT MENU ============ */
    //#region 
    const contextMenuRef = useRef<HTMLDivElement | null>(null);
    const [contextMenu, setContextMenu] = useState<ContextMenuState>({
        position: { x: 0, y: 0 },
        toggled: false,
        subjectClicked: null,
    });

    const handleOnContextMenu = (e: React.MouseEvent, subject: Subject) => {
        e.preventDefault();
        const contextMenuAttr = contextMenuRef.current?.getBoundingClientRect();
        const isLeft = e.clientX < window?.innerWidth / 2;

        let x = isLeft ? e.clientX : e.clientX - (contextMenuAttr?.width || 0);
        let y = e.clientY;
        // Resetea los estilos del elemento anterior en caso de haberlo
        if (contextMenu.subjectClicked) {
            const prevSubj = document.getElementById(
                `subject-${contextMenu.subjectClicked.sid}`
            );
            prevSubj?.classList.remove("shadow-md", "shadow-slate-700");
        }
        // Quita los estilos de las correlativas anteriores
        hideCorrelativities(carrerData.subjects);
        // Cambia los estilos al nuevo elemento seleccionado
        const currentSubj = document.getElementById(`subject-${subject.sid}`);
        currentSubj?.classList.add("shadow-md", "shadow-slate-700");
        setContextMenu({
            position: { x, y },
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
        setContextMenu({
            position: { x: 0, y: 0 },
            toggled: false,
            subjectClicked: null,
        });
    };

    // Cerrar el menu contextual al hacer click
    useEffect(() => {
        const handler = (e: any) => {
            if (contextMenuRef.current) resetContextMenu();
        }
        document.addEventListener('click', handler);
        return () => {
            document.removeEventListener('click', handler);
        }
    })
    //#endregion
    /* ============ CONTEXT MENU ============ */

    

    return (
        <div className="bg-slate-300 p-2 flex divide-x-2 divide-gray-400 justify-center">
            {renderCareerViewTable(carrerData, handleOnContextMenu, contextMenuRef, contextMenu)}
        </div>
    )
}

export default TableViewCareer
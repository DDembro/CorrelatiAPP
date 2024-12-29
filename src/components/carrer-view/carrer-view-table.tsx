"use client"

import React, { useEffect, useRef, useState } from 'react'
import { sortSubjects, initiateSubjectsDictionary, formatCorrelativities, formatDuration, formatModality, checkCanEnroll, showSubjectInfo, showCorrelativities, hideCorrelativities } from '@/lib/subjectsUtils'
import ContextMenu from '../context-menu'

interface Subject {
    sid: string;
    info: {
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

interface ContextMenuState {
    position: { x: number; y: number };
    toggled: boolean;
    subjectClicked: Subject | null;
}

// Como indica el nombre, es solo un maquetado de ejemplo que sirve para ver como seran los estilos finales
const TableViewCarrer = (props:any) => {

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
        hideCorrelativities(props.carrerData.subjects);
    
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
            if (contextMenuRef.current)
            resetContextMenu()
    }

        document.addEventListener('click', handler)
        return () => {
            document.removeEventListener('click', handler)
        }
    })
    //#endregion
    /* ============ CONTEXT MENU ============ */

    let subjectsDictionary // Diccionario es un objeto con { sid : {altname:"", status:""} } de cada materia

    const renderSubjects = (subjectArr: any[], dictionary:any) => {
        let subjectsCards: React.JSX.Element[] = []

        subjectArr.forEach((subject) => {
            const info = subject.info
            const personal = subject.personal
            const canEnroll = checkCanEnroll(subject, dictionary)

            const correlativities = formatCorrelativities(info.correlativities, dictionary)
            const duration = formatDuration(info.duration)
            const modality = formatModality(info.modality)

            subjectsCards.push(
                <div
                    id={"subject-" + subject.sid}
                    onClick={e => showSubjectInfo(subject.sid)}
                    onContextMenu={e => handleOnContextMenu(e, subject)}
                    className="bg-amber-50  my-3 hover:shadow-md hover:shadow-slate-700"
                >
                    {/* Titulo */}
                    <div
                        className={`text-center py-2 ${personal.isApproved ? "bg-green-600" : personal.isRegularized ? "bg-amber-400" : canEnroll ? "bg-indigo-400" : "bg-stone-400"}`}
                    >
                        <strong> {info.name} </strong>
                        <p className="text-sm mt-2 font-medium"> {info.altname} - {duration} {info.weeklyLoad}Hs</p>
                    </div>

                    <div
                        id={`subject-${subject.sid}-info`}
                        className='hidden'
                    >
                        <div className="m-2">
                            <p> Modalidad: {modality} </p>
                        </div>

                        <div className="mx-2 my-4 text-sm">
                            <p> {info.description} </p>
                        </div>
                        {/* Correlativas */}
                        <div className="mx-2 py-2">
                            <p> Requisitos: </p>
                            <div className="text-xs">
                                <p> Regularizada: {correlativities.regularized} </p>
                                <p> Aprobada: {correlativities.approved} </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        return subjectsCards
    }

    const renderCarrerViewTable = (data:any) => {
        const title = data.title
        const author = data.author
        const years = data.years
        const subjects = data.subjects

        subjectsDictionary = initiateSubjectsDictionary(subjects)

        let yearCols = []
        let sortedSubjects = sortSubjects(subjects, years)

        // Crea las columnas de los años con sus materias dentro
        for (let i = 0; i < years; i++) {
            yearCols.push(
                <div className="px-2 w-64 divide-y-2 divide-gray-400 divide-dashed">
                    <div className="text-center">
                        <strong>Año {i + 1}</strong>
                    </div>
                    <div>
                        {renderSubjects(sortedSubjects[i], subjectsDictionary)}
                    </div>
                </div>
            )
        }

        return (
            <>
                {yearCols}

                <ContextMenu
                contextMenuRef={contextMenuRef}
                isToggled={contextMenu.toggled}
                positionX={contextMenu.position.x}
                positionY={contextMenu.position.y}
                buttons={[
                    {
                        text: "Marcar No Cursada",
                        onClick: () => alert("Sin cursar"),
                        isSpacer: false
                    },
                    {
                        text: "Marcar Regularizada",
                        onClick: () => alert("Regularizada"),
                        isSpacer: false
                    },
                    {
                        text: "Marcar Aprobada",
                        onClick: () => alert("Aprobada"),
                        isSpacer: false
                    },
                    {
                        text: "Marcar Promocionada",
                        onClick: () => alert("Promocionada"),
                        isSpacer: false
                    },
                    {
                        text: "",
                        onClick: () => null,
                        isSpacer: true
                    },
                    {
                        text: "Mostrar Correlativas",
                        onClick: () => showCorrelativities(subjects, contextMenu.subjectClicked),
                        isSpacer: false
                    },
                ]}
            />
            </>
        )
    }

    return (
        <div className="bg-slate-300 p-2 flex divide-x-2 divide-gray-400 justify-center">
            {renderCarrerViewTable(props.carrerData)}
        </div>
    )
}

export default TableViewCarrer
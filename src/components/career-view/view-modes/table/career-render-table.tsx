import React from "react";
import { initiateSubjectsDictionary, showCorrelativities, sortSubjects } from "@/lib/subjectsUtils";
import ContextMenu from "../../../context-menu";
import renderSubjects from "../../carrer-render-subjects";

const renderCareerViewTable = (carrerData:any, handleOnContextMenu:any, contextMenuRef:any, contextMenu:any) => {
    const title = carrerData.title
    const author = carrerData.author
    const years = carrerData.years
    const subjects = carrerData.subjects

    let subjectsDictionary = initiateSubjectsDictionary(subjects)

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
                    {renderSubjects(sortedSubjects[i], subjectsDictionary, handleOnContextMenu)}
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

export default renderCareerViewTable;

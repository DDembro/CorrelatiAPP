import React from "react";
import { CareerData, Subject } from "@/types/career-view-types";

import { initiateSubjectsDictionary, sortSubjects } from "@/lib/subjectsUtils";
import RenderViewSubjects from "./carrer-subjects-view-table";

const CareerRenderViewTable = (carrerData:CareerData, handleOnContextMenu:any) => {
    const years = carrerData.years
    const subjects = carrerData.subjects

    let subjectsDictionary = initiateSubjectsDictionary(subjects)

    let yearCols = []
    let sortedSubjects = sortSubjects(subjects, years)

    // Crea las columnas de los años con sus materias dentro
    for (let i = 0; i < years; i++) {
        yearCols.push(
            <div 
                key={`year-${i}`}
                className="px-2 w-64 divide-y-2 divide-gray-400 divide-dashed"
            >
                <div className="text-center">
                    <strong>Año {i + 1}</strong>
                </div>
                <div>
                    {RenderViewSubjects(sortedSubjects[i], subjectsDictionary, handleOnContextMenu)}
                </div>
            </div>
        )
    }

    return (
        <>
            {yearCols}
        </>
    )
}

export default CareerRenderViewTable;

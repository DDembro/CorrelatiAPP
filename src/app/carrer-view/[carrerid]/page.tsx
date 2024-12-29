"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import TableViewCarrer from '@/components/carrer-view/carrer-view-table'
import ListViewCarrer from '@/components/carrer-view/carrer-view-list'
import { showAllSubjectInfo, hideAllSubjectInfo, initiateSubjectsDictionary } from '@/lib/subjectsUtils'

const CarrerViewPage = ({ params }:any) => {

    const [viewMode, setViewMode] = useState(true)

    const carrerData = require('@/placeholder-data/ingsistemas.json') // ESTO DEBERIA SER UNA BASE DE DATOS

    return (
        <div className="p-2">
            <div className="p-3 flex align-top">
                <Link href="/home/my-carrers">
                    <button className="bg-blue-500 px-3 py-2 mx-1 border rounded hover:bg-blue-600 active:bg-blue-700">Volver</button>
                </Link>

                <p className="mx-6 text-lg self-center">Viendo: {carrerData.title}</p>

                <button
                    onClick={e => setViewMode(true)}
                    className={`bg-blue-500 px-3 py-2 mx-1 border rounded hover:bg-blue-600 active:bg-blue-700 ${!viewMode ? "" : "bg-blue-600"}`}
                >
                    Tabla
                </button>

                <button
                    onClick={e => setViewMode(false)}
                    className={`bg-blue-500 px-3 py-2 mx-1 border rounded hover:bg-blue-600 active:bg-blue-700 ${viewMode ? "" : "bg-blue-600"}`}
                >
                    Lista
                </button>

                <button
                    onClick={e => showAllSubjectInfo( initiateSubjectsDictionary(carrerData.subjects) )}
                    className={`bg-blue-500 px-3 py-2 mx-1 border rounded hover:bg-blue-600 active:bg-blue-700`}
                >
                    Expandir todo
                </button>

                <button
                    onClick={e => hideAllSubjectInfo( initiateSubjectsDictionary(carrerData.subjects) )}
                    className={`bg-blue-500 px-3 py-2 mx-1 border rounded hover:bg-blue-600 active:bg-blue-700`}
                >
                    Colapsar todo
                </button>
            </div>

            <div>
                {viewMode ? <TableViewCarrer carrerData={carrerData} /> : <ListViewCarrer carrerData={carrerData}></ListViewCarrer>}
            </div>

        </div>
    )
}

export default CarrerViewPage
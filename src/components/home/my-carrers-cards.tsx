import Link from 'next/link'
import React from 'react'

const MyCarrers = () => {
    return (
        <div className="flex">
            <div className="flex p-6 w-full flex-wrap justify-between">
                <CareerCards />
            </div>
        </div>
    )
}

export default MyCarrers

const CareerCards = () => {
    const myCarrers = require('@/placeholder-data/miscarreras.json') // ESTO DEBERIA SER UNA BASE DE DATOS
    return (
        <>
            {myCarrers.carrers.map((carrer: any) => {
                const color = carrer.color
                return (
                    <Link href={`/carrer-view/${carrer.id}`} className="m-5">
                        <div className={`w-96 h-32 text-white p-5 rounded-xl flex justify-between ${color} hover:brightness-75 active:brightness-50`}>
                            <strong> {carrer.title} </strong>

                            <div className="bg-slate-200 size-10 rounded-full hover:brightness-200"></div>
                        </div>
                    </Link>
                )
            })}
        </>
    )
}
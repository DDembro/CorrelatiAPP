"use client";
import React, {ReactEventHandler, useState} from "react";
import data_user from "@/types/data-user";

const dataUserTest:data_user={
    name:"",
    email:"",
    duracion:6
}

const CareerCreate_SteepOne=()=>{
    const universidades=["UTN","UBA","OTRA"];
    const [dataUser, setDataUser] = useState({ ...dataUserTest });
    const handleChangeName = (event: { target: { value: any; }; }) => {
        const { value } = event.target;
        setDataUser({ ...dataUser, name: value });
    };
    const handleChangeEmail = (event: { target: { value: any; }; }) => {
        const { value } = event.target;
        setDataUser({ ...dataUser, email: value });
    }
    const handleChangeDuracion = (event: { target: { value: any; }; }) => {

        const { value } = event.target;
        if(value>10 || value<=0) return;

        setDataUser({ ...dataUser, duracion: value });
    }
    const handleButtonNext=()=>{
        console.log("Next")
    }
    return(
        <div className="flex items-center justify-center p-4">
            <div
                className={`max-w-lg w-full p-6 rounded-lg border-2 shadow-md transition-all`}
            >
                {/* Header */}
                <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 text-center">
                    📂 Crea tu perfil
                </h2>
                <div className="space-y-1">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-gray-200">Completa con tu informacion</h2>
                    </div>
                    <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label htmlFor="username"
                                   className="block text-sm/2 font-medium text-gray-900 dark:text-gray-200">Datos
                                personales</label>
                        </div>
                    </div>
                    <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3 mt-2">
                            <label htmlFor="name"
                                   className="block text-sm/6 font-medium text-gray-900 dark:text-gray-200">Nombre
                            </label>
                            <div className="mt-2">
                                <input type="text" name="first-name" id="first-name" autoComplete="given-name"
                                       className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                       value={dataUser?.name}
                                       onChange={handleChangeName}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3 mt-2">
                            <label htmlFor="country"
                                   className="block text-sm/6 font-medium text-gray-900 dark:text-gray-200">Universidad</label>
                            <div className="mt-2 grid grid-cols-1">
                                <select id="country" name="country" autoComplete="country-name"
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                    {universidades.map((universidad) => (
                                        <option key={universidad} value={universidad}>{universidad}</option>
                                    ))}
                                </select>
                                <svg
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">

                                </svg>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="email"
                                   className="block text-sm/6 font-medium text-gray-900 dark:text-gray-200">Email
                            </label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete="email"
                                       className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                       value={dataUser?.email}
                                       onChange={handleChangeEmail}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="mt-5">
                        <label htmlFor="price" className="block mt-4 text-sm/6 font-medium text-gray-900 dark:text-gray-200">Duracion</label>
                        <div className="mt-2">
                            <div
                                className="flex items-center rounded-md bg-white  outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">

                                <input type="number" min="1" name="time" id="time"
                                       value={dataUser?.duracion}
                                       onChange={handleChangeDuracion}
                                       className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:text-gray-200"
                                       placeholder="1"/>
                                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                    <select id="currency" name="currency" aria-label="Currency"
                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:text-gray-200">
                                        <option>Años</option>
                                    </select>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
export default CareerCreate_SteepOne;

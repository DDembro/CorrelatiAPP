import React from "react";

const CareerCreate_StepTwo=()=>{
    const materia=["Fisica 1","Fisica 2","AGA"];
    const options=["Cursando","Regularizada","Promocionada"];
    return(
        <>
            <div className="flex items-center justify-center p-4">
                <div
                    className={`max-w-lg w-full p-6 rounded-lg border-2 shadow-md transition-all`}
                >
                    {/* Header */}
                    <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 text-center">
                        Crea tu perfil
                    </h2>
                    <div className="space-y-1">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base/7 font-semibold text-gray-900 dark:text-gray-200">Completa con tu
                                informacion</h2>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="country"
                                   className="block text-sm/6 font-medium text-gray-900 dark:text-gray-200">Materia</label>
                            <div className="mt-2 grid grid-cols-1">
                                <select id="country" name="country" autoComplete="country-name"
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                    {materia.map((materia)=>(
                                        <option value={materia} key={materia}>{materia}</option>
                                    ))}

                                </select>
                                <svg
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fillRule="evenodd"
                                          d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>
<div className="sm:col-span-3">
                            <label htmlFor="country"
                                   className="block text-sm/6 font-medium text-gray-900 dark:text-gray-200">Estado</label>
                            <div className="mt-2 grid grid-cols-1">
                                <select id="country" name="country" autoComplete="country-name"
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                    {options.map((opcion)=>(
                                        <option value={opcion} key={opcion}>{opcion}</option>
                                    ))}

                                </select>
                                <svg
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fillRule="evenodd"
                                          d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="price"
                                   className="block mt-4 text-sm/6 font-medium text-gray-900 dark:text-gray-200">Nota</label>
                            <div className="mt-2">
                                <div
                                    className="flex items-center rounded-md bg-white  outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                    <input type="number" min="1" name="time" id="time"
                                           className="items-center justify-center rounded-md block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:text-gray-200"
                                           placeholder="1"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-3 justify-center items-center">
                        <label
                            className="cursor-pointer bg-indigo-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-600 transition-colors mt-10 text-center ">
                            Agregar mas
                        </label>
                        <label
                            className="cursor-pointer bg-indigo-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-600 transition-colors mt-10 text-center ">
                            Finalizar
                        </label>

                    </div>
                </div>

            </div>
        </>);
};
export default CareerCreate_StepTwo;

"use client";

import Link from "next/link";
import React, {ReactEventHandler, useState} from "react";
import data_user from "@/types/data-user";
import CareerCreate_StepOne from "@/components/career-created/FirstStep";
import CareerCreate_StepTwo from "@/components/career-created/TwoStep";


const CareerCreate = () => {
    //---> TODO Extraer listado de un back externo o mock   <---
    //TODO terminar logica para cambio de fragment/vista    <---
   const [step, setStep] = useState(1);
    const handleButtonNext=()=>{
        console.log("Next")
        setStep((prev) => prev + 1);
    }
    return (
        <div className="flex items-center justify-center p-4">
            <div
                className={`max-w-lg w-full p-6 rounded-lg  shadow-md transition-all`}>
                {step === 1 && (<CareerCreate_StepOne/>)}
                {step === 2 && (<CareerCreate_StepTwo/>)}

                <div className="flex flex-col items-center">
                    <label
                        onClick={handleButtonNext}
                        className="cursor-pointer bg-indigo-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-600 transition-colors mt-10 text-center ">
                        Siguente
                    </label>

                </div>
            </div>
        </div>
    );
}
export default CareerCreate;

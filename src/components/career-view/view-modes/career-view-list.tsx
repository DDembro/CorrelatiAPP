"use client";

import { CareerData } from "@/types/career-view-types";
import React from "react";

interface ListViewCareerProps {
    careerData: CareerData;
}

const ListViewCareer: React.FC<ListViewCareerProps> = ({ careerData }) => {
    return (
        <div className="bg-slate-300 w-full p-2 flex flex-col divide-y-2 dark:bg-slate-900 dark:text-gray-300 divide-gray-400">
            Titulo: {careerData.title} <br />
            La vista de Lista aun esta incompleta
        </div>
    );
};

export default ListViewCareer;

import { CareerData, SubjectStatus } from "@/types/career-view-types";
import "../../styles/edit-modal.css"
import { getAverageGrade, totalStatus } from "@/lib/subjectsUtils";


interface ReorderSubjectProps {
    careerData: CareerData;
    onClose: () => void;
}

const ViewCareerDataModal: React.FC<ReorderSubjectProps> = ({ careerData, onClose }) => {

    const totales = careerData.subjects.length;
    const aprobadas = totalStatus(careerData, SubjectStatus.Aprobado);
    const promocionadas = totalStatus(careerData, SubjectStatus.Promocionado);
    const terminadas = aprobadas + promocionadas;

    const porCientoCarrera = 100 * terminadas / totales;


    const options: Intl.DateTimeFormatOptions = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Datos de {careerData.title}</h2>
                <div className="modal-fields bg-gray-200 p-4 rounded-lg">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <p><strong>Autor:</strong></p>
                            <p><strong>Fecha Creación:</strong></p>
                            <p><strong>Modificado el:</strong></p>
                            <p><strong>Faltantes:</strong></p>
                            <p><strong>Regularizado:</strong></p>
                            <p><strong>Aprobado:</strong></p>
                            <p><strong>Promocionado:</strong></p>
                            <p><strong>Promedio:</strong></p>
                            <p><strong>% De la Carrera:</strong></p>
                        </div>
                        <div className="flex-1">
                            <p>{careerData.author}</p>
                            <p>{new Date(careerData.creationDate).toLocaleDateString('es-AR', options)}</p>
                            <p>{new Date(careerData.lastUpdateDate,).toLocaleDateString('es-AR', options)}</p>
                            <p>{totalStatus(careerData, SubjectStatus.NA)}</p>
                            <p>{totalStatus(careerData, SubjectStatus.Regularizado)}</p>
                            <p>{aprobadas}</p>
                            <p>{promocionadas}</p>
                            <p>{getAverageGrade(careerData)}</p>
                            <p>{porCientoCarrera.toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
                <div className="modal-actions">
                    <button
                        onClick={onClose}
                        className="modal-button modal-cancel-button"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewCareerDataModal;

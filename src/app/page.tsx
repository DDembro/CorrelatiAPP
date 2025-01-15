import Link from "next/link";

import "../styles/main-page.css"


export default function MainPage() {
  return (
    <div className="main-container">
      <div className="content-container">
        {/* Header */}
        <h1>
          Bienvenido a CorrelatiAPP<br />
          Tu Editor de Planes de Estudio<br />
          🎓
        </h1>

        {/* Description */}
        <p className="text-lg leading-relaxed">
          Organiza, personaliza y da seguimiento al plan de estudio de tu carrera.
          Este es tu espacio para gestionar todas tus materias y planificar tu futuro
        </p>

        {/* Features List */}
        <ul className="mt-6 space-y-3 list-disc list-inside text-gray-700">
          <li>
            <span className="font-semibold">Organiza</span> y sigue tu carrera paso a paso.
          </li>
          <li>
            <span className="font-semibold">Crea</span> planes de estudio personalizados adaptados a tus necesidades.
          </li>
        </ul>

        {/* CARDS */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-6">
          {/* Card 1 */}
          <div className="card-container">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Busca tu carrera entre las plantillas
            </h2>
            <p className="text-gray-600 mb-4">
              Descarga una de las plantillas vacías para empezar a gestionar tu carrera.
            </p>
            <Link
              href="/template"
              className="card-btn"
            >
              Plantillas
            </Link>
          </div>

          {/* Card 2 */}
          <div className="card-container">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Tutorial
            </h2>
            <p className="text-gray-600 mb-4">
              Guia de como utilizar la pagina.
            </p>
            <Link
              href="/career-view"
              className="card-btn"
            >
              TODO
            </Link>
          </div>

          {/* Card 3 */}
          <div className="card-container">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Visualiza y modifica tu carrera
            </h2>
            <p className="text-gray-600 mb-4">
              Gestiona y actualiza el estado de tus materias fácilmente.
            </p>
            <Link
              href="/career-view"
              className="card-btn"
            >
              Ver Carrera
            </Link>
          </div>

          {/* Card 4 */}
          <div className="card-container">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Dejar tu comentario
            </h2>
            <p className="text-gray-600 mb-4">
              Completa el siguiente formulario para dar tu opinion sobre la pagina.
            </p>
            <Link
              href="/career-view"
              className="card-btn"
            >
              TODO
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

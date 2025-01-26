import Link from "next/link";

import "../styles/main-page.css"


export default function MainPage() {
  return (
    <div className="main-container">
      <div className="content-container">
        {/* Header */}
        <h1>
          Bienvenido a CorrelatiAPP.<br />
          Tu editor de planes de estudio<br />
          🎓
        </h1>

        {/* Description */}
        <p className="text-lg leading-relaxed">
          Organiza, personaliza y da seguimiento al plan de estudio de tu carrera.
          Este es tu espacio para gestionar todas tus materias y planificar tu futuro
        </p>

        {/* Features List */}
        <ul className="mt-6 space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>
            <span className="font-semibold">Organiza</span> y sigue tu carrera paso a paso
          </li>
          <li>
            <span className="font-semibold">Crea</span> planes de estudio personalizados adaptados a tus necesidades
          </li>
        </ul>

        {/* CARDS */}
        <div className="card-container">
          {/* Card 1 */}
          <div className="card">
            <h2 className="text-lg font-bold text-gray-800 mb-4 dark:text-gray-200">
              Tutorial
            </h2>
            <p className="text-gray-600 mb-4 dark:text-gray-300">
              Descarga la plantilla Tutorial para aprender las nociones básicas de la app.
            </p>
            <Link
              href="/template"
              className="card-btn"
            >
              Ver en Plantillas
            </Link>
          </div>

          {/* Card 2 */}
          <div className="card">
            <h2 className="text-lg font-bold text-gray-800 mb-4 dark:text-gray-200">
              Dejar tu comentario
            </h2>
            <p className="text-gray-600 mb-4 dark:text-gray-300">
              Completa el siguiente formulario para dar tu opinión sobre la página.
            </p>
            <a
              href="https://forms.gle/Hve3WEhUxm81Cqr59"
              target="_blank"
              className="card-btn"
            >
              Ir al Formulario
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

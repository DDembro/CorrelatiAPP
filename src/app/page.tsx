import Link from "next/link";

export default function MainPage() {
  return (
    <div className="p-6 flex flex-col items-center justify-center text-gray-800">
      <div className="bg-slate-50 rounded-lg w-3/4 shadow-lg p-6 text-center">
        {/* Header */}
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
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
          <div className="bg-indigo-50 shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Busca tu carrera entre las plantillas
            </h2>
            <p className="text-gray-600 mb-4">
              Descarga una de las plantillas vacías para empezar a gestionar tu carrera.
            </p>
            <Link
              href="/template"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
            >
              Plantillas
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-indigo-50 shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Visualiza y modifica tu carrera
            </h2>
            <p className="text-gray-600 mb-4">
              Gestiona y actualiza el estado de tus materias fácilmente.
            </p>
            <Link
              href="/career-view"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
            >
              Ver Carrera
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

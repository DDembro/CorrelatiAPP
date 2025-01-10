import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4 text-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center relative">
                {/* Logo / Title (izquierda) */}
                <div className="absolute left-0">
                    <Link href="/" className="text-2xl font-extrabold tracking-tight hover:text-indigo-200 transition-colors">
                        CorrelatiAPP
                    </Link>
                </div>

                {/* Navigation Links (centrado) */}
                <div className="mx-auto flex space-x-4">
                    <Link
                        href="/"
                        className="px-3 py-2 rounded-md text-white hover:bg-indigo-600 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/career-view"
                        className="px-3 py-2 rounded-md text-white hover:bg-indigo-600 transition-colors"
                    >
                        Ver Mi Carrera
                    </Link>
                    <Link
                        href="/template"
                        className="px-3 py-2 rounded-md text-white hover:bg-indigo-600 transition-colors"
                    >
                        Plantillas
                    </Link>
                    <Link
                        href="/about"
                        className="px-3 py-2 rounded-md text-white hover:bg-indigo-600 transition-colors"
                    >
                        Sobre La App
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;

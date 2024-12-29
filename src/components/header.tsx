import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 px-6 py-3 text-white sticky top-0">
            <div className="text-2xl font-bold">
                <Link href="/">
                    App Correlatividades
                </Link>
            </div>

            <div className="flex divide-x-2 divide-gray-400">
                <Link href="/home" className="px-3">Home</Link>
                <Link href="/calendar" className="px-3">Calendario</Link>
                <Link href="/about" className="px-3">Sobre La App</Link>
            </div>

            <div>
                <Link href="/login">
                    <button className="bg-blue-500 px-3 py-2 mx-1 border rounded hover:bg-blue-600 active:bg-blue-700">
                        Login
                    </button>
                </Link>
            </div>
        </nav>
    )
}

export default Header
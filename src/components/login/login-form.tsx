import Link from 'next/link'
import React from 'react'

const LoginForm = () => {
    return (
        <div className="bg-slate-500 p-6 text-white items-center flex flex-col w-96 rounded-2xl mt-10">
            <div className="my-4">
                <p>Iniciar Sesión</p>
            </div>
            <div className="my-4">
                <p>Nombre de Usuario</p>
                <input type="text" className="text-black" />

                <p>Contraseña</p>
                <input type="password" className="text-black" />
            </div>
            <div className="my-4">
                <button className="bg-blue-500 px-3 py-2 border rounded hover:bg-blue-600 active:bg-blue-700">
                    Confirmar
                </button>
            </div>

            <div className="my-4">
                No tienes cuenta? Click <Link href="/signup"><strong>Aqui</strong></Link>
            </div>
        </div>
    )
}

export default LoginForm
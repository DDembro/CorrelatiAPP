import React from 'react'

const SignUpForm = () => {
    return (
        <div className="bg-slate-500 p-6 text-white items-center flex flex-col w-96 rounded-2xl mt-10">
            <div className="my-4">
                <p>Registrarse</p>
            </div>
            <div className="my-4">
                <p>Correo</p>
                <input type="mail" className="text-black"/>

                <p>Nombre de Usuario</p>
                <input type="text" className="text-black"/>

                <p>Contraseña</p>
                <input type="password" className="text-black"/>

                <p>Repita Contraseña</p>
                <input type="password" className="text-black"/>
            </div>
            <div className="my-4">
                <button className="bg-blue-500 px-3 py-2 border rounded hover:bg-blue-600 active:bg-blue-700">
                    Confirmar
                </button>
            </div>
        </div>
    )
}

export default SignUpForm
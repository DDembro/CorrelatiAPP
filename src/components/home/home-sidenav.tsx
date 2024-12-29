"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HomeSideNav = () => {
    return (
        <div className="flex flex-col bg-gray-300 p-3 min-w-80 h-full">
            <NavLinks />
        </div>
    )
}

export default HomeSideNav


const NavLinks = () => {
    const links = [
        {
            name: "Inicio",
            href: "/home",
        },
        {
            name: "Mis Carreras",
            href: "/home/my-carrers",
        },
        {
            name: "Planes Prediseñados",
            href: "/home/templates",
        },
        {
            name: "Galeria Online",
            href: "/home/gallery",
        },
    ]
    const pathName = usePathname()
    return (
        <ul className="p-2">
            {links.map((link) => {
                return (
                    <Link href={link.href}>
                        <li
                            className={`px-2 py-3 m-2 rounded
                                        ${pathName == link.href ? 'bg-slate-500' : 'hover:bg-slate-400'}`
                            }>
                            {link.name}
                        </li>
                    </Link>
                )
            })}
        </ul>
    )
}
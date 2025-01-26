import Link from "next/link";
import React from "react";
import "../../styles/header.css";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo / Title (izquierda) */}
                <div className="navbar-logo-div">
                    <Link href="/" className="navbar-logo">
                        CorrelatiAPP
                    </Link>
                </div>

                {/* Navigation Links (centrado) */}
                <div className="navbar-links">
                    <Link href="/" className="navbar-link">
                        Home
                    </Link>
                    <Link href="/career-view" className="navbar-link">
                        Ver Mi Carrera
                    </Link>
                    <Link href="/template" className="navbar-link">
                        Plantillas
                    </Link>
                    <Link href="/about" className="navbar-link">
                        Sobre La App
                    </Link>
                    <ThemeSwitch />
                </div>
            </div>
        </nav>
    );
};

export default Header;

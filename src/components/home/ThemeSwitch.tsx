"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GoSun, GoMoon } from "react-icons/go";

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted)
        return (
            <button>
                <GoSun />
            </button>
        );

    if (resolvedTheme === "dark")
        return (
            <button
                onClick={() => {
                    setTheme("light");
                }}
            >
                <GoSun />
            </button>
        );
    else
        return (
            <button
                onClick={() => {
                    setTheme("dark");
                }}
            >
                <GoMoon />
            </button>
        );
};

export default ThemeSwitch;

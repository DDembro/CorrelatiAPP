import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
    safelist: [
        {
            pattern: /bg-(red|green|blue|amber|yellow|pink|violet|teal|emerald)-(300|400|500|600|700|800|900)/,
        },
        "border-8",
        "border-amber-700",
        "border-emerald-900",
        "dark:border-amber-300",
        "dark:border-emerald-300",
        "border-black",
    ],
    darkMode: "class",
} satisfies Config;

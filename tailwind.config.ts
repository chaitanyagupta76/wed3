import type { Config } from "tailwindcss";

const config: Config = {
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
                ivory: "#fdfbf7",
                gold: "#d4af37",
                goldLight: "#dfb163",
                rose: "#e9c4c1",
                peach: "#fceee9",
                champagne: "#f7e7ce",
                textDark: "#4a4a4a",
                textLight: "#8b8b8b",
            },
            fontFamily: {
                script: ["var(--font-playball)", "cursive"],
                sans: ["var(--font-inter)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                primary: "#ff8800",
                text_primary: "#41464c",
            },
            screens: {
                sm: "640px",
                // => @media (min-width: 640px) { ... }
                md: "768px",
                // => @media (min-width: 768px) { ... }
                lg: "1024px",
                // => @media (min-width: 1024px) { ... }
                xl: "1280px",
                // => @media (min-width: 1280px) { ... }
                xxl: "1536px",
                // => @media (min-width: 1536px) { ... }
            },
            keyframes: {
                frameSlideDown: {
                    "0%": { transform: "translateY(-30px)", opacity: 0 },
                    "100%": { transform: "translateY(0px)", opacity: 1 },
                },
            },
            animation: {
                fadeSlideDown: "frameSlideDown 0.2s linear",
            },
        },
    },
};

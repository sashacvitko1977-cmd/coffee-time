import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1E1E1E",
        milk: "#F5F1EB",
        coffee: "#C49A6C",
        bean: "#8B5E3C",
        gold: "#D4A017",
        amber: "#E8954A",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        soft: "1.25rem",
        pill: "1.5rem",
      },
      boxShadow: {
        card: "0 18px 50px rgba(30, 30, 30, 0.08)",
        cardDark: "0 18px 50px rgba(0, 0, 0, 0.35)",
      },
      maxWidth: {
        site: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;

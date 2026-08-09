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
        neural: {
          bg: "#030014",
          surface: "#0f0f23",
          card: "#1a1a2e",
          border: "#16213e",
          cyan: "#00d4ff",
          purple: "#7c3aed",
          pink: "#f472b6",
          green: "#34d399",
          amber: "#fbbf24",
        }
      },
    },
  },
  plugins: [],
};
export default config;

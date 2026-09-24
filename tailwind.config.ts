import type { Config } from "tailwindcss";

/**
 * Paleta Meraki — un mismo "hilo de cobre" atraviesa los tres capítulos:
 *  - tinta   → el oficio (peluquería / barbería): oscuro, cálido, firme
 *  - ciruela → la pausa (terapias): violeta profundo, luz suave
 *  - hueso / arena → la piedra (bijou): tierra clara, artesanal
 *  - cobre   → el hilo conductor: aparece en los tres
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hueso: "#F5EFE6",
        arena: { DEFAULT: "#E9DDCB", oscura: "#D6C4AA" },
        tinta: { DEFAULT: "#1B1411", suave: "#2A201B", borde: "#3B2E27" },
        cobre: { DEFAULT: "#B8693F", claro: "#E0A77C", oscuro: "#8A4A2A" },
        ciruela: { DEFAULT: "#2A2134", profunda: "#1F1827", borde: "#43375A" },
        lavanda: { DEFAULT: "#B3A5D6", niebla: "#ECE6F5" },
        salvia: { DEFAULT: "#6F7F62", clara: "#C9D2BD" },
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      keyframes: {
        respirar: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.55" },
          "50%": { transform: "scale(1.08)", opacity: "0.85" },
        },
        ondas: {
          "0%": { transform: "scale(0.6)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        respirar: "respirar 7s ease-in-out infinite",
        ondas: "ondas 4.5s ease-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

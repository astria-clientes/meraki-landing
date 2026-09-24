import type { Config } from "tailwindcss";

/**
 * Paleta "Taller de barrio" — tomada directo de las fotos del local:
 * paredes blanco cálido, muebles de madera miel, plantas, y el dorado
 * de los adornos de geometría sagrada (flor de la vida, sri yantra).
 *  - crema   → paredes del salón
 *  - cobre   → madera miel de los muebles / el hilo que conecta todo
 *  - tinta   → cartel de barbería, fondo de noche del local
 *  - salvia  → las plantas, en todos lados
 *  - dorado  → los adornos de geometría sagrada, el rincón de terapias
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        crema: "#F7F3EC",
        arena: { DEFAULT: "#EFE3CB", oscura: "#DCC48F" },
        tinta: { DEFAULT: "#221912", suave: "#2E2117", borde: "#3E2C1C" },
        cobre: { DEFAULT: "#B8823D", claro: "#D9A855", oscuro: "#8A5F26" },
        dorado: { DEFAULT: "#C9A227", claro: "#E6C55C", oscuro: "#8F6F16" },
        salvia: { DEFAULT: "#7C9070", clara: "#C7D3BC" },
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-public-sans)", "system-ui", "sans-serif"],
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
        // Zoom lentísimo y continuo para que las fotos "respiren" en vez de
        // quedar pegadas y estáticas contra el fondo.
        kenburns: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
      },
      animation: {
        respirar: "respirar 7s ease-in-out infinite",
        ondas: "ondas 4.5s ease-out infinite",
        kenburns: "kenburns 24s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

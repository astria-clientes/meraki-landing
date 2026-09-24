import type { Metadata, Viewport } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import "./globals.css";

// Fraunces: serif cálida con eje "soft" — encaja con la madera del local.
// Sus itálicas se sienten escritas a mano, no impresas.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
});

// Public Sans: humana y simple para el texto de cuerpo, sin el aire
// "corporativo" de Inter/Poppins.
const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: ["400", "500", "600", "700"],
});

const titulo = "Meraki — Peluquería, terapias y piedras en Plottier";
const descripcion =
  "Barbería y peluquería unisex, Reiki y armonización sonora, y bijou artesanal con piedras semipreciosas. Un mismo espacio en Plottier, Neuquén.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  openGraph: { title: titulo, description: descripcion, locale: "es_AR", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#F7F3EC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${fraunces.variable} ${publicSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

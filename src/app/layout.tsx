import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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
  themeColor: "#F5EFE6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import NavegacionCapitulos from "@/components/NavegacionCapitulos";
import Peluqueria from "@/components/Peluqueria";

export const metadata: Metadata = {
  title: "Peluquería & barbería — Meraki",
  description: "Capítulo 01 · El oficio. Barbería y peluquería unisex con Diego y Ayelen, en Plottier.",
};

export default function PeluqueriaPage() {
  return (
    <main>
      <Peluqueria />
      <NavegacionCapitulos
        anterior={{ href: "/", nombre: "Inicio" }}
        siguiente={{ href: "/terapias", numero: "02", nombre: "La pausa" }}
      />
    </main>
  );
}

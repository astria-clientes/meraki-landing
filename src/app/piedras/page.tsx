import type { Metadata } from "next";
import NavegacionCapitulos from "@/components/NavegacionCapitulos";
import Piedras from "@/components/Piedras";

export const metadata: Metadata = {
  title: "Piedras & bijou — Meraki",
  description:
    "Capítulo 03 · La piedra. Catálogo de bijou con piedras semipreciosas y la colección educativa de más de 70 minerales de Diego.",
};

export default function PiedrasPage() {
  return (
    <main>
      <Piedras />
      <NavegacionCapitulos
        anterior={{ href: "/terapias", numero: "02", nombre: "La pausa" }}
        siguiente={{ href: "/visitanos", nombre: "Visitanos" }}
      />
    </main>
  );
}

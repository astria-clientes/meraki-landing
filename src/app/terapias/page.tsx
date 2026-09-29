import type { Metadata } from "next";
import NavegacionCapitulos from "@/components/NavegacionCapitulos";
import Terapias from "@/components/Terapias";

export const metadata: Metadata = {
  title: "Terapias alternativas — Meraki",
  description: "Capítulo 02 · La pausa. Reiki y armonización sonora con Diego Campos, en el mismo espacio de Meraki.",
};

export default function TerapiasPage() {
  return (
    <main>
      <Terapias />
      <NavegacionCapitulos
        anterior={{ href: "/peluqueria", numero: "01", nombre: "El oficio" }}
        siguiente={{ href: "/piedras", numero: "03", nombre: "La piedra" }}
      />
    </main>
  );
}

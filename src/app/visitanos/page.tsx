import type { Metadata } from "next";
import NavegacionCapitulos from "@/components/NavegacionCapitulos";
import Visitanos from "@/components/Visitanos";

export const metadata: Metadata = {
  title: "Visitanos — Meraki",
  description: "Dirección, horarios y contacto de Meraki en Plottier, Neuquén.",
};

export default function VisitanosPage() {
  return (
    <main>
      <Visitanos />
      <NavegacionCapitulos anterior={{ href: "/piedras", numero: "03", nombre: "La piedra" }} />
    </main>
  );
}

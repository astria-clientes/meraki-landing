"use client";

import { useEffect, useState } from "react";
import ContactoForm from "@/components/admin/ContactoForm";
import MarcaForm from "@/components/admin/MarcaForm";
import PeluqueriaForm from "@/components/admin/PeluqueriaForm";
import ProductosForm from "@/components/admin/ProductosForm";
import TerapiasForm from "@/components/admin/TerapiasForm";
import { cerrarSesion, getToken } from "@/lib/github";

const SECCIONES = [
  { id: "contacto", label: "Contacto", Componente: ContactoForm },
  { id: "logos", label: "Logos", Componente: MarcaForm },
  { id: "peluqueria", label: "Peluquería & barbería", Componente: PeluqueriaForm },
  { id: "terapias", label: "Terapias alternativas", Componente: TerapiasForm },
  { id: "productos", label: "Bijou & piedras", Componente: ProductosForm },
] as const;

export default function Admin() {
  const [logueado, setLogueado] = useState<boolean | null>(null);
  const [seccion, setSeccion] = useState<(typeof SECCIONES)[number]["id"]>("contacto");

  useEffect(() => {
    setLogueado(!!getToken());
  }, []);

  if (logueado === null) return null;

  if (!logueado) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-crema px-4">
        <div className="max-w-sm text-center">
          <h1 className="font-display text-3xl text-tinta">Panel de Meraki</h1>
          <p className="mt-3 text-tinta/60">Entrá con la cuenta de GitHub que tiene acceso al repo.</p>
          <a
            href="/auth"
            className="mt-6 inline-block rounded-full bg-tinta px-6 py-3 font-semibold text-crema hover:bg-cobre-oscuro"
          >
            Iniciar sesión con GitHub
          </a>
        </div>
      </div>
    );
  }

  const { Componente } = SECCIONES.find((s) => s.id === seccion) ?? SECCIONES[0];

  return (
    <div className="min-h-screen bg-crema">
      <header className="border-b border-tinta/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="font-display text-xl text-tinta">Panel de Meraki</span>
          <button
            type="button"
            onClick={() => {
              cerrarSesion();
              setLogueado(false);
            }}
            className="text-sm font-semibold text-tinta/50 hover:text-tinta"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row">
        <nav className="flex shrink-0 flex-row gap-1 overflow-x-auto md:w-56 md:flex-col md:overflow-visible">
          {SECCIONES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSeccion(s.id)}
              className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
                seccion === s.id ? "bg-tinta text-crema" : "text-tinta/70 hover:bg-tinta/10"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <main className="flex-1">
          <Componente />
        </main>
      </div>
    </div>
  );
}

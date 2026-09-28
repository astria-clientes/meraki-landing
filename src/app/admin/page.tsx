"use client";

import { useEffect, useState } from "react";
import ContactoForm from "@/components/admin/ContactoForm";
import MarcaForm from "@/components/admin/MarcaForm";
import PeluqueriaForm from "@/components/admin/PeluqueriaForm";
import ProductosForm from "@/components/admin/ProductosForm";
import TerapiasForm from "@/components/admin/TerapiasForm";
import TextosForm from "@/components/admin/TextosForm";
import { cerrarSesion, getToken } from "@/lib/github";

const SECCIONES = [
  { id: "productos", label: "Catálogo", Componente: ProductosForm },
  { id: "textos", label: "Textos", Componente: TextosForm },
  { id: "peluqueria", label: "Peluquería", Componente: PeluqueriaForm },
  { id: "terapias", label: "Terapias", Componente: TerapiasForm },
  { id: "contacto", label: "Contacto", Componente: ContactoForm },
  { id: "logos", label: "Logos", Componente: MarcaForm },
] as const;

export default function Admin() {
  const [logueado, setLogueado] = useState<boolean | null>(null);
  const [seccion, setSeccion] = useState<(typeof SECCIONES)[number]["id"]>("productos");

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
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 md:px-6">
          <span className="font-display text-xl text-tinta">Meraki · Admin</span>
          <nav className="order-3 flex w-full flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium md:order-none md:w-auto">
            {SECCIONES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSeccion(s.id)}
                className={`shrink-0 transition-colors ${
                  seccion === s.id ? "font-semibold text-tinta" : "text-tinta/50 hover:text-tinta"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              cerrarSesion();
              setLogueado(false);
            }}
            className="shrink-0 text-sm font-semibold text-tinta/40 hover:text-tinta"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <Componente />
      </main>
    </div>
  );
}

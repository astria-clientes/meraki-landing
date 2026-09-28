"use client";

import { useEffect, useState } from "react";
import ContactoForm from "@/components/admin/ContactoForm";
import MarcaForm from "@/components/admin/MarcaForm";
import PeluqueriaForm from "@/components/admin/PeluqueriaForm";
import ProductosForm from "@/components/admin/ProductosForm";
import TerapiasForm from "@/components/admin/TerapiasForm";
import TextosForm from "@/components/admin/TextosForm";
import { cerrarSesion, haySesion, iniciarSesion } from "@/lib/github";

const SECCIONES = [
  { id: "productos", label: "Catálogo", Componente: ProductosForm },
  { id: "textos", label: "Textos", Componente: TextosForm },
  { id: "peluqueria", label: "Peluquería", Componente: PeluqueriaForm },
  { id: "terapias", label: "Terapias", Componente: TerapiasForm },
  { id: "contacto", label: "Contacto", Componente: ContactoForm },
  { id: "logos", label: "Logos", Componente: MarcaForm },
] as const;

function Login({ onIngreso }: { onIngreso: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);
    setError(null);
    try {
      await iniciarSesion(email, password);
      onIngreso();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-crema px-4">
      <form onSubmit={enviar} className="w-full max-w-sm">
        <h1 className="text-center font-display text-3xl text-tinta">Meraki · Admin</h1>
        <p className="mt-2 text-center text-sm text-tinta/60">Entrá con tu email y contraseña.</p>

        <div className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-tinta/80">Email</span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-tinta/15 bg-white px-3 py-2.5 text-[15px] text-tinta outline-none focus:border-cobre"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-tinta/80">Contraseña</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-tinta/15 bg-white px-3 py-2.5 text-[15px] text-tinta outline-none focus:border-cobre"
            />
          </label>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={cargando}
          className="mt-6 w-full rounded-full bg-tinta px-6 py-3 font-semibold text-crema transition-colors hover:bg-cobre-oscuro disabled:opacity-50"
        >
          {cargando ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default function Admin() {
  const [logueado, setLogueado] = useState<boolean | null>(null);
  const [seccion, setSeccion] = useState<(typeof SECCIONES)[number]["id"]>("productos");

  useEffect(() => {
    haySesion().then(setLogueado);
  }, []);

  if (logueado === null) return null;

  if (!logueado) {
    return <Login onIngreso={() => setLogueado(true)} />;
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

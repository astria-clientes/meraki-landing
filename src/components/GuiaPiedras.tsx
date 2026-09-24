"use client";

import { useState } from "react";
import { contacto } from "@/config/contacto";
import { piedras } from "@/data/piedras";
import { conNombre, waLink } from "@/lib/whatsapp";
import Gema from "./Gema";
import { IconoWhatsApp } from "./Iconos";

type Filtro = "todas" | "local" | "info";

const opciones: { id: Filtro; texto: string }[] = [
  { id: "todas", texto: "Todas" },
  { id: "local", texto: "En el local" },
  { id: "info", texto: "Info general" },
];

// Primero las que están en el local, después el resto (orden alfabético dentro de cada grupo).
const ordenadas = [...piedras].sort(
  (a, b) => Number(b.enCatalogo) - Number(a.enCatalogo) || a.nombre.localeCompare(b.nombre, "es")
);

export default function GuiaPiedras() {
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const lista = ordenadas.filter((p) =>
    filtro === "todas" ? true : filtro === "local" ? p.enCatalogo : !p.enCatalogo
  );
  const cantidadLocal = piedras.filter((p) => p.enCatalogo).length;

  return (
    <div>
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        {/* Leyenda: cómo distinguir disponible vs. informativo */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-tinta/75">
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-cobre" /> En el local ({cantidadLocal})
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-dashed border-tinta/50" /> Info general, para conocer
          </span>
        </div>
        <div className="inline-flex self-start rounded-full bg-white/60 p-1" role="group" aria-label="Filtrar piedras">
          {opciones.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setFiltro(o.id)}
              aria-pressed={filtro === o.id}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                filtro === o.id ? "bg-tinta text-hueso" : "text-tinta/65 hover:text-tinta"
              }`}
            >
              {o.texto}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lista.map((p) => (
          <li
            key={p.id}
            className={`relative flex flex-col rounded-3xl p-5 md:p-6 ${
              p.enCatalogo
                ? "bg-white shadow-[0_20px_50px_-30px_rgba(138,74,42,.55)] ring-1 ring-cobre/40"
                : "border border-dashed border-tinta/25 bg-transparent"
            }`}
          >
            <div className="flex items-start gap-4">
              <Gema id={p.id} colores={p.colores} apagada={!p.enCatalogo} className="h-14 w-14 shrink-0" />
              <div className="min-w-0 flex-1">
                <span
                  className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
                    p.enCatalogo ? "bg-cobre text-hueso" : "border border-tinta/20 text-tinta/55"
                  }`}
                >
                  {p.enCatalogo ? "En el local" : "Info general"}
                </span>
                <h4 className="mt-2 font-display text-2xl leading-tight text-tinta">{p.nombre}</h4>
                <p className="text-sm font-semibold text-cobre-oscuro">{p.intencion}</p>
              </div>
            </div>

            <p className={`mt-4 flex-1 text-[15px] leading-relaxed ${p.enCatalogo ? "text-tinta/80" : "text-tinta/65"}`}>
              {p.descripcion}
            </p>

            <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-tinta/10 pt-4 text-xs">
              <div>
                <dt className="text-tinta/45">Familia</dt>
                <dd className="mt-0.5 font-semibold text-tinta/80">{p.familia}</dd>
              </div>
              <div>
                <dt className="text-tinta/45">Dureza</dt>
                <dd className="mt-0.5 font-semibold text-tinta/80">{p.dureza}</dd>
              </div>
              <div>
                <dt className="text-tinta/45">Chakra</dt>
                <dd className="mt-0.5 font-semibold text-tinta/80">{p.chakra}</dd>
              </div>
            </dl>

            {p.enCatalogo && (
              <a
                href={waLink(conNombre(contacto.mensajesWhatsApp.piedra, p.nombre))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-tinta px-4 py-2.5 text-sm font-semibold text-hueso transition-colors hover:bg-cobre-oscuro"
              >
                <IconoWhatsApp className="h-4 w-4" /> Consultar disponibilidad
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

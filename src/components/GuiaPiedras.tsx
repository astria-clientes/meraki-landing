"use client";

import { useMemo, useState } from "react";
import { contacto } from "@/config/contacto";
import { coloresChakra, filtrosChakra, piedras, type Piedra } from "@/data/piedras";
import { conNombre, waLink } from "@/lib/whatsapp";
import Gema from "./Gema";
import { IconoWhatsApp } from "./Iconos";

const PASO = 12;

function Tarjeta({ p }: { p: Piedra }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <li className="flex flex-col rounded-3xl bg-white p-5 shadow-[0_20px_50px_-32px_rgba(34,25,18,.5)] ring-1 ring-tinta/5 md:p-6">
      <div className="flex items-start gap-4">
        <Gema id={p.id} color={p.color} className="h-14 w-14 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-tinta/45">{p.tipo}</p>
          <h4 className="mt-0.5 font-display text-2xl leading-tight text-tinta">{p.nombre}</h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {p.chakras.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 rounded-full border border-tinta/10 px-2 py-0.5 text-[11px] font-medium text-tinta/70"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: coloresChakra[c] ?? p.color }} />
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-tinta/80">{p.energetica}</p>

      {abierta && (
        <div className="mt-4 space-y-3 border-t border-tinta/10 pt-4 text-[15px] leading-relaxed text-tinta/75">
          <p>
            <span className="font-semibold text-tinta">Emocional. </span>
            {p.emocional}
          </p>
          <p>
            <span className="font-semibold text-tinta">Espiritual. </span>
            {p.espiritual}
          </p>
          <p>
            <span className="font-semibold text-tinta">En una sesión con Diego. </span>
            {p.armonizacion}
          </p>
          <p className="text-tinta/70">{p.descripcion}</p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setAbierta((v) => !v)}
          className="text-sm font-semibold text-cobre-oscuro hover:underline"
        >
          {abierta ? "Leer menos" : "Leer más"}
        </button>
        <a
          href={waLink(conNombre(contacto.mensajesWhatsApp.piedra, p.nombre))}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-tinta px-3.5 py-2 text-[13px] font-semibold text-crema transition-colors hover:bg-cobre-oscuro"
        >
          <IconoWhatsApp className="h-4 w-4" /> Consultar
        </a>
      </div>
    </li>
  );
}

export default function GuiaPiedras() {
  const [chakra, setChakra] = useState<string>("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [visibles, setVisibles] = useState(PASO);

  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return piedras.filter((p) => {
      const pasaChakra = chakra === "Todos" || p.chakras.includes(chakra);
      const pasaBusqueda = !q || p.nombre.toLowerCase().includes(q) || p.tipo.toLowerCase().includes(q);
      return pasaChakra && pasaBusqueda;
    });
  }, [chakra, busqueda]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="sin-scrollbar flex gap-2 overflow-x-auto" role="group" aria-label="Filtrar por chakra">
          {["Todos", ...filtrosChakra].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setChakra(c);
                setVisibles(PASO);
              }}
              aria-pressed={chakra === c}
              className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                chakra === c ? "bg-tinta text-crema" : "bg-white/70 text-tinta/70 hover:bg-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setVisibles(PASO);
          }}
          placeholder="Buscar piedra o mineral…"
          aria-label="Buscar piedra"
          className="rounded-full bg-white/70 px-4 py-2 text-sm text-tinta placeholder:text-tinta/40 outline-none ring-1 ring-tinta/10 focus:ring-cobre md:w-64"
        />
      </div>

      <p className="mt-4 text-sm text-tinta/50">
        {filtradas.length} piedra{filtradas.length === 1 ? "" : "s"}
        {chakra !== "Todos" ? ` · chakra ${chakra}` : ""}
      </p>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtradas.slice(0, visibles).map((p) => (
          <Tarjeta key={p.id} p={p} />
        ))}
      </ul>

      {filtradas.length === 0 && (
        <p className="mt-8 rounded-2xl border border-dashed border-tinta/20 p-6 text-center text-tinta/60">
          No encontramos ninguna piedra con ese filtro. Probá con otra palabra o chakra.
        </p>
      )}

      {visibles < filtradas.length && (
        <button
          type="button"
          onClick={() => setVisibles((v) => v + PASO)}
          className="mx-auto mt-8 block rounded-full border border-tinta/20 px-6 py-2.5 text-sm font-semibold text-tinta transition-colors hover:border-cobre hover:text-cobre-oscuro"
        >
          Mostrar más piedras ({filtradas.length - visibles})
        </button>
      )}
    </div>
  );
}

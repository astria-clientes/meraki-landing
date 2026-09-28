"use client";

import { useState } from "react";
import { contacto } from "@/config/contacto";
import { categorias, productos, type Categoria } from "@/data/productos";
import { conNombre, waLink } from "@/lib/whatsapp";
import { IconoWhatsApp } from "./Iconos";
import { Foto } from "./Medios";

function Chip({ activo, onClick, children }: { activo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-colors ${
        activo ? "bg-crema text-tinta" : "bg-crema/10 text-crema/75 ring-1 ring-crema/15 hover:bg-crema/20"
      }`}
    >
      {children}
    </button>
  );
}

export default function Catalogo() {
  const [filtro, setFiltro] = useState<Categoria | "todo">("todo");
  const lista = filtro === "todo" ? productos : productos.filter((p) => p.categoria === filtro);

  return (
    <div>
      <div className="sin-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0" role="group" aria-label="Filtrar catálogo">
        <Chip activo={filtro === "todo"} onClick={() => setFiltro("todo")}>
          Todo
        </Chip>
        {categorias.map((c) => (
          <Chip key={c.id} activo={filtro === c.id} onClick={() => setFiltro(c.id)}>
            {c.nombre}
          </Chip>
        ))}
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {lista.map((p) => (
          <li
            key={p.id}
            className="group flex flex-col overflow-hidden rounded-3xl bg-crema/10 ring-1 ring-crema/15 backdrop-blur-md"
          >
            <Foto
              src={p.imagen}
              alt={p.nombre}
              ayuda="/public/productos"
              className="aspect-square bg-tinta/40 text-crema/40"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
            <div className="flex flex-1 flex-col p-3.5 md:p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-dorado-claro">
                {categorias.find((c) => c.id === p.categoria)?.nombre}
                {p.piedra && <span className="text-crema/45"> · {p.piedra}</span>}
              </p>
              <h4 className="mt-1.5 flex-1 font-display text-[17px] leading-snug text-crema md:text-lg">{p.nombre}</h4>
              <a
                href={waLink(conNombre(contacto.mensajesWhatsApp.producto, p.nombre))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-crema/10 px-3 py-1.5 text-[13px] font-semibold text-dorado-claro ring-1 ring-crema/15 transition-colors hover:bg-cobre hover:text-crema hover:ring-cobre"
              >
                <IconoWhatsApp className="h-4 w-4" /> Consultar
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

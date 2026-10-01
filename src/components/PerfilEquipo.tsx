"use client";

/* ==========================================================================
 *  Perfil de cada profesional, como una ficha: adelante la foto, el nombre
 *  y la especialidad; con el "+" (o tocando la tarjeta) gira y muestra del
 *  otro lado todo lo que esa persona hace — sin ocupar media pantalla como
 *  antes. Usa FlipCard (React Bits, adaptada en ./FlipCard).
 * ========================================================================== */

import { useState } from "react";
import { contacto } from "@/config/contacto";
import type { Profesional } from "@/data/peluqueria";
import BotonWhatsApp from "./BotonWhatsApp";
import FlipCard from "./FlipCard";
import { IconoCerrar, IconoMas, IconoTijera } from "./Iconos";
import { Foto } from "./Medios";

export default function PerfilEquipo({ p }: { p: Profesional }) {
  const [vuelta, setVuelta] = useState(false);

  return (
    <FlipCard
      flipped={vuelta}
      onFlipChange={setVuelta}
      aspectRatio={0.62}
      radius={28}
      background="#2E2117"
      color="#F7F3EC"
      ariaLabel={vuelta ? `Cerrar perfil de ${p.nombre}` : `Ver todo lo que hace ${p.nombre}`}
      front={
        <div className="group relative h-full w-full">
          <Foto
            src={p.foto}
            alt={`Puesto de trabajo de ${p.nombre}`}
            ayuda="Foto pendiente · /public/fotos/equipo"
            className="h-full w-full"
            sizes="(min-width: 768px) 25vw, 45vw"
            posicion="center 15%"
            viva={false}
            degradado={false}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tinta/90 via-tinta/10 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cobre-claro">
              <IconoTijera className="h-3.5 w-3.5" /> {p.especialidad}
            </p>
            <h3 className="mt-1.5 font-display text-xl leading-tight text-crema md:text-2xl">{p.nombre}</h3>
          </div>
          <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-crema/40 bg-tinta/50 text-crema backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 md:right-5 md:top-5">
            <IconoMas className="h-4 w-4" />
          </span>
        </div>
      }
      back={
        <div className="sin-scrollbar flex h-full w-full flex-col overflow-y-auto p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cobre-claro">
                <IconoTijera className="h-3.5 w-3.5" /> {p.especialidad}
              </p>
              <h3 className="mt-1.5 font-display text-xl leading-tight text-crema md:text-2xl">{p.nombre}</h3>
            </div>
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-crema/30 text-crema/80"
            >
              <IconoCerrar className="h-3.5 w-3.5" />
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-crema/80">{p.descripcion}</p>

          {p.frase && <p className="mt-3 font-display text-base italic text-cobre-claro">&ldquo;{p.frase}&rdquo;</p>}

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {p.servicios.map((s) => (
              <li key={s} className="rounded-full border border-crema/15 px-2.5 py-1 text-xs text-crema/85">
                {s}
              </li>
            ))}
          </ul>

          <div
            className="mt-4"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <BotonWhatsApp mensaje={contacto.mensajesWhatsApp[p.mensaje]} variante="claro" tamano="sm" className="w-full">
              Consultar con {p.nombre.split(" ")[0]}
            </BotonWhatsApp>
          </div>
        </div>
      }
    />
  );
}

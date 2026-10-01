"use client";

/* ==========================================================================
 *  Perfil de cada profesional, como una ficha chica: foto, nombre y
 *  especialidad. Tocar el "+" abre un panel grande por encima de toda la
 *  pantalla con todo lo que esa persona hace — descripción completa, frase
 *  y servicios — en vez de obligar a leer todo apretujado en la tarjeta.
 * ========================================================================== */

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { contacto } from "@/config/contacto";
import type { Profesional } from "@/data/peluqueria";
import BotonWhatsApp from "./BotonWhatsApp";
import { IconoCerrar, IconoMas, IconoTijera } from "./Iconos";
import { Foto } from "./Medios";

export default function PerfilEquipo({ p }: { p: Profesional }) {
  const [abierto, setAbierto] = useState(false);

  // Mientras el panel está abierto: Escape lo cierra y la página de atrás no scrollea.
  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    document.addEventListener("keydown", alTeclear);
    const overflowOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = overflowOriginal;
    };
  }, [abierto]);

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        aria-haspopup="dialog"
        aria-label={`Ver todo lo que hace ${p.nombre}`}
        className="group relative block aspect-[0.72] w-full overflow-hidden rounded-[22px] text-left"
      >
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
      </button>

      {abierto &&
        createPortal(
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={p.nombre}
          >
            <div
              aria-hidden
              className="absolute inset-0 animate-entrada bg-tinta/80 backdrop-blur-sm"
              onClick={() => setAbierto(false)}
            />
            <div className="animate-entrada relative flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-[28px] bg-tinta-suave text-crema shadow-2xl md:max-w-4xl md:flex-row">
              <button
                type="button"
                onClick={() => setAbierto(false)}
                aria-label="Cerrar"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-crema/40 bg-tinta/60 text-crema backdrop-blur-sm transition-colors hover:bg-tinta"
              >
                <IconoCerrar className="h-4 w-4" />
              </button>

              {/* En PC, foto y texto van lado a lado (como un cuadro) en vez de
                  apilados: la descripción tiene más ancho para leerse entera
                  sin tener que scrollear. En celular siguen apilados. */}
              <div className="relative aspect-[16/10] w-full shrink-0 sm:aspect-[16/9] md:aspect-auto md:w-[38%]">
                <Foto
                  src={p.foto}
                  alt={`Puesto de trabajo de ${p.nombre}`}
                  className="h-full w-full"
                  sizes="(min-width: 768px) 360px, 100vw"
                  posicion="center 15%"
                  viva={false}
                />
              </div>

              <div className="sin-scrollbar overflow-y-auto p-6 md:w-[62%] md:p-8">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cobre-claro">
                  <IconoTijera className="h-3.5 w-3.5" /> {p.especialidad}
                </p>
                <h3 className="mt-2 font-display text-3xl md:text-4xl">{p.nombre}</h3>
                <p className="mt-4 leading-relaxed text-crema/80">{p.descripcion}</p>
                {p.frase && (
                  <p className="mt-4 font-display text-lg italic text-cobre-claro">&ldquo;{p.frase}&rdquo;</p>
                )}
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.servicios.map((s) => (
                    <li key={s} className="rounded-full border border-crema/15 px-3 py-1.5 text-sm text-crema/85">
                      {s}
                    </li>
                  ))}
                </ul>
                <BotonWhatsApp
                  mensaje={contacto.mensajesWhatsApp[p.mensaje]}
                  variante="claro"
                  className="mt-7 w-full sm:w-auto"
                >
                  Consultar con {p.nombre.split(" ")[0]}
                </BotonWhatsApp>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

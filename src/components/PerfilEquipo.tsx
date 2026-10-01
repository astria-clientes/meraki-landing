"use client";

/* ==========================================================================
 *  Perfil de cada profesional, como una ficha chica: foto, nombre y
 *  especialidad. Tocar el "+" abre un panel por encima de toda la
 *  pantalla (como antes):
 *  - En celular, ese panel primero muestra la foto agrandada con el
 *    nombre; tocar la foto la da vuelta ahí mismo y, del otro lado, el
 *    texto completo (descripción, frase, servicios) sin la foto.
 *  - En PC, foto y texto van lado a lado, siempre juntos.
 * ========================================================================== */

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { contacto } from "@/config/contacto";
import type { Profesional } from "@/data/peluqueria";
import BotonWhatsApp from "./BotonWhatsApp";
import { IconoCerrar, IconoFlecha, IconoMas, IconoTijera } from "./Iconos";
import { Foto } from "./Medios";

function Frente({ p, onClick }: { p: Profesional; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
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
  );
}

function Info({ p }: { p: Profesional }) {
  const [relatoAbierto, setRelatoAbierto] = useState(false);
  return (
    <>
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cobre-claro">
        <IconoTijera className="h-3.5 w-3.5" /> {p.especialidad}
      </p>
      <h3 className="mt-2 font-display text-2xl md:text-4xl">{p.nombre}</h3>
      <p className="mt-3 text-sm leading-relaxed text-crema/80 md:mt-4 md:text-base">{p.descripcion}</p>
      {p.frase && (
        <p className="mt-3 font-display text-base italic text-cobre-claro md:mt-4 md:text-lg">
          &ldquo;{p.frase}&rdquo;
        </p>
      )}
      <ul className="mt-4 flex flex-wrap gap-2 md:mt-5">
        {p.servicios.map((s) => (
          <li
            key={s}
            className="rounded-full border border-crema/15 px-2.5 py-1 text-xs text-crema/85 md:px-3 md:py-1.5 md:text-sm"
          >
            {s}
          </li>
        ))}
      </ul>

      {p.relato && p.relato.length > 0 && (
        <div className="mt-5 md:mt-6">
          <button
            type="button"
            onClick={() => setRelatoAbierto((v) => !v)}
            aria-expanded={relatoAbierto}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cobre-claro"
          >
            {relatoAbierto ? "Mostrar menos" : "Conocé la historia completa"}
            <IconoFlecha className={`h-3 w-3 transition-transform ${relatoAbierto ? "-rotate-90" : "rotate-90"}`} />
          </button>
          {relatoAbierto && (
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-crema/75 md:text-base">
              {p.relato.map((parrafo, i) => (
                <p key={i}>{parrafo}</p>
              ))}
            </div>
          )}
        </div>
      )}

      <BotonWhatsApp mensaje={contacto.mensajesWhatsApp[p.mensaje]} variante="claro" className="mt-5 w-full md:mt-7 md:w-auto">
        Consultar con {p.nombre.split(" ")[0]}
      </BotonWhatsApp>
    </>
  );
}

export default function PerfilEquipo({ p }: { p: Profesional }) {
  const [abierto, setAbierto] = useState(false);
  // Solo importa en celular: adentro del panel, si se está mostrando la foto
  // grande (false) o, después de tocarla, la info sin foto (true).
  const [volteada, setVolteada] = useState(false);

  const cerrar = () => {
    setAbierto(false);
    setVolteada(false);
  };

  // Mientras el panel está abierto: Escape lo cierra y la página de atrás no scrollea.
  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    document.addEventListener("keydown", alTeclear);
    const overflowOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = overflowOriginal;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierto]);

  return (
    <>
      <Frente p={p} onClick={() => setAbierto(true)} />

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
              onClick={cerrar}
            />
            <div className="animate-entrada relative flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-[28px] bg-tinta-suave text-crema shadow-2xl md:max-w-4xl md:flex-row">
              <button
                type="button"
                onClick={cerrar}
                aria-label="Cerrar"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-crema/40 bg-tinta/60 text-crema backdrop-blur-sm transition-colors hover:bg-tinta"
              >
                <IconoCerrar className="h-4 w-4" />
              </button>

              {/* Celular: primero la foto agrandada con el nombre; tocarla la
                  da vuelta y del otro lado aparece el texto completo, sin foto. */}
              <div className="md:hidden">
                {volteada ? (
                  <div className="sin-scrollbar max-h-[85vh] overflow-y-auto p-6">
                    <Info p={p} />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setVolteada(true)}
                    aria-label={`Ver la información de ${p.nombre}`}
                    className="relative block aspect-[4/5] w-full text-left"
                  >
                    <Foto
                      src={p.foto}
                      alt={`Puesto de trabajo de ${p.nombre}`}
                      className="h-full w-full"
                      sizes="100vw"
                      posicion="center 15%"
                      viva={false}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tinta/90 via-tinta/10 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cobre-claro">
                        <IconoTijera className="h-3.5 w-3.5" /> {p.especialidad}
                      </p>
                      <h3 className="mt-2 font-display text-3xl text-crema">{p.nombre}</h3>
                    </div>
                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-crema/40 bg-tinta/50 text-crema backdrop-blur-sm">
                      <IconoMas className="h-4 w-4" />
                    </span>
                  </button>
                )}
              </div>

              {/* PC: foto y texto van lado a lado (como un cuadro), siempre
                  juntos — la descripción entra entera sin scrollear. */}
              <div className="hidden md:flex md:w-full">
                <div className="relative w-[38%] shrink-0">
                  <Foto
                    src={p.foto}
                    alt={`Puesto de trabajo de ${p.nombre}`}
                    className="h-full w-full"
                    sizes="360px"
                    posicion="center 15%"
                    viva={false}
                  />
                </div>
                <div className="sin-scrollbar w-[62%] overflow-y-auto p-8">
                  <Info p={p} />
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

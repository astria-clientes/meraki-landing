"use client";

/* ==========================================================================
 *  Historia ampliada de una terapia (ej. el detalle completo del Reiki),
 *  plegada bajo "Conocé más" — mismo patrón que el relato de cada
 *  profesional en el capítulo de peluquería (ver PerfilEquipo.tsx): la
 *  tarjeta queda compacta por defecto, y quien quiere profundizar lo
 *  despliega ahí mismo.
 * ========================================================================== */

import { useState } from "react";
import { IconoFlecha } from "./Iconos";

export default function RelatoTerapia({
  nombre,
  relato,
  columnaTitulo,
  principios,
  puntos,
}: {
  nombre: string;
  relato: string[];
  /** Encabezado de la columna derecha (principios o puntos). */
  columnaTitulo?: string;
  /** Lista corta, en primera persona — ej. los cinco principios del Reiki. */
  principios?: string[];
  /** Lista con título + explicación cada una — ej. cómo actúa el sonido en el cuerpo. */
  puntos?: { titulo: string; texto: string }[];
}) {
  const [abierto, setAbierto] = useState(false);
  const hayColumnaDerecha = (principios && principios.length > 0) || (puntos && puntos.length > 0);

  return (
    <div className="mt-8 border-t border-dorado/15 pt-6 md:mt-10 md:pt-8">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-dorado-claro"
      >
        {abierto ? "Mostrar menos" : `Conocé más sobre ${nombre}`}
        <IconoFlecha className={`h-3 w-3 transition-transform ${abierto ? "-rotate-90" : "rotate-90"}`} />
      </button>

      {abierto && (
        <div className={`mt-5 ${hayColumnaDerecha ? "grid gap-10 md:grid-cols-2 md:gap-14" : "max-w-2xl"}`}>
          <div className="space-y-4 text-[17px] leading-relaxed text-crema/80">
            {relato.map((parrafo, i) => (
              <p key={i}>{parrafo}</p>
            ))}
          </div>

          {principios && principios.length > 0 && (
            <div>
              {columnaTitulo && (
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-dorado-claro">
                  {columnaTitulo}
                </h4>
              )}
              <ol className="mt-5 space-y-3">
                {principios.map((p, i) => (
                  <li key={p} className="flex items-start gap-3 font-display text-lg italic leading-snug">
                    <span className="mt-0.5 shrink-0 text-sm not-italic text-dorado-claro">{i + 1}</span>
                    {p}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {puntos && puntos.length > 0 && (
            <div>
              {columnaTitulo && (
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-dorado-claro">
                  {columnaTitulo}
                </h4>
              )}
              <ul className="mt-5 space-y-5">
                {puntos.map((p) => (
                  <li key={p.titulo}>
                    <p className="font-display text-lg italic text-crema">{p.titulo}</p>
                    <p className="mt-1 leading-relaxed text-crema/70">{p.texto}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

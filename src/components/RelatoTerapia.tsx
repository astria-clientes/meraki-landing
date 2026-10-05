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
  principios,
}: {
  nombre: string;
  relato: string[];
  principios?: string[];
}) {
  const [abierto, setAbierto] = useState(false);

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
        <div className="mt-5 grid gap-10 md:grid-cols-2 md:gap-14">
          <div className="space-y-4 text-[17px] leading-relaxed text-crema/80">
            {relato.map((parrafo, i) => (
              <p key={i}>{parrafo}</p>
            ))}
          </div>

          {principios && principios.length > 0 && (
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-dorado-claro">
                Los cinco principios del Reiki (Gokai)
              </h4>
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
        </div>
      )}
    </div>
  );
}

"use client";

/* ==========================================================================
 *  Lista en tabla + vista de edición aparte, para las secciones del panel
 *  que son "catálogos" (piezas, fotos, etc.): mismo patrón que un admin de
 *  e-commerce (lista clara con Editar/Borrar → formulario propio por ítem),
 *  en vez de tarjetas que se abren todas juntas.
 * ========================================================================== */

export function TablaLista<T>({
  titulo,
  cantidadEtiqueta,
  items,
  columnas,
  onEditar,
  onBorrar,
  onNuevo,
  etiquetaNuevo = "+ Nuevo",
}: {
  titulo: string;
  cantidadEtiqueta?: (n: number) => string;
  items: T[];
  columnas: { label: string; render: (item: T, i: number) => React.ReactNode; className?: string }[];
  onEditar: (i: number) => void;
  onBorrar: (i: number) => void;
  onNuevo: () => void;
  etiquetaNuevo?: string;
}) {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-tinta/40">{titulo}</p>
          <h3 className="mt-1 font-display text-2xl text-tinta">
            {cantidadEtiqueta ? cantidadEtiqueta(items.length) : `${items.length} ítem${items.length === 1 ? "" : "s"}`}
          </h3>
        </div>
        <button
          type="button"
          onClick={onNuevo}
          className="shrink-0 rounded-full bg-tinta px-4 py-2.5 text-sm font-semibold text-crema transition-colors hover:bg-cobre-oscuro"
        >
          {etiquetaNuevo}
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-tinta/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-tinta/10 text-[11px] font-semibold uppercase tracking-wide text-tinta/40">
                {columnas.map((c) => (
                  <th key={c.label} className={`px-4 py-3 font-semibold ${c.className ?? ""}`}>
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b border-tinta/5 last:border-0 hover:bg-crema/50">
                  {columnas.map((c) => (
                    <td key={c.label} className={`px-4 py-3 align-middle ${c.className ?? ""}`}>
                      {c.render(item, i)}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onEditar(i)}
                      className="font-semibold text-cobre-oscuro hover:underline"
                    >
                      Editar
                    </button>
                    <span className="mx-2 text-tinta/20">·</span>
                    <button
                      type="button"
                      onClick={() => onBorrar(i)}
                      className="font-semibold text-red-600/70 hover:text-red-600 hover:underline"
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={columnas.length + 1} className="px-4 py-10 text-center text-tinta/40">
                    Todavía no hay nada acá.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function VistaEdicion({
  eyebrow,
  titulo,
  onVolver,
  onBorrar,
  children,
}: {
  eyebrow: string;
  titulo: string;
  onVolver: () => void;
  onBorrar?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-xl">
      <button
        type="button"
        onClick={onVolver}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-tinta/50 hover:text-tinta"
      >
        ← Volver a la lista
      </button>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-tinta/40">{eyebrow}</p>
          <h2 className="mt-1 font-display text-3xl text-tinta">{titulo || "Sin nombre todavía"}</h2>
        </div>
        {onBorrar && (
          <button
            type="button"
            onClick={onBorrar}
            className="shrink-0 text-sm font-semibold text-red-600/70 hover:text-red-600 hover:underline"
          >
            Borrar
          </button>
        )}
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

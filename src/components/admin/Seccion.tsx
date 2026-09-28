"use client";

import { useDocumento } from "./useDocumento";

export function Seccion<T>({
  ruta,
  titulo,
  children,
}: {
  ruta: string;
  titulo: string;
  children: (datos: T, set: (d: T) => void) => React.ReactNode;
}) {
  const { estado, setDatos, guardar, guardando, guardadoOk } = useDocumento<T>(ruta);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-2xl text-tinta">{titulo}</h2>
        {estado.estado === "listo" && (
          <div className="flex items-center gap-3">
            {guardadoOk && <span className="text-sm font-medium text-green-700">Guardado ✓</span>}
            <button
              type="button"
              onClick={() => guardar(`Editar "${titulo}" desde el panel`)}
              disabled={guardando}
              className="rounded-full bg-tinta px-5 py-2 text-sm font-semibold text-crema transition-opacity hover:bg-cobre-oscuro disabled:opacity-50"
            >
              {guardando ? "Guardando…" : "Guardar"}
            </button>
          </div>
        )}
      </div>

      {estado.estado === "cargando" && <p className="text-tinta/60">Cargando…</p>}
      {estado.estado === "error" && (
        <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">Error: {estado.mensaje}</p>
      )}
      {estado.estado === "listo" && children(estado.datos, setDatos)}
    </div>
  );
}

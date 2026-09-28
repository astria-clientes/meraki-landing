"use client";

import Image from "next/image";
import { useState } from "react";
import { subirImagen } from "@/lib/github";

/* ==========================================================================
 *  Piezas chicas y reutilizables para armar los formularios del panel.
 * ========================================================================== */

const estiloCampo =
  "w-full rounded-lg border border-tinta/15 bg-white px-3 py-2 text-[15px] text-tinta outline-none focus:border-cobre";

export function Campo({
  label,
  children,
  ayuda,
}: {
  label: string;
  children: React.ReactNode;
  ayuda?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-tinta/80">{label}</span>
      {children}
      {ayuda && <span className="mt-1 block text-xs text-tinta/45">{ayuda}</span>}
    </label>
  );
}

export function Texto({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      className={estiloCampo}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Parrafo({
  value,
  onChange,
  filas = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  filas?: number;
}) {
  return (
    <textarea
      className={`${estiloCampo} resize-y`}
      rows={filas}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Select({
  value,
  onChange,
  opciones,
}: {
  value: string;
  onChange: (v: string) => void;
  opciones: { valor: string; etiqueta: string }[];
}) {
  return (
    <select className={estiloCampo} value={value} onChange={(e) => onChange(e.target.value)}>
      {opciones.map((o) => (
        <option key={o.valor} value={o.valor}>
          {o.etiqueta}
        </option>
      ))}
    </select>
  );
}

/** Editor de una lista simple de textos (ej. beneficios, servicios). */
export function ListaTextos({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            className={estiloCampo}
            value={item}
            onChange={(e) => {
              const copia = [...value];
              copia[i] = e.target.value;
              onChange(copia);
            }}
          />
          <BotonIcono onClick={() => onChange(value.filter((_, j) => j !== i))} title="Borrar">
            ✕
          </BotonIcono>
        </div>
      ))}
      <BotonChico onClick={() => onChange([...value, ""])}>+ Agregar</BotonChico>
    </div>
  );
}

/** Editor de una lista de objetos (ej. profesionales, piezas del catálogo, horarios). */
export function ListaObjetos<T>({
  value,
  onChange,
  nuevo,
  titulo,
  children,
}: {
  value: T[];
  onChange: (v: T[]) => void;
  /** Objeto en blanco para cuando se agrega un ítem nuevo. */
  nuevo: () => T;
  /** Cómo mostrar el título de cada tarjeta (ej. item => item.nombre). */
  titulo: (item: T, i: number) => string;
  children: (item: T, actualizar: (cambios: Partial<T>) => void, i: number) => React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      {value.map((item, i) => (
        <div key={i} className="rounded-xl border border-tinta/10 bg-crema/60 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-tinta/70">{titulo(item, i) || `Ítem ${i + 1}`}</p>
            <div className="flex gap-1">
              {i > 0 && (
                <BotonIcono title="Subir" onClick={() => onChange(mover(value, i, i - 1))}>
                  ↑
                </BotonIcono>
              )}
              {i < value.length - 1 && (
                <BotonIcono title="Bajar" onClick={() => onChange(mover(value, i, i + 1))}>
                  ↓
                </BotonIcono>
              )}
              <BotonIcono title="Borrar" onClick={() => onChange(value.filter((_, j) => j !== i))}>
                ✕
              </BotonIcono>
            </div>
          </div>
          <div className="space-y-3">
            {children(item, (cambios) => {
              const copia = [...value];
              copia[i] = { ...copia[i], ...cambios };
              onChange(copia);
            }, i)}
          </div>
        </div>
      ))}
      <BotonChico onClick={() => onChange([...value, nuevo()])}>+ Agregar</BotonChico>
    </div>
  );
}

function mover<T>(lista: T[], desde: number, hasta: number): T[] {
  const copia = [...lista];
  const [item] = copia.splice(desde, 1);
  copia.splice(hasta, 0, item);
  return copia;
}

/** Campo de foto: ruta como texto + subir archivo nuevo (hace commit directo a /public/uploads). */
export function CampoImagen({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    e.target.value = "";
    if (!archivo) return;
    setSubiendo(true);
    setError(null);
    try {
      const ruta = await subirImagen(archivo, `Subir imagen desde el panel: ${archivo.name}`);
      onChange(ruta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo subir la imagen.");
    } finally {
      setSubiendo(false);
    }
  }

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative h-32 w-full overflow-hidden rounded-lg bg-tinta/5">
          <Image src={value} alt="Vista previa" fill sizes="300px" className="object-cover" />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <Texto value={value ?? ""} onChange={(v) => onChange(v || null)} placeholder="/fotos/..." />
        <label className="shrink-0 cursor-pointer rounded-full border border-tinta/20 px-3 py-2 text-sm font-semibold text-tinta hover:border-cobre">
          {subiendo ? "Subiendo…" : "Subir foto"}
          <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={subiendo} />
        </label>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function BotonChico({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-tinta/20 px-3.5 py-1.5 text-sm font-semibold text-tinta hover:border-cobre hover:text-cobre-oscuro"
    >
      {children}
    </button>
  );
}

function BotonIcono({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-tinta/50 hover:bg-tinta/10 hover:text-tinta"
    >
      {children}
    </button>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { Campo, CampoImagen, ListaObjetos, Select, Texto } from "./Campos";
import { Seccion } from "./Seccion";
import { TablaLista, VistaEdicion } from "./Tabla";

type Categoria = "dijes" | "collares" | "accesorios";
type CategoriaItem = { id: Categoria; nombre: string };
type Producto = { id: string; nombre: string; categoria: Categoria; piedra?: string; imagen: string | null };
type Productos = { categorias: CategoriaItem[]; productos: Producto[] };

const OPCIONES_CATEGORIA = [
  { valor: "dijes", etiqueta: "Dijes" },
  { valor: "collares", etiqueta: "Collares" },
  { valor: "accesorios", etiqueta: "Accesorios" },
];

function Miniatura({ src }: { src: string | null }) {
  return (
    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-tinta/5 ring-1 ring-tinta/10">
      {src ? (
        <Image src={src} alt="" fill sizes="40px" className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[8px] font-semibold uppercase text-tinta/30">
          Sin foto
        </div>
      )}
    </div>
  );
}

export default function ProductosForm() {
  const [editando, setEditando] = useState<number | null>(null);

  return (
    <Seccion<Productos> ruta="content/productos.json" titulo="Bijou & piedras (catálogo)">
      {(d, set) => {
        const actualizarProducto = (i: number, cambios: Partial<Producto>) => {
          const copia = [...d.productos];
          copia[i] = { ...copia[i], ...cambios };
          set({ ...d, productos: copia });
        };

        const producto = editando !== null ? d.productos[editando] : undefined;
        if (producto) {
          return (
            <VistaEdicion
              eyebrow="Editar pieza"
              titulo={producto.nombre}
              onVolver={() => setEditando(null)}
              onBorrar={() => {
                set({ ...d, productos: d.productos.filter((_, j) => j !== editando) });
                setEditando(null);
              }}
            >
              <Campo label="Nombre">
                <Texto value={producto.nombre} onChange={(v) => actualizarProducto(editando!, { nombre: v })} />
              </Campo>
              <div className="grid gap-4 sm:grid-cols-2">
                <Campo label="Categoría">
                  <Select
                    value={producto.categoria}
                    onChange={(v) => actualizarProducto(editando!, { categoria: v as Categoria })}
                    opciones={OPCIONES_CATEGORIA}
                  />
                </Campo>
                <Campo label="Piedra principal (opcional)">
                  <Texto value={producto.piedra ?? ""} onChange={(v) => actualizarProducto(editando!, { piedra: v })} />
                </Campo>
              </div>
              <Campo label="Foto">
                <CampoImagen value={producto.imagen} onChange={(v) => actualizarProducto(editando!, { imagen: v })} />
              </Campo>
              <Campo label="Id interno" ayuda="Solo se usa internamente, no se ve en la página. Sin espacios.">
                <Texto value={producto.id} onChange={(v) => actualizarProducto(editando!, { id: v })} />
              </Campo>
            </VistaEdicion>
          );
        }

        return (
          <div className="max-w-4xl space-y-10">
            <TablaLista<Producto>
              titulo="Catálogo"
              cantidadEtiqueta={(n) => `${n} pieza${n === 1 ? "" : "s"} en el catálogo`}
              items={d.productos}
              etiquetaNuevo="+ Nueva pieza"
              onNuevo={() => {
                const nuevo: Producto = { id: "", nombre: "", categoria: "dijes", piedra: "", imagen: null };
                set({ ...d, productos: [...d.productos, nuevo] });
                setEditando(d.productos.length);
              }}
              onEditar={(i) => setEditando(i)}
              onBorrar={(i) => set({ ...d, productos: d.productos.filter((_, j) => j !== i) })}
              columnas={[
                {
                  label: "Pieza",
                  render: (p) => (
                    <div className="flex items-center gap-3">
                      <Miniatura src={p.imagen} />
                      <span className="font-medium text-tinta">{p.nombre || "Sin nombre"}</span>
                    </div>
                  ),
                },
                {
                  label: "Categoría",
                  render: (p) => OPCIONES_CATEGORIA.find((o) => o.valor === p.categoria)?.etiqueta ?? p.categoria,
                },
                {
                  label: "Piedra",
                  render: (p) => p.piedra || <span className="text-tinta/30">—</span>,
                },
              ]}
            />

            <details className="group rounded-2xl border border-tinta/10 bg-crema/40 p-4 open:pb-5">
              <summary className="cursor-pointer select-none text-sm font-semibold text-tinta/50 group-open:text-tinta">
                Categorías del catálogo (avanzado)
              </summary>
              <div className="mt-4">
                <ListaObjetos<CategoriaItem>
                  value={d.categorias}
                  onChange={(v) => set({ ...d, categorias: v })}
                  nuevo={() => ({ id: "dijes", nombre: "" })}
                  titulo={(c) => c.nombre}
                >
                  {(c, actualizar) => (
                    <>
                      <Campo label="Id">
                        <Select value={c.id} onChange={(v) => actualizar({ id: v as Categoria })} opciones={OPCIONES_CATEGORIA} />
                      </Campo>
                      <Campo label="Nombre visible">
                        <Texto value={c.nombre} onChange={(v) => actualizar({ nombre: v })} />
                      </Campo>
                    </>
                  )}
                </ListaObjetos>
              </div>
            </details>
          </div>
        );
      }}
    </Seccion>
  );
}

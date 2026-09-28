"use client";

import { Campo, CampoImagen, ListaObjetos, Select, Texto } from "./Campos";
import { Seccion } from "./Seccion";

type Categoria = "dijes" | "collares" | "accesorios";
type CategoriaItem = { id: Categoria; nombre: string };
type Producto = { id: string; nombre: string; categoria: Categoria; piedra?: string; imagen: string | null };
type Productos = { categorias: CategoriaItem[]; productos: Producto[] };

const OPCIONES_CATEGORIA = [
  { valor: "dijes", etiqueta: "Dijes" },
  { valor: "collares", etiqueta: "Collares" },
  { valor: "accesorios", etiqueta: "Accesorios" },
];

export default function ProductosForm() {
  return (
    <Seccion<Productos> ruta="content/productos.json" titulo="Bijou & piedras (catálogo)">
      {(d, set) => (
        <div className="max-w-2xl space-y-10">
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tinta/50">Categorías</h3>
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
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tinta/50">Piezas del catálogo</h3>
            <ListaObjetos<Producto>
              value={d.productos}
              onChange={(v) => set({ ...d, productos: v })}
              nuevo={() => ({ id: "", nombre: "", categoria: "dijes", piedra: "", imagen: null })}
              titulo={(p) => p.nombre}
            >
              {(p, actualizar) => (
                <>
                  <Campo label="Id (sin espacios, ej. dije-amatista-2)">
                    <Texto value={p.id} onChange={(v) => actualizar({ id: v })} />
                  </Campo>
                  <Campo label="Nombre">
                    <Texto value={p.nombre} onChange={(v) => actualizar({ nombre: v })} />
                  </Campo>
                  <Campo label="Categoría">
                    <Select
                      value={p.categoria}
                      onChange={(v) => actualizar({ categoria: v as Categoria })}
                      opciones={OPCIONES_CATEGORIA}
                    />
                  </Campo>
                  <Campo label="Piedra principal (opcional)">
                    <Texto value={p.piedra ?? ""} onChange={(v) => actualizar({ piedra: v })} />
                  </Campo>
                  <Campo label="Foto">
                    <CampoImagen value={p.imagen} onChange={(v) => actualizar({ imagen: v })} />
                  </Campo>
                </>
              )}
            </ListaObjetos>
          </section>
        </div>
      )}
    </Seccion>
  );
}

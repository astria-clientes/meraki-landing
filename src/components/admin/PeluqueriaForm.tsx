"use client";

import { Campo, CampoImagen, ListaObjetos, ListaTextos, Parrafo, Select, Texto } from "./Campos";
import { Seccion } from "./Seccion";

type Profesional = {
  nombre: string;
  especialidad: string;
  descripcion: string;
  frase?: string;
  servicios: string[];
  foto: string | null;
  mensaje: "barberia" | "peluqueria";
};

type Video = { src: string | null; poster: string | null; titulo: string; formato: "vertical" | "horizontal" };

type Peluqueria = { profesionales: Profesional[]; videos: Video[] };

export default function PeluqueriaForm() {
  return (
    <Seccion<Peluqueria> ruta="content/peluqueria.json" titulo="Peluquería & barbería">
      {(d, set) => (
        <div className="max-w-2xl space-y-10">
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tinta/50">Profesionales</h3>
            <ListaObjetos<Profesional>
              value={d.profesionales}
              onChange={(v) => set({ ...d, profesionales: v })}
              nuevo={() => ({
                nombre: "",
                especialidad: "",
                descripcion: "",
                frase: "",
                servicios: [],
                foto: null,
                mensaje: "peluqueria",
              })}
              titulo={(p) => p.nombre}
            >
              {(p, actualizar) => (
                <>
                  <Campo label="Nombre">
                    <Texto value={p.nombre} onChange={(v) => actualizar({ nombre: v })} />
                  </Campo>
                  <Campo label="Especialidad">
                    <Texto value={p.especialidad} onChange={(v) => actualizar({ especialidad: v })} />
                  </Campo>
                  <Campo label="Descripción">
                    <Parrafo value={p.descripcion} onChange={(v) => actualizar({ descripcion: v })} />
                  </Campo>
                  <Campo label="Frase personal (opcional)">
                    <Texto value={p.frase ?? ""} onChange={(v) => actualizar({ frase: v })} />
                  </Campo>
                  <Campo label="Servicios">
                    <ListaTextos value={p.servicios} onChange={(v) => actualizar({ servicios: v })} />
                  </Campo>
                  <Campo label="Foto">
                    <CampoImagen value={p.foto} onChange={(v) => actualizar({ foto: v })} />
                  </Campo>
                  <Campo label="Qué mensaje de WhatsApp usa">
                    <Select
                      value={p.mensaje}
                      onChange={(v) => actualizar({ mensaje: v as Profesional["mensaje"] })}
                      opciones={[
                        { valor: "barberia", etiqueta: "Barbería" },
                        { valor: "peluqueria", etiqueta: "Peluquería" },
                      ]}
                    />
                  </Campo>
                </>
              )}
            </ListaObjetos>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tinta/50">Videos</h3>
            <ListaObjetos<Video>
              value={d.videos}
              onChange={(v) => set({ ...d, videos: v })}
              nuevo={() => ({ src: null, poster: null, titulo: "", formato: "vertical" })}
              titulo={(v) => v.titulo}
            >
              {(v, actualizar) => (
                <>
                  <Campo label="Título">
                    <Texto value={v.titulo} onChange={(t) => actualizar({ titulo: t })} />
                  </Campo>
                  <Campo label="Foto de adelanto (mientras no haya video)">
                    <CampoImagen value={v.poster} onChange={(p) => actualizar({ poster: p })} />
                  </Campo>
                  <Campo label="Ruta del video (vacío si todavía no hay)">
                    <Texto value={v.src ?? ""} onChange={(s) => actualizar({ src: s || null })} placeholder="/videos/..." />
                  </Campo>
                  <Campo label="Formato">
                    <Select
                      value={v.formato}
                      onChange={(f) => actualizar({ formato: f as Video["formato"] })}
                      opciones={[
                        { valor: "vertical", etiqueta: "Vertical (9:16)" },
                        { valor: "horizontal", etiqueta: "Horizontal (16:9)" },
                      ]}
                    />
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

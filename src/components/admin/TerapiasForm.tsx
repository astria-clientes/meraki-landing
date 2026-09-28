"use client";

import { Campo, CampoImagen, ListaObjetos, ListaTextos, Parrafo, Texto } from "./Campos";
import { Seccion } from "./Seccion";

type Foto = { src: string | null; alt: string };
type Terapia = {
  id: string;
  nombre: string;
  bajada: string;
  queEs: string;
  comoFunciona: { titulo: string; texto: string }[];
  beneficios: string[];
};
type Terapias = { fotosTerapias: Foto[]; terapias: Terapia[] };

export default function TerapiasForm() {
  return (
    <Seccion<Terapias> ruta="content/terapias.json" titulo="Terapias alternativas">
      {(d, set) => (
        <div className="max-w-2xl space-y-10">
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tinta/50">Fotos</h3>
            <ListaObjetos<Foto>
              value={d.fotosTerapias}
              onChange={(v) => set({ ...d, fotosTerapias: v })}
              nuevo={() => ({ src: null, alt: "" })}
              titulo={(f) => f.alt}
            >
              {(f, actualizar) => (
                <>
                  <Campo label="Descripción de la foto">
                    <Texto value={f.alt} onChange={(v) => actualizar({ alt: v })} />
                  </Campo>
                  <Campo label="Foto">
                    <CampoImagen value={f.src} onChange={(v) => actualizar({ src: v })} />
                  </Campo>
                </>
              )}
            </ListaObjetos>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tinta/50">Terapias</h3>
            <ListaObjetos<Terapia>
              value={d.terapias}
              onChange={(v) => set({ ...d, terapias: v })}
              nuevo={() => ({ id: "", nombre: "", bajada: "", queEs: "", comoFunciona: [], beneficios: [] })}
              titulo={(t) => t.nombre}
            >
              {(t, actualizar) => (
                <>
                  <Campo label="Id (sin espacios, ej. reiki)">
                    <Texto value={t.id} onChange={(v) => actualizar({ id: v })} />
                  </Campo>
                  <Campo label="Nombre">
                    <Texto value={t.nombre} onChange={(v) => actualizar({ nombre: v })} />
                  </Campo>
                  <Campo label="Bajada corta">
                    <Texto value={t.bajada} onChange={(v) => actualizar({ bajada: v })} />
                  </Campo>
                  <Campo label="Qué es">
                    <Parrafo value={t.queEs} onChange={(v) => actualizar({ queEs: v })} />
                  </Campo>
                  <Campo label="Beneficios">
                    <ListaTextos value={t.beneficios} onChange={(v) => actualizar({ beneficios: v })} />
                  </Campo>
                  <Campo label="Cómo funciona / cómo es una sesión">
                    <ListaObjetos<{ titulo: string; texto: string }>
                      value={t.comoFunciona}
                      onChange={(v) => actualizar({ comoFunciona: v })}
                      nuevo={() => ({ titulo: "", texto: "" })}
                      titulo={(p) => p.titulo}
                    >
                      {(paso, actualizarPaso) => (
                        <>
                          <Campo label="Título del paso">
                            <Texto value={paso.titulo} onChange={(v) => actualizarPaso({ titulo: v })} />
                          </Campo>
                          <Campo label="Texto del paso">
                            <Parrafo value={paso.texto} onChange={(v) => actualizarPaso({ texto: v })} filas={2} />
                          </Campo>
                        </>
                      )}
                    </ListaObjetos>
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

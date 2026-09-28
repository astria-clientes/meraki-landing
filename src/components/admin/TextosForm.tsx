"use client";

import { Campo, Parrafo, Texto } from "./Campos";
import { Seccion } from "./Seccion";

type Capitulo = { tituloLinea1: string; tituloLinea2: string; bajada: string };
type Textos = {
  hero: { eslogan: string; bajada: string };
  capitulos: { peluqueria: Capitulo; terapias: Capitulo; piedras: Capitulo };
};

function CampoCapitulo({
  cap,
  onChange,
}: {
  cap: Capitulo;
  onChange: (cambios: Partial<Capitulo>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Campo label="Título · primera línea">
          <Texto value={cap.tituloLinea1} onChange={(v) => onChange({ tituloLinea1: v })} />
        </Campo>
        <Campo label="Título · segunda línea (con color de acento)">
          <Texto value={cap.tituloLinea2} onChange={(v) => onChange({ tituloLinea2: v })} />
        </Campo>
      </div>
      <Campo label="Bajada">
        <Parrafo value={cap.bajada} onChange={(v) => onChange({ bajada: v })} filas={3} />
      </Campo>
    </div>
  );
}

export default function TextosForm() {
  return (
    <Seccion<Textos> ruta="content/textos.json" titulo="Textos de cada capítulo">
      {(d, set) => (
        <div className="max-w-2xl space-y-10">
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tinta/50">Inicio</h3>
            <div className="space-y-3">
              <Campo label="Frase debajo de μεράκι" ayuda='Se muestra como: μεράκι [este texto]'>
                <Texto value={d.hero.eslogan} onChange={(v) => set({ ...d, hero: { ...d.hero, eslogan: v } })} />
              </Campo>
              <Campo label="Bajada de inicio">
                <Parrafo
                  value={d.hero.bajada}
                  onChange={(v) => set({ ...d, hero: { ...d.hero, bajada: v } })}
                  filas={3}
                />
              </Campo>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tinta/50">
              Capítulo 01 · Peluquería & barbería
            </h3>
            <CampoCapitulo
              cap={d.capitulos.peluqueria}
              onChange={(c) => set({ ...d, capitulos: { ...d.capitulos, peluqueria: { ...d.capitulos.peluqueria, ...c } } })}
            />
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tinta/50">
              Capítulo 02 · Terapias
            </h3>
            <CampoCapitulo
              cap={d.capitulos.terapias}
              onChange={(c) => set({ ...d, capitulos: { ...d.capitulos, terapias: { ...d.capitulos.terapias, ...c } } })}
            />
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tinta/50">
              Capítulo 03 · Piedras & bijou
            </h3>
            <CampoCapitulo
              cap={d.capitulos.piedras}
              onChange={(c) => set({ ...d, capitulos: { ...d.capitulos, piedras: { ...d.capitulos.piedras, ...c } } })}
            />
          </section>
        </div>
      )}
    </Seccion>
  );
}

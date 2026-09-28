"use client";

import { Campo, CampoImagen, Texto } from "./Campos";
import { Seccion } from "./Seccion";

type Marca = {
  logoMeraki: string | null;
  logoPiedras: string | null;
  nombreMarcaPiedras: string | null;
};

export default function MarcaForm() {
  return (
    <Seccion<Marca> ruta="content/marca.json" titulo="Logos">
      {(d, set) => (
        <div className="max-w-xl space-y-6">
          <Campo label="Logo de Meraki (peluquería)">
            <CampoImagen value={d.logoMeraki} onChange={(v) => set({ ...d, logoMeraki: v })} />
          </Campo>
          <Campo label="Logo de piedras / terapias">
            <CampoImagen value={d.logoPiedras} onChange={(v) => set({ ...d, logoPiedras: v })} />
          </Campo>
          <Campo label="Nombre de la marca de piedras/terapias (si tiene uno propio)">
            <Texto value={d.nombreMarcaPiedras ?? ""} onChange={(v) => set({ ...d, nombreMarcaPiedras: v || null })} />
          </Campo>
        </div>
      )}
    </Seccion>
  );
}

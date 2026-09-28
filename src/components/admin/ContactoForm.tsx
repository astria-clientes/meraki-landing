"use client";

import { Campo, Parrafo, Texto } from "./Campos";
import { Seccion } from "./Seccion";

type Contacto = {
  whatsapp: { numero: string; textoVisible: string };
  email: string;
  instagram: string;
  direccion: { calle: string; ciudad: string; referencia: string; linkMapa: string };
  horarios: { dias: string; horas: string }[];
  mensajesWhatsApp: {
    general: string;
    barberia: string;
    peluqueria: string;
    terapias: string;
    piedras: string;
    producto: string;
    piedra: string;
  };
  textos: { tituloContacto: string; bajadaContacto: string; botonWhatsApp: string };
};

export default function ContactoForm() {
  return (
    <Seccion<Contacto> ruta="content/contacto.json" titulo="Contacto">
      {(d, set) => (
        <div className="max-w-2xl space-y-8">
          <section className="grid gap-4 sm:grid-cols-2">
            <Campo label="WhatsApp (formato 549XXXXXXXXXX, sin +)">
              <Texto
                value={d.whatsapp.numero}
                onChange={(v) => set({ ...d, whatsapp: { ...d.whatsapp, numero: v } })}
              />
            </Campo>
            <Campo label="Cómo se muestra escrito">
              <Texto
                value={d.whatsapp.textoVisible}
                onChange={(v) => set({ ...d, whatsapp: { ...d.whatsapp, textoVisible: v } })}
              />
            </Campo>
            <Campo label="Email (vacío para ocultarlo)">
              <Texto value={d.email} onChange={(v) => set({ ...d, email: v })} />
            </Campo>
            <Campo label="Instagram, sin @ (vacío para ocultarlo)">
              <Texto value={d.instagram} onChange={(v) => set({ ...d, instagram: v })} />
            </Campo>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <Campo label="Calle y número">
              <Texto value={d.direccion.calle} onChange={(v) => set({ ...d, direccion: { ...d.direccion, calle: v } })} />
            </Campo>
            <Campo label="Ciudad">
              <Texto value={d.direccion.ciudad} onChange={(v) => set({ ...d, direccion: { ...d.direccion, ciudad: v } })} />
            </Campo>
            <Campo label="Referencia (opcional)">
              <Texto
                value={d.direccion.referencia}
                onChange={(v) => set({ ...d, direccion: { ...d.direccion, referencia: v } })}
              />
            </Campo>
            <Campo label="Link de Google Maps (opcional)">
              <Texto
                value={d.direccion.linkMapa}
                onChange={(v) => set({ ...d, direccion: { ...d.direccion, linkMapa: v } })}
              />
            </Campo>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tinta/50">Horarios</h3>
            <div className="space-y-2">
              {d.horarios.map((h, i) => (
                <div key={i} className="grid grid-cols-2 gap-2">
                  <Texto
                    value={h.dias}
                    onChange={(v) => {
                      const copia = [...d.horarios];
                      copia[i] = { ...copia[i], dias: v };
                      set({ ...d, horarios: copia });
                    }}
                  />
                  <Texto
                    value={h.horas}
                    onChange={(v) => {
                      const copia = [...d.horarios];
                      copia[i] = { ...copia[i], horas: v };
                      set({ ...d, horarios: copia });
                    }}
                  />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tinta/50">
              Mensajes precargados de WhatsApp
            </h3>
            <p className="mb-3 text-xs text-tinta/50">
              En &quot;producto&quot; y &quot;piedra&quot; dejá {"{nombre}"} tal cual: se reemplaza solo por lo que se
              consulta.
            </p>
            <div className="space-y-3">
              {(
                [
                  ["general", "General"],
                  ["barberia", "Barbería (Diego)"],
                  ["peluqueria", "Peluquería (Ayelen)"],
                  ["terapias", "Terapias"],
                  ["piedras", "Piedras (general)"],
                  ["producto", "Un producto puntual"],
                  ["piedra", "Una piedra puntual"],
                ] as const
              ).map(([clave, label]) => (
                <Campo key={clave} label={label}>
                  <Parrafo
                    value={d.mensajesWhatsApp[clave]}
                    onChange={(v) => set({ ...d, mensajesWhatsApp: { ...d.mensajesWhatsApp, [clave]: v } })}
                    filas={2}
                  />
                </Campo>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tinta/50">
              Textos de la sección final de contacto
            </h3>
            <div className="space-y-3">
              <Campo label="Título">
                <Texto value={d.textos.tituloContacto} onChange={(v) => set({ ...d, textos: { ...d.textos, tituloContacto: v } })} />
              </Campo>
              <Campo label="Bajada">
                <Parrafo value={d.textos.bajadaContacto} onChange={(v) => set({ ...d, textos: { ...d.textos, bajadaContacto: v } })} />
              </Campo>
              <Campo label="Texto del botón de WhatsApp">
                <Texto value={d.textos.botonWhatsApp} onChange={(v) => set({ ...d, textos: { ...d.textos, botonWhatsApp: v } })} />
              </Campo>
            </div>
          </section>
        </div>
      )}
    </Seccion>
  );
}

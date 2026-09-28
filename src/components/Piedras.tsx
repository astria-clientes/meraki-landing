import { contacto } from "@/config/contacto";
import { marca } from "@/data/marca";
import BotonWhatsApp from "./BotonWhatsApp";
import Catalogo from "./Catalogo";
import { EncabezadoCapitulo } from "./Capitulo";
import GuiaPiedras from "./GuiaPiedras";
import { Logo } from "./Medios";
import { textos } from "@/data/textos";

export default function Piedras() {
  return (
    <section id="piedras" className="grano relative scroll-mt-14 overflow-hidden bg-arena text-tinta md:scroll-mt-16">
      {/* Banner de video: la misma colección de piedras y musgo que Diego usa,
          de fondo, como entrada cinematográfica al capítulo. */}
      <div className="relative overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/piedras-musgo-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/piedras-musgo.mp4" type="video/mp4" />
        </video>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-tinta via-tinta/55 to-tinta/25" />
        {/* Fusión con el resto de la página: el video no corta de golpe ni arriba ni abajo,
            se disuelve en el color que viene antes (tinta, el hilo entre capítulos) y en el
            que sigue (arena, el resto de esta sección). */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-tinta to-transparent md:h-28" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-arena md:h-40" />

        <div className="relative mx-auto max-w-6xl px-4 py-14 text-crema md:px-6 md:py-24">
          <div className="flex flex-col-reverse gap-8 md:flex-row md:items-end md:justify-between">
            <EncabezadoCapitulo
              numero="03"
              capitulo="La piedra"
              cuenta="#E0A77C"
              titulo={
                <>
                  {textos.capitulos.piedras.tituloLinea1}
                  <br />
                  <em className="text-dorado-claro">{textos.capitulos.piedras.tituloLinea2}</em>
                </>
              }
              bajada={textos.capitulos.piedras.bajada}
            />
            <Logo
              src={marca.logoPiedras}
              alt={marca.nombreMarcaPiedras ?? "Logo de piedras y terapias"}
              pendiente="Logo piedras · próximamente"
              className="h-20 w-32 shrink-0 text-crema/60 md:h-28 md:w-40"
            />
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-dorado/25 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-4 md:px-6 md:pb-28">
        {/* Un solo bloque oscuro fundido: catálogo, colección de Diego y el cierre
            de WhatsApp viven adentro de la misma tarjeta continua. El video de
            musgo/cuarzo solo ocupa la franja de arriba y se disuelve en tinta;
            todo lo que sigue ya es ese mismo tinta plano, sin cortes. */}
        <div className="relative mt-14 overflow-hidden rounded-[32px] bg-tinta md:mt-20">
          <div className="relative h-[340px] w-full overflow-hidden md:h-[440px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/videos/catalogo-musgo-flor-poster.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/videos/catalogo-musgo-flor.mp4" type="video/mp4" />
            </video>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-tinta/40 to-tinta" />
          </div>

          <div className="relative px-4 pb-14 pt-2 md:px-8 md:pb-20 md:pt-4">
            {/* Catálogo */}
            <div className="mb-6 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
              <h3 className="font-display text-3xl text-crema md:text-4xl">Catálogo</h3>
              <p className="text-sm text-crema/65">Sin precios online: consultá cada pieza por WhatsApp.</p>
            </div>
            <Catalogo />

            {/* Guía educativa: la colección real de Diego, piedra por piedra */}
            <div className="mt-20 md:mt-28">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-dorado-claro">Para aprender</p>
                <h3 className="mt-3 font-display text-3xl text-crema md:text-5xl">La colección de Diego</h3>
                <p className="mt-4 text-[17px] leading-relaxed text-crema/75">
                  Más de 70 piedras y minerales que Diego usa en las sesiones de armonización sonora, todas
                  a la vista en el local. Filtrá por chakra o buscá una en particular para conocer su
                  historia, sus propiedades y cómo se usa en una sesión.
                </p>
                <a
                  href="/piedras/coleccion-completa.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-dorado-claro hover:underline"
                >
                  Ver el póster de la colección completa →
                </a>
              </div>
              <div className="mt-10">
                <GuiaPiedras />
              </div>
              <p className="mt-8 max-w-3xl text-xs leading-relaxed text-crema/50">
                Las propiedades energéticas y espirituales provienen de tradiciones y creencias populares; no
                son afirmaciones científicas ni reemplazan ningún tratamiento médico.
              </p>
            </div>

            {/* Cierre */}
            <div className="mt-16 flex flex-col items-start gap-6 border-t border-crema/10 pt-10 md:mt-20 md:flex-row md:items-center md:justify-between">
              <p className="max-w-lg font-display text-2xl leading-snug text-crema md:text-3xl">
                ¿Buscás una piedra en particular o querés reservar una pieza?
              </p>
              <BotonWhatsApp mensaje={contacto.mensajesWhatsApp.piedras} tamano="lg" className="w-full md:w-auto">
                Consultar por WhatsApp
              </BotonWhatsApp>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

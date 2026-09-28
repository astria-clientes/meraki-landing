import { contacto } from "@/config/contacto";
import { marca } from "@/data/marca";
import BotonWhatsApp from "./BotonWhatsApp";
import Catalogo from "./Catalogo";
import { Enhebrado, EncabezadoCapitulo } from "./Capitulo";
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

      {/* Hilo místico: en vez de un salto vacío en arena, el mismo cordón de
          cobre que ensarta los capítulos conecta el video de entrada con el
          del catálogo — la costura queda a la vista, no escondida. */}
      <Enhebrado desde="#EFE3CB" hacia="#EFE3CB" cuenta="#B8823D" />

      {/* Catálogo, envuelto entre dos videos — el musgo/flor al empezar, la
          esfera de mariposas al terminar la grilla — así el capítulo no "corta
          de la nada": entra y sale de la misma atmósfera. Todo a todo el ancho,
          sin tarjeta ni bordes redondeados, fundido en tinta de punta a punta. */}
      <div className="relative bg-tinta">
        <div className="relative h-[300px] w-full overflow-hidden md:h-[400px]">
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
          <div aria-hidden className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-arena to-transparent md:h-28" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-tinta md:h-32" />
        </div>

        <div className="pt-10 md:pt-14">
          <div className="relative mx-auto max-w-6xl px-4 md:px-6">
            {/* Catálogo */}
            <div className="mb-6 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
              <h3 className="font-display text-3xl text-crema md:text-4xl">Catálogo</h3>
              <p className="text-sm text-crema/65">Sin precios online: consultá cada pieza por WhatsApp.</p>
            </div>
            <Catalogo />
          </div>
        </div>

        {/* La esfera cierra el catálogo — mismo tratamiento, fundida en tinta
            de los dos lados, sin corte hacia la colección de Diego. */}
        <div className="relative mt-16 h-[280px] w-full overflow-hidden md:mt-20 md:h-[380px]">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/videos/coleccion-esfera-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/coleccion-esfera.mp4" type="video/mp4" />
          </video>
          <div aria-hidden className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-tinta to-transparent md:h-28" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-tinta md:h-28" />
        </div>

        <div className="pb-20 pt-4 md:pb-28 md:pt-6">
          <div className="relative mx-auto max-w-6xl px-4 md:px-6">
            {/* Guía educativa: la colección real de Diego, piedra por piedra */}
            <div>
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

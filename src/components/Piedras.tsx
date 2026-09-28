import { contacto } from "@/config/contacto";
import { marca } from "@/data/marca";
import BotonWhatsApp from "./BotonWhatsApp";
import Catalogo from "./Catalogo";
import { EncabezadoCapitulo } from "./Capitulo";
import GuiaPiedras from "./GuiaPiedras";
import { Logo } from "./Medios";

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
                  Piezas hechas a mano,
                  <br />
                  <em className="text-dorado-claro">piedras con historia.</em>
                </>
              }
              bajada="Dijes, collares y accesorios con piedras semipreciosas. Cada pieza es única: vení a verlas, tocarlas y elegir la tuya."
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
        {/* Catálogo: el musgo, cuarzo y flor de Diego como fondo continuo de
            toda la sección, no una tarjeta aparte — el catálogo "flota"
            sobre ese fondo con tarjetas de vidrio en vez de blancas. */}
        <div className="mt-14 md:mt-20">
          <div className="relative overflow-hidden rounded-[32px] bg-tinta">
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
            <div aria-hidden className="absolute inset-0 bg-tinta/55" />
            <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-tinta/70 to-transparent" />

            <div className="relative px-4 py-10 md:px-8 md:py-14">
              <div className="mb-6 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
                <h3 className="font-display text-3xl text-crema md:text-4xl">Catálogo</h3>
                <p className="text-sm text-crema/65">Sin precios online: consultá cada pieza por WhatsApp.</p>
              </div>
              <Catalogo />
            </div>
          </div>
        </div>

        {/* Guía educativa: la colección real de Diego, piedra por piedra */}
        <div className="mt-20 md:mt-28">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-cobre-oscuro">Para aprender</p>
            <h3 className="mt-3 font-display text-3xl md:text-5xl">La colección de Diego</h3>
            <p className="mt-4 text-[17px] leading-relaxed text-tinta/75">
              Más de 70 piedras y minerales que Diego usa en las sesiones de armonización sonora, todas
              a la vista en el local. Filtrá por chakra o buscá una en particular para conocer su
              historia, sus propiedades y cómo se usa en una sesión.
            </p>
            <a
              href="/piedras/coleccion-completa.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cobre-oscuro hover:underline"
            >
              Ver el póster de la colección completa →
            </a>
          </div>
          <div className="mt-10">
            <GuiaPiedras />
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-tinta/50">
            Las propiedades energéticas y espirituales provienen de tradiciones y creencias populares; no
            son afirmaciones científicas ni reemplazan ningún tratamiento médico.
          </p>
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 rounded-[32px] bg-tinta p-7 text-crema md:mt-20 md:flex-row md:items-center md:justify-between md:p-10">
          <p className="max-w-lg font-display text-2xl leading-snug md:text-3xl">
            ¿Buscás una piedra en particular o querés reservar una pieza?
          </p>
          <BotonWhatsApp mensaje={contacto.mensajesWhatsApp.piedras} tamano="lg" className="w-full md:w-auto">
            Consultar por WhatsApp
          </BotonWhatsApp>
        </div>
      </div>
    </section>
  );
}

import { marca } from "@/data/marca";
import { profesionales, videos } from "@/data/peluqueria";
import { textos } from "@/data/textos";
import Aparecer from "./Aparecer";
import { EncabezadoCapitulo } from "./Capitulo";
import { IconoFlecha } from "./Iconos";
import AccordionGallery from "./AccordionGallery";
import CarruselFotos from "./CarruselFotos";
import { Foto, Logo } from "./Medios";
import PerfilEquipo from "./PerfilEquipo";

export default function Peluqueria() {
  return (
    <section id="peluqueria" className="grano scroll-mt-14 bg-tinta text-crema md:scroll-mt-16">
      {/* Foto real del salón, a todo el ancho: la primera vista al entrar al capítulo. */}
      <div className="relative">
        <Foto
          src="/fotos/local/salon-general.jpg"
          alt="Vista general del salón de Meraki: madera, plantas y geometría sagrada"
          className="aspect-[16/9] md:aspect-[21/9]"
          sizes="100vw"
          posicion="center 30%"
        />
        {/* Funde el final de la foto con el fondo del capítulo en vez de cortar en seco —
            más marcado en celular, donde la foto ocupa casi toda la pantalla. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-tinta to-transparent md:h-16"
        />
        <p className="pointer-events-none absolute inset-x-0 bottom-5 hidden items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-crema/85 md:flex">
          Deslizá para conocer la peluquería
          <IconoFlecha className="h-3.5 w-3.5 animate-deslizar-abajo" />
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6 md:pb-28 md:pt-14">
        <div className="flex flex-col-reverse gap-8 md:flex-row md:items-end md:justify-between">
          <EncabezadoCapitulo
            numero="01"
            capitulo="El oficio"
            cuenta="#221912"
            titulo={
              <>
                {textos.capitulos.peluqueria.tituloLinea1}
                <br />
                <em className="text-cobre-claro">{textos.capitulos.peluqueria.tituloLinea2}</em>
              </>
            }
            bajada={textos.capitulos.peluqueria.bajada}
          />
          {/* Logo de MERAKI — se usa específicamente en este capítulo */}
          <Logo
            src={marca.logoMeraki}
            alt="Logo de Meraki"
            pendiente="Logo Meraki"
            className="h-24 w-24 shrink-0 text-crema/60 md:h-36 md:w-36"
          />
        </div>

        {/* Fichas de perfil, chicas: adelante la foto y el nombre, con un "+"
            que da vuelta la tarjeta y muestra todo lo que esa persona hace. */}
        <div className="mx-auto mt-14 grid max-w-md grid-cols-2 gap-4 sm:gap-6 md:mx-0 md:mt-20 md:max-w-lg md:gap-8">
          {profesionales.map((p, i) => (
            <Aparecer key={p.nombre} demora={i * 120}>
              <PerfilEquipo p={p} />
            </Aparecer>
          ))}
        </div>

        {/* Fotos del local — reemplazan al carrusel de "video pendiente"
            mientras llegan los videos reales. En PC, un acordeón: la franja
            activa se agranda y se ve a color al pasar el mouse. En celular,
            un carrusel deslizable (Swiper): se siente mejor con el dedo que
            el acordeón, pensado para el mouse. */}
        <div className="mt-20 md:mt-28">
          <h3 className="font-display text-3xl md:text-4xl">
            El local, <em className="text-cobre-claro">en movimiento</em>
          </h3>
          <div className="mt-8 hidden md:block">
            <AccordionGallery
              items={videos
                .filter((v) => v.poster)
                .map((v) => ({ image: v.poster as string, label: v.titulo }))}
              defaultIndex={0}
              height={420}
              gap={10}
              radius={24}
              accentColor="#D9A855"
              overlayColor="#221912"
              textColor="#F7F3EC"
            />
          </div>
          <div className="-mx-4 mt-8 px-4 md:hidden">
            <CarruselFotos
              items={videos
                .filter((v) => v.poster)
                .map((v) => ({ image: v.poster as string, label: v.titulo }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

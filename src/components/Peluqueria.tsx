import { contacto } from "@/config/contacto";
import { marca } from "@/data/marca";
import { profesionales, videos } from "@/data/peluqueria";
import Aparecer from "./Aparecer";
import BotonWhatsApp from "./BotonWhatsApp";
import { EncabezadoCapitulo } from "./Capitulo";
import { IconoTijera } from "./Iconos";
import { Foto, Logo, Video } from "./Medios";

export default function Peluqueria() {
  return (
    <section id="peluqueria" className="grano scroll-mt-14 bg-tinta text-crema md:scroll-mt-16">
      {/* Foto real del salón, a todo el ancho: la primera vista al entrar al capítulo. */}
      <Foto
        src="/fotos/local/salon-general.jpg"
        alt="Vista general del salón de Meraki: madera, plantas y geometría sagrada"
        className="aspect-[16/9] md:aspect-[21/9]"
        sizes="100vw"
        posicion="center 30%"
      />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6 md:pb-28 md:pt-14">
        <div className="flex flex-col-reverse gap-8 md:flex-row md:items-end md:justify-between">
          <EncabezadoCapitulo
            numero="01"
            capitulo="El oficio"
            cuenta="#221912"
            titulo={
              <>
                Tijera, navaja
                <br />y buen <em className="text-cobre-claro">pulso.</em>
              </>
            }
            bajada="Barbería y peluquería unisex con tiempo para escucharte. Cortes pensados para vos, no en serie."
          />
          {/* Logo de MERAKI — se usa específicamente en este capítulo */}
          <Logo
            src={marca.logoMeraki}
            alt="Logo de Meraki"
            pendiente="Logo Meraki"
            className="h-24 w-24 shrink-0 text-crema/60 md:h-36 md:w-36"
          />
        </div>

        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          {profesionales.map((p, i) => (
            <Aparecer key={p.nombre} as="article" demora={i * 120}
              className="overflow-hidden rounded-[28px] border border-tinta-borde bg-tinta-suave"
            >
              <Foto
                src={p.foto}
                alt={`Puesto de trabajo de ${p.nombre}`}
                ayuda="Foto pendiente · /public/fotos/equipo"
                className="aspect-[4/5] rounded-t-[28px] text-crema/70 sm:aspect-[3/4]"
                sizes="(min-width: 768px) 50vw, 100vw"
                posicion="center 15%"
              />
              <div className="p-6 md:p-8">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-cobre-claro">
                  <IconoTijera className="h-4 w-4" /> {p.especialidad}
                </p>
                <h3 className="mt-3 font-display text-3xl md:text-4xl">{p.nombre}</h3>
                <p className="mt-3 leading-relaxed text-crema/75">{p.descripcion}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.servicios.map((s) => (
                    <li key={s} className="rounded-full border border-crema/15 px-3 py-1.5 text-sm text-crema/85">
                      {s}
                    </li>
                  ))}
                </ul>
                <BotonWhatsApp
                  mensaje={contacto.mensajesWhatsApp[p.mensaje]}
                  variante="claro"
                  className="mt-7 w-full sm:w-auto"
                >
                  Consultar con {p.nombre.split(" ")[0]}
                </BotonWhatsApp>
              </div>
            </Aparecer>
          ))}
        </div>

        {/* Videos del local y de los trabajos */}
        <div className="mt-20 md:mt-28">
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-display text-3xl md:text-4xl">
              El local, <em className="text-cobre-claro">en movimiento</em>
            </h3>
            <p className="hidden text-sm text-crema/50 md:block">Deslizá para ver más</p>
          </div>
          <div className="sin-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
            {videos.map((v, i) => (
              <Video
                key={i}
                {...v}
                className="w-[62%] shrink-0 snap-start rounded-3xl border border-tinta-borde bg-tinta-suave text-crema/70 sm:w-[40%] md:w-auto"
              />
            ))}
          </div>
          <p className="mt-3 text-sm text-crema/50 md:hidden">← Deslizá para ver más →</p>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { contacto } from "@/config/contacto";
import { marca } from "@/data/marca";
import { fotosTerapias, terapias } from "@/data/terapias";
import { textos } from "@/data/textos";
import Aparecer from "./Aparecer";
import BotonWhatsApp from "./BotonWhatsApp";
import { EncabezadoCapitulo } from "./Capitulo";
import { Foto, Logo } from "./Medios";
import { ShaderBackground } from "./ShaderBackground";

/** El ojo del logo, con las ondas de la armonización sonora expandiéndose a su alrededor. */
function Ondas() {
  return (
    <div aria-hidden className="relative mx-auto h-40 w-40 md:h-52 md:w-52">
      {[0, 1.5, 3].map((d) => (
        <span
          key={d}
          className="absolute inset-0 animate-ondas rounded-full border border-dorado/50"
          style={{ animationDelay: `${d}s` }}
        />
      ))}
      <span className="absolute inset-[26%] animate-respirar rounded-full bg-tinta-suave shadow-[0_0_30px_-4px_rgba(201,162,39,.6)]">
        <Image src="/logos/ojo.png" alt="" fill sizes="140px" className="object-contain p-3" />
      </span>
    </div>
  );
}

export default function Terapias() {
  return (
    <section id="terapias" className="grano relative scroll-mt-14 bg-tinta-suave text-crema/90 md:scroll-mt-16">
      {/* Fondo animado (shader), de la paleta del sitio — ver
          ShaderBackground.tsx. Va "pegado" (sticky) a la pantalla mientras
          se scrollea el capítulo entero, y recién se despega al llegar al
          final — el -mt-[100vh] del wrapper de abajo cancela el espacio
          que reserva el sticky, para que el contenido arranque pegado
          arriba en vez de dejar un hueco. Así el shader se ve en la escala
          de una pantalla (como fue diseñado) en vez de estirado a lo largo
          de todo el capítulo.
          La sección NO puede tener overflow-hidden: un ancestro con
          overflow distinto de "visible" rompe el position:sticky de sus
          descendientes. Por eso los dos círculos decorativos, que sí
          necesitan recortarse, van en su propio contenedor con
          overflow-hidden — separado del que tiene el shader. */}
      <div aria-hidden className="pointer-events-none sticky top-0 -z-10 h-screen w-full">
        <ShaderBackground className="absolute inset-0 h-full w-full" />
      </div>

      <div className="relative z-10 -mt-[100vh] overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-dorado/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-40 bottom-40 h-96 w-96 rounded-full bg-cobre/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-6 md:px-6 md:pb-28">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <EncabezadoCapitulo
            numero="02"
            cuenta="#C9A227"
            tonoTitulo="italic font-light"
            titulo={
              <>
                {textos.capitulos.terapias.tituloLinea1}
                <br />
                <span className="text-dorado-claro">{textos.capitulos.terapias.tituloLinea2}</span>
              </>
            }
            bajada={textos.capitulos.terapias.bajada}
          >
            <div className="mt-8 flex items-center gap-4">
              <Logo
                src={marca.logoPiedras}
                alt={marca.nombreMarcaPiedras ?? "Logo de piedras y terapias"}
                pendiente="Logo terapias & piedras · próximamente"
                className="h-16 w-44 shrink-0 text-dorado/60"
              />
              {marca.nombreMarcaPiedras && (
                <p className="font-display text-xl italic">{marca.nombreMarcaPiedras}</p>
              )}
            </div>
          </EncabezadoCapitulo>
          <Ondas />
        </div>

        <div className="mt-16 space-y-6 md:mt-24 md:space-y-8">
          {terapias.map((t, i) => (
            <Aparecer
              key={t.id}
              as="article"
              className="rounded-[32px] border border-tinta-borde bg-tinta/60 p-6 backdrop-blur-sm md:p-10"
            >
              <div className="grid gap-10 md:grid-cols-2 md:gap-14">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-dorado">
                    {String(i + 1).padStart(2, "0")} · {t.bajada}
                  </p>
                  <h3 className="mt-3 font-display text-4xl italic md:text-5xl">{t.nombre}</h3>
                  <p className="mt-5 text-[17px] leading-relaxed text-crema/80">{t.queEs}</p>

                  <h4 className="mt-8 text-[11px] font-semibold uppercase tracking-[0.26em] text-dorado-claro">
                    Beneficios que se suelen describir
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {t.beneficios.map((b) => (
                      <li key={b} className="flex gap-3 leading-snug">
                        <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-dorado" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-dorado-claro">
                    {t.id === "reiki" ? "Cómo es una sesión" : "Cómo funciona"}
                  </h4>
                  <ol className="relative mt-5 space-y-6 border-l border-dorado/25 pl-7">
                    {t.comoFunciona.map((paso, j) => (
                      <li key={paso.titulo} className="relative">
                        <span className="absolute -left-[42px] top-0 flex h-7 w-7 items-center justify-center rounded-full border border-dorado/40 bg-tinta-suave font-display text-sm italic text-dorado-claro">
                          {j + 1}
                        </span>
                        <p className="font-display text-xl">{paso.titulo}</p>
                        <p className="mt-1 leading-relaxed text-crema/70">{paso.texto}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Aparecer>
          ))}
        </div>

        {/* Fotos reales de sesiones y ambiente — con forma de arco */}
        <div className="mt-16 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-4 md:gap-5">
          {fotosTerapias.map((f, i) => (
            <Aparecer key={f.alt} demora={i * 90}>
              <Foto
                src={f.src}
                alt={f.alt}
                ayuda="/public/fotos/terapias"
                className={`aspect-[3/4] rounded-t-full rounded-b-3xl border border-tinta-borde bg-tinta text-dorado/60 ${
                  i % 2 === 1 ? "md:translate-y-8" : ""
                }`}
              />
            </Aparecer>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 md:mt-24 md:flex-row md:items-center md:justify-between">
          <p className="max-w-lg font-display text-2xl italic leading-snug md:text-3xl">
            ¿Querés saber cuál te conviene? Contanos cómo estás y te orientamos.
          </p>
          <BotonWhatsApp mensaje={contacto.mensajesWhatsApp.terapias} variante="dorado" tamano="lg" className="w-full md:w-auto">
            Consultar por una sesión
          </BotonWhatsApp>
        </div>

          <p className="mt-10 max-w-3xl text-xs leading-relaxed text-crema/45">
            Las terapias alternativas son un acompañamiento complementario para el bienestar. No reemplazan
            diagnósticos ni tratamientos médicos o psicológicos.
          </p>
        </div>
      </div>
    </section>
  );
}

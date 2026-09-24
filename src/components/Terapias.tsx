import { contacto } from "@/config/contacto";
import { marca } from "@/data/marca";
import { fotosTerapias, terapias } from "@/data/terapias";
import Aparecer from "./Aparecer";
import BotonWhatsApp from "./BotonWhatsApp";
import { EncabezadoCapitulo } from "./Capitulo";
import { Foto, Logo } from "./Medios";

function Ondas() {
  return (
    <div aria-hidden className="relative mx-auto h-40 w-40 md:h-52 md:w-52">
      {[0, 1.5, 3].map((d) => (
        <span
          key={d}
          className="absolute inset-0 animate-ondas rounded-full border border-lavanda/50"
          style={{ animationDelay: `${d}s` }}
        />
      ))}
      <span className="absolute inset-[30%] animate-respirar rounded-full bg-gradient-to-br from-lavanda to-cobre-claro/70 blur-[2px]" />
    </div>
  );
}

export default function Terapias() {
  return (
    <section id="terapias" className="grano relative scroll-mt-14 overflow-hidden bg-ciruela text-lavanda-niebla md:scroll-mt-16">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-lavanda/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-40 h-96 w-96 rounded-full bg-cobre/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-6 md:px-6 md:pb-28">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <EncabezadoCapitulo
            numero="02"
            capitulo="La pausa"
            cuenta="#B3A5D6"
            tonoTitulo="italic font-light"
            titulo={
              <>
                Bajar un cambio,
                <br />
                <span className="text-lavanda">en el mismo lugar.</span>
              </>
            }
            bajada={
              <>
                Las terapias se hacen dentro del espacio de Meraki, en un rincón pensado para el silencio.
                Llegás por un corte y te quedás por la calma —o al revés.
              </>
            }
          >
            <div className="mt-8 flex items-center gap-4">
              <Logo
                src={marca.logoPiedras}
                alt={marca.nombreMarcaPiedras ?? "Logo de piedras y terapias"}
                pendiente="Logo terapias & piedras · próximamente"
                className="h-16 w-44 shrink-0 text-lavanda/70"
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
              className="rounded-[32px] border border-ciruela-borde bg-ciruela-profunda/60 p-6 backdrop-blur-sm md:p-10"
            >
              <div className="grid gap-10 md:grid-cols-2 md:gap-14">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-cobre-claro">
                    {String(i + 1).padStart(2, "0")} · {t.bajada}
                  </p>
                  <h3 className="mt-3 font-display text-4xl italic md:text-5xl">{t.nombre}</h3>
                  <p className="mt-5 text-[17px] leading-relaxed text-lavanda-niebla/85">{t.queEs}</p>

                  <h4 className="mt-8 text-[11px] font-semibold uppercase tracking-[0.26em] text-lavanda">
                    Beneficios que se suelen describir
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {t.beneficios.map((b) => (
                      <li key={b} className="flex gap-3 leading-snug">
                        <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-cobre-claro" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-lavanda">
                    {t.id === "reiki" ? "Cómo es una sesión" : "Cómo funciona"}
                  </h4>
                  <ol className="relative mt-5 space-y-6 border-l border-lavanda/25 pl-7">
                    {t.comoFunciona.map((paso, j) => (
                      <li key={paso.titulo} className="relative">
                        <span className="absolute -left-[42px] top-0 flex h-7 w-7 items-center justify-center rounded-full border border-lavanda/40 bg-ciruela font-display text-sm italic text-lavanda">
                          {j + 1}
                        </span>
                        <p className="font-display text-xl">{paso.titulo}</p>
                        <p className="mt-1 leading-relaxed text-lavanda-niebla/75">{paso.texto}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Aparecer>
          ))}
        </div>

        {/* Fotos de sesiones y ambiente — con forma de arco */}
        <div className="mt-16 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-4 md:gap-5">
          {fotosTerapias.map((f, i) => (
            <Aparecer key={f.alt} demora={i * 90}>
              <Foto
                src={f.src}
                alt={f.alt}
                ayuda="/public/fotos/terapias"
                className={`aspect-[3/4] rounded-t-full rounded-b-3xl border border-ciruela-borde bg-ciruela-profunda text-lavanda/70 ${
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
          <BotonWhatsApp mensaje={contacto.mensajesWhatsApp.terapias} variante="lavanda" tamano="lg" className="w-full md:w-auto">
            Consultar por una sesión
          </BotonWhatsApp>
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-lavanda-niebla/50">
          Las terapias alternativas son un acompañamiento complementario para el bienestar. No reemplazan
          diagnósticos ni tratamientos médicos o psicológicos.
        </p>
      </div>
    </section>
  );
}

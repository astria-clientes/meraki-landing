import { contacto } from "@/config/contacto";
import { linkMapa } from "@/lib/whatsapp";
import BotonWhatsApp from "./BotonWhatsApp";
import { Foto } from "./Medios";
import { IconoInstagram, IconoMail, IconoReloj, IconoUbicacion } from "./Iconos";

const hilos = ["Un corte", "Una pausa", "Una piedra"];

export default function Visitanos() {
  const { direccion, horarios, email, instagram, whatsapp, textos } = contacto;

  return (
    <section id="visitanos" className="grano relative scroll-mt-14 overflow-hidden bg-tinta text-crema md:scroll-mt-16">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cobre/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-6 text-center md:px-6 md:pb-24">
        {/* El collar se cierra: las tres cuentas juntas */}
        <div aria-hidden className="mx-auto flex w-fit items-center gap-6">
          {["#221912", "#C9A227", "#B8823D"].map((c) => (
            <span key={c} className="h-4 w-4 rounded-full ring-1 ring-cobre ring-offset-4 ring-offset-tinta" style={{ background: c }} />
          ))}
        </div>

        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-cobre-claro">
          {hilos.join(" · ")}
        </p>
        <h2 className="mt-5 font-display text-[2.8rem] leading-[1] tracking-tight sm:text-6xl md:text-8xl">
          {textos.tituloContacto}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-crema/75 md:text-lg">{textos.bajadaContacto}</p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <BotonWhatsApp tamano="lg" className="w-full sm:w-auto" />
          <p className="text-sm text-crema/55">WhatsApp {whatsapp.textoVisible}</p>
        </div>

        <div className="mt-14 grid gap-3 text-left sm:grid-cols-2">
          <a
            href={linkMapa()}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-3xl border border-tinta-borde bg-tinta-suave transition-colors hover:border-cobre/60"
          >
            <Foto
              src="/fotos/local/fachada.jpg"
              alt="Fachada de Meraki, entrada del local"
              className="aspect-[16/9]"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
            <div className="p-6">
              <IconoUbicacion className="h-6 w-6 text-cobre-claro" />
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-crema/50">Dónde estamos</p>
              <p className="mt-1.5 font-display text-2xl">{direccion.calle}</p>
              <p className="text-crema/70">{direccion.ciudad}</p>
              {direccion.referencia && <p className="mt-1 text-sm text-crema/50">{direccion.referencia}</p>}
              <p className="mt-4 text-sm font-semibold text-cobre-claro group-hover:underline">Cómo llegar →</p>
            </div>
          </a>
          <div className="rounded-3xl border border-tinta-borde bg-tinta-suave p-6">
            <IconoReloj className="h-6 w-6 text-cobre-claro" />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-crema/50">Horarios</p>
            <ul className="mt-2 space-y-2">
              {horarios.map((h) => (
                <li key={h.dias} className="flex flex-wrap justify-between gap-x-4 border-b border-crema/10 pb-2 last:border-0">
                  <span className="text-crema/70">{h.dias}</span>
                  <span className="font-semibold">{h.horas}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {(email || instagram) && (
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
            {instagram && (
              <a
                href={`https://instagram.com/${instagram.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-crema/75 hover:text-cobre-claro"
              >
                <IconoInstagram /> @{instagram.replace(/^@/, "")}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 text-crema/75 hover:text-cobre-claro">
                <IconoMail /> {email}
              </a>
            )}
          </div>
        )}
      </div>

      <footer className="relative border-t border-crema/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 pb-24 text-xs text-crema/40 md:flex-row md:px-6 md:pb-6">
          <p>
            <span className="font-display text-base text-crema/70">Meraki</span> · Peluquería, terapias y piedras ·{" "}
            {direccion.ciudad}
          </p>
          <p>© {new Date().getFullYear()} Meraki</p>
        </div>
      </footer>
    </section>
  );
}

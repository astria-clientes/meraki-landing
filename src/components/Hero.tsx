import Image from "next/image";
import Link from "next/link";
import { contacto } from "@/config/contacto";
import { textos } from "@/data/textos";
import Aparecer from "./Aparecer";
import BotonWhatsApp from "./BotonWhatsApp";
import { IconoFlecha, IconoTijera } from "./Iconos";

/* Íconos chicos y propios para el índice de capítulos — mismo trazo fino
 * que el resto de Iconos.tsx, para que no compitan en estilo. */
function IconoOnda({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className={className}>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="6.5" />
      <circle cx="12" cy="12" r="10.2" opacity=".5" />
    </svg>
  );
}

function IconoGema({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M6 3h12l4 6-10 12L2 9Z" />
      <path d="M2 9h20M9 3l3 6-3 12M15 3l-3 6 3 12" />
    </svg>
  );
}

const cuentas = [
  { href: "/peluqueria", n: "01", titulo: "El oficio", texto: "Peluquería & barbería", color: "#221912", Icono: IconoTijera },
  { href: "/terapias", n: "02", titulo: "La pausa", texto: "Reiki & armonización sonora", color: "#C9A227", Icono: IconoOnda },
  { href: "/piedras", n: "03", titulo: "La piedra", texto: "Bijou & piedras semipreciosas", color: "#B8823D", Icono: IconoGema },
];

export default function Hero() {
  return (
    <section id="inicio" className="grano relative overflow-hidden bg-crema">
      {/* Tres luces, una por capítulo, mezcladas en el mismo fondo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cobre/25 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -right-20 top-40 h-72 w-72 animate-respirar rounded-full bg-dorado/30 blur-3xl md:h-[28rem] md:w-[28rem]" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-salvia-clara/50 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-12 pt-10 md:grid-cols-[1.25fr_1fr] md:items-end md:gap-10 md:px-6 md:pb-24 md:pt-24">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cobre-oscuro">
            {contacto.direccion.ciudad}
          </p>

          <div className="relative w-fit">
            <h1 className="mt-4 bg-gradient-to-r from-tinta via-cobre-claro to-tinta bg-[length:220%_auto] bg-clip-text font-display text-[3.6rem] leading-[0.85] tracking-[-0.03em] text-transparent animate-destello sm:text-[5.5rem] md:text-[9.5rem]">
              Meraki
            </h1>
            {/* La estrella de la marca, brillando junto al nombre */}
            <span
              aria-hidden
              className="absolute -right-1 -top-1 h-7 w-7 animate-brillo sm:-right-2 sm:-top-2 sm:h-10 sm:w-10 md:-right-3 md:-top-4 md:h-16 md:w-16"
            >
              <Image src="/logos/estrella.png" alt="" fill sizes="64px" className="object-contain" />
            </span>
          </div>

          <p className="mt-4 font-display text-lg italic text-tinta/70 md:text-xl">
            <span lang="el">μεράκι</span> {textos.hero.eslogan}
          </p>
          <p className="mt-8 max-w-md text-[17px] leading-relaxed text-tinta/80 md:text-lg">{textos.hero.bajada}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BotonWhatsApp tamano="lg" />
            <Link
              href="/peluqueria"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-5 py-4 text-[15px] font-semibold text-tinta/80 transition-colors hover:text-cobre"
            >
              Recorré el espacio
              <IconoFlecha className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Índice en forma de collar: tres cuentas en un mismo hilo */}
        <nav aria-label="Los tres capítulos de Meraki" className="relative">
          <div aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-cobre/0 via-cobre to-cobre/0" />
          <ol className="space-y-2">
            {cuentas.map((c, i) => (
              <Aparecer key={c.n} as="li" demora={i * 130}>
                <Link
                  href={c.href}
                  className="group relative flex items-center gap-5 overflow-hidden rounded-2xl py-3.5 pl-1 pr-4 transition-colors"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `linear-gradient(110deg, ${c.color}22, transparent 70%)` }}
                  />
                  <span
                    className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-crema ring-1 ring-cobre ring-offset-[5px] ring-offset-crema transition-transform duration-300 group-hover:scale-110"
                    style={{ background: c.color }}
                  >
                    <c.Icono className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-cobre-oscuro">
                      {c.n} · {c.titulo}
                    </span>
                    <span className="mt-0.5 block font-display text-xl text-tinta md:text-2xl">{c.texto}</span>
                  </span>
                  <IconoFlecha className="h-4 w-4 shrink-0 text-tinta/40 transition-transform group-hover:translate-x-1 group-hover:text-cobre" />
                </Link>
              </Aparecer>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

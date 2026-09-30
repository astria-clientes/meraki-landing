"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { textos } from "@/data/textos";
import Aparecer from "./Aparecer";
import BotonWhatsApp from "./BotonWhatsApp";
import { IconoFlecha } from "./Iconos";
import { useNavegacionHoja } from "./TransicionHoja";

/* Geometría sagrada, la misma que cuelga en las fotos reales del local
 * (la flor de la vida y el Sri Yantra enmarcados en la peluquería) —
 * acá como trazo fino de fondo, no como ícono grande. La tercera, el
 * merkaba, es la propia estrella de la marca. */
function FlorDeVida({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6" aria-hidden className={className}>
      <circle cx="50" cy="50" r="15" />
      <circle cx="65" cy="50" r="15" />
      <circle cx="57.5" cy="37" r="15" />
      <circle cx="42.5" cy="37" r="15" />
      <circle cx="35" cy="50" r="15" />
      <circle cx="42.5" cy="63" r="15" />
      <circle cx="57.5" cy="63" r="15" />
    </svg>
  );
}

function SriYantra({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6" aria-hidden className={className}>
      <circle cx="50" cy="50" r="42" />
      <polygon points="50,10 90,80 10,80" />
      <polygon points="50,90 10,20 90,20" />
      <polygon points="50,28 74,68 26,68" />
      <polygon points="50,72 26,32 74,32" />
    </svg>
  );
}

function Merkaba({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6" aria-hidden className={className}>
      <polygon points="50,12 88,80 12,80" />
      <polygon points="50,88 12,20 88,20" />
    </svg>
  );
}

const capitulos = [
  {
    href: "/peluqueria",
    n: "01",
    titulo: "El oficio",
    texto: "Peluquería & barbería",
    numeral: "text-tinta",
    tinte: "bg-tinta/[0.035] group-hover:bg-tinta/[0.06]",
    Geometria: FlorDeVida,
  },
  {
    href: "/terapias",
    n: "02",
    titulo: "La pausa",
    texto: "Reiki & armonización sonora",
    numeral: "text-dorado-oscuro",
    tinte: "bg-dorado/5 group-hover:bg-dorado/[0.09]",
    Geometria: SriYantra,
  },
  {
    href: "/piedras",
    n: "03",
    titulo: "La piedra",
    texto: "Bijou & piedras semipreciosas",
    numeral: "text-cobre-oscuro",
    tinte: "bg-cobre/5 group-hover:bg-cobre/[0.09]",
    Geometria: Merkaba,
  },
];

export default function Hero() {
  const navegarConHoja = useNavegacionHoja();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [slideActiva, setSlideActiva] = useState(0);

  function alScrollear() {
    const el = scrollerRef.current;
    if (!el) return;
    const activa = Math.round(el.scrollLeft / el.clientWidth);
    setSlideActiva(activa);
  }

  function irASlide(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  function alTocarCapitulo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navegarConHoja(href);
  }

  return (
    <section id="inicio" className="grano relative overflow-hidden bg-crema">
      {/* Tres luces, una por capítulo, mezcladas en el mismo fondo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cobre/25 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -right-20 top-40 h-72 w-72 animate-respirar rounded-full bg-dorado/30 blur-3xl md:h-[28rem] md:w-[28rem]" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-salvia-clara/50 blur-3xl" />
      </div>

      {/* En celular: dos pantallas que se deslizan (intro, capítulos). En PC:
          la misma grilla de siempre, lado a lado, sin nada para deslizar. */}
      <div
        ref={scrollerRef}
        onScroll={alScrollear}
        className="sin-scrollbar relative flex snap-x snap-mandatory overflow-x-auto md:mx-auto md:grid md:max-w-6xl md:snap-none md:grid-cols-[1.25fr_1fr] md:items-center md:gap-10 md:overflow-visible md:px-6"
      >
        {/* Slide 1: presentación */}
        <div className="w-full shrink-0 snap-center px-4 pb-14 pt-10 md:w-auto md:shrink md:px-0 md:pb-24 md:pt-24">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <h1 className="font-display text-[3.6rem] leading-[0.85] tracking-[-0.03em] text-tinta sm:text-[5.5rem] md:text-[8.5rem]">
                Meraki
              </h1>
              {/* La estrella de la marca, quieta, brillando a la derecha del nombre */}
              <span aria-hidden className="relative h-9 w-9 shrink-0 animate-brillo sm:h-14 sm:w-14 md:h-[5.5rem] md:w-[5.5rem]">
                <Image src="/logos/estrella.png" alt="" fill sizes="88px" className="object-contain" />
              </span>
            </div>

            <p className="mt-4 font-display text-lg italic text-tinta/70 md:text-xl">
              <span lang="el">μεράκι</span> {textos.hero.eslogan}
            </p>
            <p className="mt-8 max-w-md text-[17px] leading-relaxed text-tinta/80 md:text-lg">{textos.hero.bajada}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BotonWhatsApp tamano="lg" variante="calmo">
                Contactanos
              </BotonWhatsApp>
              <button
                type="button"
                onClick={() => irASlide(1)}
                className="group inline-flex items-center justify-center gap-2 rounded-full px-5 py-4 text-[15px] font-semibold text-tinta/80 transition-colors hover:text-cobre md:hidden"
              >
                Ver los capítulos
                <IconoFlecha className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                href="/peluqueria"
                onClick={(e) => alTocarCapitulo(e, "/peluqueria")}
                className="group hidden items-center justify-center gap-2 rounded-full px-5 py-4 text-[15px] font-semibold text-tinta/80 transition-colors hover:text-cobre md:inline-flex"
              >
                Recorré el espacio
                <IconoFlecha className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Aviso de que hay más para deslizar — solo en celular, solo acá */}
          <div className="mt-10 flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cobre-oscuro/70 md:hidden">
            <span>Deslizá para ver los capítulos</span>
            <IconoFlecha className="h-3.5 w-3.5 animate-deslizar" />
          </div>
        </div>

        {/* Slide 2 (mobile) / columna derecha (PC): los tres capítulos,
            editorial: número grande, geometría sagrada de fondo (la misma
            que cuelga en las fotos reales) — en el celular, franjas
            completas con separadores finos; en PC, integrados al fondo
            crema, sin caja ni borde. Tocar un capítulo dispara la hoja. */}
        <div className="flex w-full shrink-0 snap-center flex-col justify-center px-4 pb-14 md:w-auto md:shrink md:block md:px-0 md:pb-0">
          <nav aria-label="Los tres capítulos de Meraki" className="border-t border-tinta/10 md:border-t-0">
            {capitulos.map((c, i) => (
              <Aparecer key={c.n} demora={i * 140}>
                <Link
                  href={c.href}
                  onClick={(e) => alTocarCapitulo(e, c.href)}
                  className={`group relative flex items-center gap-4 overflow-hidden border-b border-tinta/10 py-6 transition-colors duration-500 sm:gap-8 sm:py-8 md:gap-5 md:border-b-0 md:bg-transparent md:py-4 ${c.tinte}`}
                >
                  <c.Geometria className="pointer-events-none absolute -left-6 top-1/2 h-32 w-32 -translate-y-1/2 opacity-[0.07] transition-all duration-500 ease-out group-hover:opacity-[0.14] sm:h-48 sm:w-48 md:-left-3 md:h-28 md:w-28" />

                  <span
                    className={`relative shrink-0 select-none font-display text-4xl italic leading-none transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:text-7xl md:text-6xl ${c.numeral}`}
                  >
                    {c.n}
                  </span>

                  <span className="relative min-w-0 flex-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-cobre-oscuro sm:text-[11px] sm:tracking-[0.28em]">
                      {c.titulo}
                    </span>
                    <span className="mt-1 block font-display text-lg leading-snug text-tinta transition-colors duration-500 sm:mt-1.5 sm:text-3xl md:text-xl">
                      {c.texto}
                    </span>
                  </span>

                  <IconoFlecha className="relative h-4 w-4 shrink-0 text-tinta/30 transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:text-cobre sm:h-5 sm:w-5" />
                </Link>
              </Aparecer>
            ))}
          </nav>
        </div>
      </div>

      {/* Puntitos de la pantalla activa — solo celular */}
      <div className="relative flex items-center justify-center gap-2 pb-6 md:hidden">
        {[0, 1].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={i === 0 ? "Ir a la presentación" : "Ir a los capítulos"}
            onClick={() => irASlide(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              slideActiva === i ? "w-6 bg-cobre" : "w-1.5 bg-tinta/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

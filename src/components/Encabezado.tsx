"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BotonWhatsApp from "./BotonWhatsApp";

const enlaces = [
  { href: "/peluqueria", texto: "Peluquería" },
  { href: "/terapias", texto: "Terapias" },
  { href: "/piedras", texto: "Piedras & bijou" },
  { href: "/visitanos", texto: "Visitanos" },
];

export default function Encabezado() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-tinta/10 bg-crema/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:h-16 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-2xl tracking-tight text-tinta"
          aria-label="Meraki, ir al inicio"
        >
          <span className="relative h-8 w-8 shrink-0 md:h-9 md:w-9">
            <Image src="/logos/estrella.png" alt="" fill sizes="36px" className="object-contain" />
          </span>
          Meraki<span className="text-cobre">.</span>
        </Link>
        <nav aria-label="Secciones" className="hidden items-center gap-7 text-sm font-medium text-tinta/75 md:flex">
          {enlaces.map((e) => {
            const activo = pathname === e.href;
            return (
              <Link
                key={e.href}
                href={e.href}
                aria-current={activo ? "page" : undefined}
                className={`transition-colors hover:text-cobre ${activo ? "font-semibold text-cobre-oscuro" : ""}`}
              >
                {e.texto}
              </Link>
            );
          })}
        </nav>
        <BotonWhatsApp tamano="sm" variante="oscuro">
          WhatsApp
        </BotonWhatsApp>
      </div>
    </header>
  );
}

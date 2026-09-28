import Image from "next/image";
import BotonWhatsApp from "./BotonWhatsApp";

const enlaces = [
  { href: "#peluqueria", texto: "Peluquería" },
  { href: "#terapias", texto: "Terapias" },
  { href: "#piedras", texto: "Piedras & bijou" },
  { href: "#visitanos", texto: "Visitanos" },
];

export default function Encabezado() {
  return (
    <header className="sticky top-0 z-40 border-b border-tinta/10 bg-crema/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:h-16 md:px-6">
        <a
          href="#inicio"
          className="flex items-center gap-2.5 font-display text-2xl tracking-tight text-tinta"
          aria-label="Meraki, ir al inicio"
        >
          <span className="relative h-8 w-8 shrink-0 md:h-9 md:w-9">
            <Image src="/logos/estrella.png" alt="" fill sizes="36px" className="object-contain" />
          </span>
          Meraki<span className="text-cobre">.</span>
        </a>
        <nav aria-label="Secciones" className="hidden items-center gap-7 text-sm font-medium text-tinta/75 md:flex">
          {enlaces.map((e) => (
            <a key={e.href} href={e.href} className="transition-colors hover:text-cobre">
              {e.texto}
            </a>
          ))}
        </nav>
        <BotonWhatsApp tamano="sm" variante="oscuro">
          WhatsApp
        </BotonWhatsApp>
      </div>
    </header>
  );
}

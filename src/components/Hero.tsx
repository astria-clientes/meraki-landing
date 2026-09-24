import { contacto } from "@/config/contacto";
import BotonWhatsApp from "./BotonWhatsApp";
import { IconoFlecha } from "./Iconos";

const cuentas = [
  { href: "#peluqueria", n: "01", titulo: "El oficio", texto: "Peluquería & barbería", color: "#1B1411" },
  { href: "#terapias", n: "02", titulo: "La pausa", texto: "Reiki & armonización sonora", color: "#B3A5D6" },
  { href: "#piedras", n: "03", titulo: "La piedra", texto: "Bijou & piedras semipreciosas", color: "#E0A77C" },
];

export default function Hero() {
  return (
    <section id="inicio" className="grano relative overflow-hidden bg-hueso">
      {/* Tres luces, una por capítulo, mezcladas en el mismo fondo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cobre/25 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -right-20 top-40 h-72 w-72 animate-respirar rounded-full bg-lavanda/40 blur-3xl md:h-[28rem] md:w-[28rem]" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-salvia-clara/50 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 pb-16 pt-12 md:grid-cols-[1.25fr_1fr] md:items-end md:gap-10 md:px-6 md:pb-24 md:pt-24">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cobre-oscuro">
            {contacto.direccion.ciudad}
          </p>
          <h1 className="mt-4 font-display text-[5.2rem] leading-[0.85] tracking-[-0.03em] text-tinta sm:text-[7rem] md:text-[9.5rem]">
            Meraki
          </h1>
          <p className="mt-4 font-display text-lg italic text-tinta/70 md:text-xl">
            <span lang="el">μεράκι</span> — poner el alma en lo que hacés.
          </p>
          <p className="mt-8 max-w-md text-[17px] leading-relaxed text-tinta/80 md:text-lg">
            Un mismo espacio donde conviven la tijera, la calma y la piedra. Vení a cortarte el pelo,
            a bajar un cambio o a elegir la piedra que te acompañe.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BotonWhatsApp tamano="lg" />
            <a
              href="#peluqueria"
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-4 text-[15px] font-semibold text-tinta/80 transition-colors hover:text-cobre"
            >
              Recorré el espacio <IconoFlecha className="h-4 w-4 rotate-90" />
            </a>
          </div>
        </div>

        {/* Índice en forma de collar: tres cuentas en un mismo hilo */}
        <nav aria-label="Los tres capítulos de Meraki" className="relative">
          <div aria-hidden className="absolute bottom-6 left-[15px] top-6 w-px bg-gradient-to-b from-cobre/0 via-cobre to-cobre/0" />
          <ol className="space-y-3">
            {cuentas.map((c) => (
              <li key={c.n}>
                <a
                  href={c.href}
                  className="group relative flex items-center gap-5 rounded-2xl py-3 pr-4 transition-colors hover:bg-white/50"
                >
                  <span
                    className="relative z-10 h-8 w-8 shrink-0 rounded-full ring-1 ring-cobre ring-offset-[5px] ring-offset-hueso transition-transform duration-300 group-hover:scale-110"
                    style={{ background: c.color }}
                  />
                  <span className="flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-cobre-oscuro">
                      {c.n} · {c.titulo}
                    </span>
                    <span className="mt-0.5 block font-display text-xl text-tinta md:text-2xl">{c.texto}</span>
                  </span>
                  <IconoFlecha className="h-4 w-4 text-tinta/40 transition-transform group-hover:translate-x-1 group-hover:text-cobre" />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

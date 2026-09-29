import Link from "next/link";
import { IconoFlecha } from "./Iconos";

type Parada = { href: string; numero?: string; nombre: string };

/** Al final de cada capítulo: invita a seguir el recorrido en orden, sin tener que volver al inicio. */
export default function NavegacionCapitulos({
  anterior,
  siguiente,
}: {
  anterior: Parada;
  siguiente?: Parada;
}) {
  return (
    <nav aria-label="Navegación entre capítulos" className="border-t border-tinta/10 bg-crema">
      <div className="mx-auto grid max-w-6xl divide-y divide-tinta/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
        <Link href={anterior.href} className="group flex items-center gap-4 px-4 py-8 md:px-6 md:py-10">
          <IconoFlecha className="h-4 w-4 shrink-0 rotate-180 text-tinta/40 transition-transform group-hover:-translate-x-1 group-hover:text-cobre" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cobre-oscuro">
              {anterior.numero ? "Capítulo anterior" : "Volver"}
            </p>
            <p className="mt-1 font-display text-xl text-tinta md:text-2xl">
              {anterior.numero ? `${anterior.numero} · ${anterior.nombre}` : anterior.nombre}
            </p>
          </div>
        </Link>

        {siguiente ? (
          <Link href={siguiente.href} className="group flex items-center justify-between gap-4 px-4 py-8 md:px-6 md:py-10 sm:justify-end sm:text-right">
            <div className="sm:order-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cobre-oscuro">
                {siguiente.numero ? "Capítulo siguiente" : "Seguí recorriendo"}
              </p>
              <p className="mt-1 font-display text-xl text-tinta md:text-2xl">
                {siguiente.numero ? `${siguiente.numero} · ${siguiente.nombre}` : siguiente.nombre}
              </p>
            </div>
            <IconoFlecha className="h-4 w-4 shrink-0 text-tinta/40 transition-transform group-hover:translate-x-1 group-hover:text-cobre sm:order-2" />
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </nav>
  );
}

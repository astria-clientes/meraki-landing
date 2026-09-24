/* --------------------------------------------------------------------------
 * El "hilo": un cordón de cobre que atraviesa la página y ensarta cada
 * capítulo como una cuenta de un collar. Es lo que une los tres mundos.
 * -------------------------------------------------------------------------- */

/** Transición entre capítulos: fundido de color + hilo + cuenta. */
export function Enhebrado({
  desde,
  hacia,
  cuenta,
}: {
  desde: string;
  hacia: string;
  cuenta: string;
}) {
  return (
    <div
      aria-hidden
      className="relative h-28 md:h-36"
      style={{ background: `linear-gradient(to bottom, ${desde}, ${hacia})` }}
    >
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-cobre/0 via-cobre to-cobre/0" />
      <div
        className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-cobre ring-offset-4"
        style={{ background: cuenta, ["--tw-ring-offset-color" as string]: "transparent" }}
      />
    </div>
  );
}

/** Encabezado de capítulo: número, nombre del capítulo y título. */
export function EncabezadoCapitulo({
  numero,
  capitulo,
  titulo,
  bajada,
  cuenta,
  tonoTitulo = "",
  children,
}: {
  numero: string;
  capitulo: string;
  titulo: React.ReactNode;
  bajada?: React.ReactNode;
  cuenta: string;
  tonoTitulo?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative">
      <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]">
        <span className="h-2.5 w-2.5 rounded-full ring-1 ring-cobre ring-offset-2 ring-offset-transparent" style={{ background: cuenta }} />
        <span className="text-cobre-claro">Capítulo {numero}</span>
        <span className="h-px w-8 bg-cobre/60" />
        <span className="opacity-70">{capitulo}</span>
      </div>
      <h2 className={`mt-5 font-display text-[2.6rem] leading-[1.02] tracking-tight sm:text-6xl md:text-7xl ${tonoTitulo}`}>
        {titulo}
      </h2>
      {bajada && <p className="mt-5 max-w-xl text-[17px] leading-relaxed opacity-80">{bajada}</p>}
      {children}
    </header>
  );
}

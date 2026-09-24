function ajustar(hex: string, cantidad: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  const canal = (valor: number) => Math.max(0, Math.min(255, valor + cantidad));
  const r = canal((n >> 16) & 255);
  const g = canal((n >> 8) & 255);
  const b = canal(n & 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/** Gema facetada dibujada a partir de un único color (se aclara y oscurece solo). */
export default function Gema({
  color,
  id,
  className = "h-16 w-16",
  apagada = false,
}: {
  color: string;
  id: string;
  className?: string;
  apagada?: boolean;
}) {
  const claro = ajustar(color, 55);
  const oscuro = ajustar(color, -60);
  const g = `gema-${id}`;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden style={apagada ? { filter: "saturate(.7)" } : undefined}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={claro} />
          <stop offset="1" stopColor={oscuro} />
        </linearGradient>
      </defs>
      <path d="M18 8h28l12 16-26 34L6 24 18 8Z" fill={`url(#${g})`} />
      <g fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth=".9" strokeLinejoin="round">
        <path d="M18 8h28l12 16-26 34L6 24 18 8Z" strokeOpacity=".25" />
        <path d="M6 24h52M18 8l6 16 8-16 8 16 6-16M24 24l8 34 8-34" />
      </g>
      <path d="M18 8h14l-8 16H6L18 8Z" fill="#fff" opacity=".22" />
    </svg>
  );
}

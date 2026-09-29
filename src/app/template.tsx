/* A diferencia de layout.tsx, este archivo se vuelve a montar en cada
 * navegación — así cada capítulo entra con un fundido + una leve subida,
 * en vez de aparecer de golpe. Sin librerías nuevas, solo CSS. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-entrada">{children}</div>;
}

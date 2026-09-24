import Image from "next/image";
import { IconoFoto, IconoPlay } from "./Iconos";

/* --------------------------------------------------------------------------
 * Recuadros de contenido pendiente. Cuando se carga la ruta real en /src/data,
 * se reemplazan solos por la foto, el video o el logo.
 * -------------------------------------------------------------------------- */

function Pendiente({
  etiqueta,
  ayuda,
  icono,
  className = "",
}: {
  etiqueta: string;
  ayuda?: string;
  icono: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-[inherit] p-4 text-center ${className}`}
    >
      <div className="rayado absolute inset-0 opacity-[0.07]" aria-hidden />
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-current opacity-60">
        {icono}
      </div>
      <p className="relative text-sm font-semibold opacity-80">{etiqueta}</p>
      {ayuda && <p className="relative font-mono text-[10px] leading-tight opacity-50">{ayuda}</p>}
    </div>
  );
}

export function Foto({
  src,
  alt,
  className = "",
  sizes = "(min-width: 768px) 33vw, 50vw",
  ayuda,
}: {
  src: string | null | undefined;
  alt: string;
  className?: string;
  sizes?: string;
  ayuda?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <Pendiente etiqueta={alt} ayuda={ayuda ?? "Foto pendiente"} icono={<IconoFoto />} />
      )}
    </div>
  );
}

export function Video({
  src,
  poster,
  titulo,
  formato,
  className = "",
}: {
  src: string | null;
  poster: string | null;
  titulo: string;
  formato: "vertical" | "horizontal";
  className?: string;
}) {
  const aspecto = formato === "vertical" ? "aspect-[9/16]" : "aspect-video";
  return (
    <figure className={`relative overflow-hidden ${aspecto} ${className}`}>
      {src ? (
        <video
          src={src}
          poster={poster ?? undefined}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          aria-label={titulo}
        />
      ) : (
        <Pendiente
          etiqueta={titulo}
          ayuda="Video pendiente · /public/videos"
          icono={<IconoPlay className="ml-0.5 h-5 w-5" />}
        />
      )}
      <figcaption className="sr-only">{titulo}</figcaption>
    </figure>
  );
}

export function Logo({
  src,
  alt,
  pendiente,
  className = "",
}: {
  src: string | null;
  alt: string;
  pendiente: string;
  className?: string;
}) {
  if (src) {
    return (
      <div className={`relative ${className}`}>
        <Image src={src} alt={alt} fill sizes="200px" className="object-contain" />
      </div>
    );
  }
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed border-current text-center ${className}`}
      role="img"
      aria-label={`${alt} (pendiente)`}
    >
      <div className="rayado absolute inset-0 opacity-[0.08]" aria-hidden />
      <span className="relative px-2 text-[10px] font-semibold uppercase leading-tight tracking-[0.18em] opacity-70">
        {pendiente}
      </span>
    </div>
  );
}

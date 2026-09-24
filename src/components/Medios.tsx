"use client";

import Image from "next/image";
import { useRef, useState } from "react";
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
  posicion,
}: {
  src: string | null | undefined;
  alt: string;
  className?: string;
  sizes?: string;
  ayuda?: string;
  /** object-position CSS, ej. "center 30%", para reencuadrar sin recortar lo importante. */
  posicion?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={posicion ? { objectPosition: posicion } : undefined}
        />
      ) : (
        <Pendiente etiqueta={alt} ayuda={ayuda ?? "Foto pendiente"} icono={<IconoFoto />} />
      )}
    </div>
  );
}

/**
 * Clip de video, reproducible al tocar: nunca autoplay. Mientras no haya un
 * archivo real cargado, si hay una foto de portada la muestra como adelanto
 * (con un botón de play encima); si tampoco hay foto, muestra el recuadro
 * "video pendiente".
 */
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
  const [reproduciendo, setReproduciendo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const aspecto = formato === "vertical" ? "aspect-[9/16]" : "aspect-video";

  const reproducir = () => {
    setReproduciendo(true);
    requestAnimationFrame(() => videoRef.current?.play());
  };

  if (!src && !poster) {
    return (
      <figure className={`relative overflow-hidden ${aspecto} ${className}`}>
        <Pendiente
          etiqueta={titulo}
          ayuda="Video pendiente · /public/videos"
          icono={<IconoPlay className="ml-0.5 h-5 w-5" />}
        />
        <figcaption className="sr-only">{titulo}</figcaption>
      </figure>
    );
  }

  return (
    <figure className={`relative overflow-hidden ${aspecto} ${className}`}>
      {src && reproduciendo ? (
        <video
          ref={videoRef}
          src={src}
          controls
          playsInline
          autoPlay
          preload="metadata"
          className="h-full w-full bg-black object-contain"
          aria-label={titulo}
        />
      ) : (
        <button
          type="button"
          onClick={src ? reproducir : undefined}
          aria-label={src ? `Reproducir: ${titulo}` : `${titulo} (video pendiente)`}
          className={`group absolute inset-0 h-full w-full ${src ? "cursor-pointer" : "cursor-default"}`}
        >
          {poster ? (
            <Image src={poster} alt={titulo} fill sizes="400px" className="object-cover" />
          ) : (
            <div className="h-full w-full bg-tinta-suave" />
          )}
          <span className="absolute inset-0 bg-tinta/35 transition-colors group-hover:bg-tinta/20" aria-hidden />
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-crema">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-crema/90 text-tinta shadow-lg transition-transform group-hover:scale-105">
              <IconoPlay className="ml-1 h-6 w-6" />
            </span>
            <span className="rounded-full bg-tinta/70 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              {src ? titulo : "Video pendiente"}
            </span>
          </span>
        </button>
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

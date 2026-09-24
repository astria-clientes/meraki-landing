/* ==========================================================================
 *  CAPÍTULO 01 · PELUQUERÍA & BARBERÍA
 *  El contenido real vive en /content/peluqueria.json (editable a mano o
 *  desde /admin).
 *  - foto: ruta dentro de /public (ej. "/fotos/equipo/estacion-diego.jpg") o null.
 *  - Videos: cuando el cliente mande los .mp4 (los va a nombrar
 *    video-peluqueria-01.mp4, video-peluqueria-02.mp4, ...), subirlos a
 *    /public/videos/ con ese mismo nombre y completar "src".
 *    "poster" es la imagen que se ve antes de tocar play — mientras no haya
 *    video, esa misma foto se usa como adelanto.
 *    formato: "vertical" (reels / historias, 9:16) u "horizontal" (16:9).
 * ========================================================================== */
import peluqueriaJson from "../../content/peluqueria.json";

export type Profesional = {
  nombre: string;
  especialidad: string;
  descripcion: string;
  servicios: string[];
  foto: string | null;
  /** Qué mensaje de /config/contacto.ts usa su botón de WhatsApp. */
  mensaje: "barberia" | "peluqueria";
};

export type Video = {
  src: string | null;
  poster: string | null;
  titulo: string;
  formato: "vertical" | "horizontal";
};

const data = peluqueriaJson as { profesionales: Profesional[]; videos: Video[] };

export const profesionales = data.profesionales;
export const videos = data.videos;

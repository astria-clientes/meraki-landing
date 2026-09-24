/* ==========================================================================
 *  CAPÍTULO 01 · PELUQUERÍA & BARBERÍA
 *  - foto: ruta dentro de /public (ej. "/fotos/equipo/estacion-diego.jpg") o null.
 *  - Videos: cuando el cliente mande los .mp4 (los va a nombrar
 *    video-peluqueria-01.mp4, video-peluqueria-02.mp4, ...), subirlos a
 *    /public/videos/ con ese mismo nombre y completar "src" acá abajo.
 *    "poster" es la imagen que se ve antes de tocar play — mientras no haya
 *    video, esa misma foto se usa como adelanto.
 *    formato: "vertical" (reels / historias, 9:16) u "horizontal" (16:9).
 * ========================================================================== */

export type Profesional = {
  nombre: string;
  especialidad: string;
  descripcion: string;
  servicios: string[];
  foto: string | null;
  /** Qué mensaje de /config/contacto.ts usa su botón de WhatsApp. */
  mensaje: "barberia" | "peluqueria";
};

export const profesionales: Profesional[] = [
  {
    nombre: "Diego Campos",
    especialidad: "Barbería & corte masculino",
    descripcion:
      "Cortes clásicos y actuales, degradés prolijos y barba trabajada a mano. Sin apuro y con detalle. " +
      "Diego también es quien da las sesiones de Reiki y armonización sonora — ver capítulo 02.",
    servicios: ["Corte masculino", "Degradé / fade", "Perfilado y arreglo de barba"],
    foto: "/fotos/equipo/estacion-diego.jpg",
    mensaje: "barberia",
  },
  {
    nombre: "Ayelen Villa",
    especialidad: "Peluquería unisex & tratamientos capilares",
    descripcion:
      "Cortes para todas las personas y tratamientos para devolverle vida al pelo: hidratación, nutrición y reparación.",
    servicios: ["Corte unisex", "Tratamientos capilares", "Hidratación y nutrición"],
    foto: "/fotos/equipo/estacion-ayelen.jpg",
    mensaje: "peluqueria",
  },
];

export type Video = {
  src: string | null;
  poster: string | null;
  titulo: string;
  formato: "vertical" | "horizontal";
};

// Las fotos reales del local sirven como adelanto (poster) hasta que lleguen
// los videos. Cuando el cliente mande video-peluqueria-01.mp4, etc., basta
// con completar el campo "src" de cada uno.
export const videos: Video[] = [
  { src: null, poster: "/fotos/local/salon-general.jpg", titulo: "El local", formato: "vertical" },
  { src: null, poster: "/fotos/equipo/estacion-diego.jpg", titulo: "Barbería en acción", formato: "vertical" },
  { src: null, poster: "/fotos/equipo/estacion-ayelen.jpg", titulo: "Tratamiento capilar", formato: "vertical" },
  { src: null, poster: "/fotos/local/vitrina-productos.jpg", titulo: "Los productos que usamos", formato: "vertical" },
];

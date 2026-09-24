/* ==========================================================================
 *  CAPÍTULO 01 · PELUQUERÍA & BARBERÍA
 *  - foto: ruta dentro de /public (ej. "/fotos/equipo/diego.jpg") o null.
 *  - Videos: subir los .mp4 a /public/videos/ y completar "src".
 *    "poster" es la imagen que se ve antes de darle play (opcional).
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
      "Cortes clásicos y actuales, degradés prolijos y barba trabajada a mano. Sin apuro y con detalle.",
    servicios: ["Corte masculino", "Degradé / fade", "Perfilado y arreglo de barba"],
    foto: null,
    mensaje: "barberia",
  },
  {
    nombre: "Ayelen Villa",
    especialidad: "Peluquería unisex & tratamientos capilares",
    descripcion:
      "Cortes para todas las personas y tratamientos para devolverle vida al pelo: hidratación, nutrición y reparación.",
    servicios: ["Corte unisex", "Tratamientos capilares", "Hidratación y nutrición"],
    foto: null,
    mensaje: "peluqueria",
  },
];

export type Video = {
  src: string | null;
  poster: string | null;
  titulo: string;
  formato: "vertical" | "horizontal";
};

export const videos: Video[] = [
  { src: null, poster: null, titulo: "El local", formato: "vertical" },
  { src: null, poster: null, titulo: "Degradé en proceso", formato: "vertical" },
  { src: null, poster: null, titulo: "Tratamiento capilar", formato: "vertical" },
  { src: null, poster: null, titulo: "Antes y después", formato: "vertical" },
];

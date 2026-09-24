/* ==========================================================================
 *  CAPÍTULO 02 · TERAPIAS ALTERNATIVAS
 *  El contenido real vive en /content/terapias.json (editable a mano o
 *  desde /admin). Las da Diego Campos (el mismo de la barbería), como
 *  terapeuta holístico. Fotos: subir nuevas a /public/fotos/terapias/.
 * ========================================================================== */
import terapiasJson from "../../content/terapias.json";

export type Foto = { src: string | null; alt: string };

export type Terapia = {
  id: string;
  nombre: string;
  bajada: string;
  queEs: string;
  comoFunciona: { titulo: string; texto: string }[];
  beneficios: string[];
};

const data = terapiasJson as { fotosTerapias: Foto[]; terapias: Terapia[] };

export const fotosTerapias = data.fotosTerapias;
export const terapias = data.terapias;

/* ==========================================================================
 *  TEXTOS EDITORIALES
 *  Los títulos y bajadas de cada capítulo. El contenido real vive en
 *  /content/textos.json (editable a mano o desde /admin). El estilo (color
 *  de acento, cursiva, tamaño) lo sigue definiendo cada componente: acá
 *  solo se edita el texto.
 * ========================================================================== */
import textosJson from "../../content/textos.json";

type Capitulo = { tituloLinea1: string; tituloLinea2: string; bajada: string };

type Textos = {
  hero: { eslogan: string; bajada: string };
  capitulos: { peluqueria: Capitulo; terapias: Capitulo; piedras: Capitulo };
};

export const textos = textosJson as Textos;

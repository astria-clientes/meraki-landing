/* ==========================================================================
 *  LOGOS
 *  El contenido real vive en /content/marca.json (editable a mano o desde
 *  /admin). Subí los archivos a /public/logos/ y escribí ahí la ruta
 *  (ej. "/logos/meraki.png"). Mientras quede en null, la página muestra un
 *  recuadro "logo pendiente". Formatos recomendados: PNG transparente o SVG.
 * ========================================================================== */
import marcaJson from "../../content/marca.json";

type Marca = {
  logoMeraki: string | null;
  logoPiedras: string | null;
  nombreMarcaPiedras: string | null;
};

export const marca = marcaJson as Marca;

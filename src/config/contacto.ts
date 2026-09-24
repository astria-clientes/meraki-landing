/* ==========================================================================
 *  DATOS DE CONTACTO DE MERAKI
 *  --------------------------------------------------------------------------
 *  El contenido real vive en /content/contacto.json — ES el archivo que se
 *  edita (a mano, o desde el panel /admin con Decap CMS). Este módulo solo
 *  le da tipos de TypeScript para que el resto del sitio lo use con
 *  autocompletado; no hace falta tocarlo nunca.
 *
 *  CÓMO EDITARLO A MANO (sin el panel):
 *   1. Abrí /content/contacto.json.
 *   2. Cambiá SOLO lo que está entre comillas "así".
 *   3. No borres las comillas ni las comas. Si un dato no lo querés mostrar
 *      (ej. el mail), dejalo vacío: ""
 *   4. Guardá. Si el sitio está en Vercel, se publica solo en 1-2 minutos.
 *      Si el JSON queda mal formado, Vercel NO publica el cambio y el sitio
 *      sigue funcionando con la versión anterior (no se rompe nada).
 * ========================================================================== */
import contactoJson from "../../content/contacto.json";

type Contacto = {
  whatsapp: { numero: string; textoVisible: string };
  email: string;
  instagram: string;
  direccion: { calle: string; ciudad: string; referencia: string; linkMapa: string };
  horarios: { dias: string; horas: string }[];
  mensajesWhatsApp: {
    general: string;
    barberia: string;
    peluqueria: string;
    terapias: string;
    piedras: string;
    producto: string;
    piedra: string;
  };
  textos: { tituloContacto: string; bajadaContacto: string; botonWhatsApp: string };
};

export const contacto = contactoJson as Contacto;

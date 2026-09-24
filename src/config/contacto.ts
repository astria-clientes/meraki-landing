/* ==========================================================================
 *  DATOS DE CONTACTO DE MERAKI
 *  --------------------------------------------------------------------------
 *  Este es el ÚNICO archivo que hace falta tocar para cambiar el WhatsApp,
 *  el mail, la dirección, los horarios o los textos de contacto.
 *  Todo el sitio (botones, pie de página, sección de contacto) lee de acá.
 *
 *  CÓMO EDITARLO (sin saber programar):
 *   1. Cambiá SOLO lo que está entre comillas "así".
 *   2. No borres las comillas, las comas del final ni los dos puntos.
 *   3. Si un dato no lo querés mostrar (ej. el mail), dejalo vacío: ""
 *   4. Guardá. Si el sitio está en Vercel, se publica solo en 1-2 minutos.
 *      Si te equivocás en algo, Vercel NO publica el cambio y el sitio
 *      sigue funcionando con la versión anterior (no se rompe nada).
 * ========================================================================== */

export const contacto = {
  /* ------------------------------------------------------------------------
   * WHATSAPP
   * numero: con código de país, SIN "+", SIN espacios, SIN guiones y SIN el 15.
   *         Formato Argentina: 54 + 9 + código de área (sin 0) + número.
   *         Ejemplo: 0299 15 456-7890  →  "5492994567890"
   * textoVisible: cómo se muestra el número escrito en la página.
   * ------------------------------------------------------------------------ */
  whatsapp: {
    numero: "5492990000000", // ← REEMPLAZAR por el número real
    textoVisible: "299 000-0000",
  },

  /* ------------------------------------------------------------------------
   * MAIL e INSTAGRAM  (dejar "" para ocultarlos)
   * instagram: solo el usuario, sin la @ ni el link.
   * ------------------------------------------------------------------------ */
  email: "",
  instagram: "",

  /* ------------------------------------------------------------------------
   * DIRECCIÓN
   * linkMapa: abrí Google Maps, buscá el local, tocá "Compartir" y pegá
   *           el link acá. Si lo dejás vacío se arma uno con la dirección.
   * ------------------------------------------------------------------------ */
  direccion: {
    calle: "Dirección a confirmar",
    ciudad: "Plottier, Neuquén",
    referencia: "", // ej: "Frente a la plaza" (opcional)
    linkMapa: "",
  },

  /* ------------------------------------------------------------------------
   * HORARIOS  (podés agregar o quitar renglones; cada uno va entre { } )
   * ------------------------------------------------------------------------ */
  horarios: [
    { dias: "Lunes a viernes", horas: "9 a 13 · 16 a 20 h" },
    { dias: "Sábados", horas: "9 a 13 h" },
  ],

  /* ------------------------------------------------------------------------
   * MENSAJES QUE SE ESCRIBEN SOLOS EN WHATSAPP
   * Es el texto que le aparece a la persona al tocar cada botón.
   * En "producto" y "piedra", {nombre} se reemplaza por lo que se consulta.
   * ------------------------------------------------------------------------ */
  mensajesWhatsApp: {
    general: "¡Hola Meraki! Vi la página y quería hacer una consulta.",
    barberia: "¡Hola! Quería coordinar un corte / barba con Diego.",
    peluqueria: "¡Hola! Quería consultar por peluquería o un tratamiento con Ayelen.",
    terapias: "¡Hola! Quería consultar por una sesión de terapia (Reiki / armonización sonora).",
    piedras: "¡Hola! Quería consultar por las piedras y accesorios que tienen.",
    producto: "¡Hola! Me interesa \"{nombre}\" que vi en la página. ¿Está disponible?",
    piedra: "¡Hola! ¿Tienen {nombre}? Vi la guía de piedras en la página.",
  },

  /* ------------------------------------------------------------------------
   * TEXTOS DE LA SECCIÓN FINAL DE CONTACTO
   * ------------------------------------------------------------------------ */
  textos: {
    tituloContacto: "Conocé todo esto en persona.",
    bajadaContacto:
      "Vení a conocer el espacio: tocá las piedras, mirá los collares, " +
      "sentí el ambiente. Y si querés coordinar un corte, una sesión o " +
      "reservar alguna pieza, escribinos por WhatsApp.",
    botonWhatsApp: "Escribinos por WhatsApp",
  },
};

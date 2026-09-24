/* ==========================================================================
 *  GUÍA DE PIEDRAS  (capítulo 03)
 *  Contenido informativo sobre piedras: las que hay en el local Y las que no.
 *   - enCatalogo: true  → se marca "En el local" y tiene botón de consulta.
 *                 false → se muestra como "Info general" (solo para aprender).
 *   - colores: dos colores (claro, oscuro) para dibujar la gema. Formato "#RRGGBB".
 *   - imagen: opcional, ruta a una foto real (ej. "/piedras/amatista.jpg").
 *  Para sumar o sacar una piedra del stock, alcanza con cambiar enCatalogo.
 * ========================================================================== */

export type Piedra = {
  id: string;
  nombre: string;
  intencion: string;
  descripcion: string;
  familia: string;
  dureza: string;
  chakra: string;
  colores: [string, string];
  enCatalogo: boolean;
  imagen?: string | null;
};

export const piedras: Piedra[] = [
  {
    id: "amatista",
    nombre: "Amatista",
    intencion: "Calma · intuición",
    descripcion:
      "Cuarzo violeta asociado a la serenidad y al descanso. Se la elige para bajar la ansiedad, " +
      "dormir mejor y acompañar la meditación.",
    familia: "Cuarzo",
    dureza: "7",
    chakra: "Corona",
    colores: ["#C7A4E6", "#5B2F82"],
    enCatalogo: true,
  },
  {
    id: "cuarzo-rosa",
    nombre: "Cuarzo rosa",
    intencion: "Amor · ternura",
    descripcion:
      "La piedra del amor propio y los vínculos. Tradicionalmente se usa para suavizar " +
      "emociones y abrirse al afecto.",
    familia: "Cuarzo",
    dureza: "7",
    chakra: "Corazón",
    colores: ["#F6D3DA", "#D98A9E"],
    enCatalogo: true,
  },
  {
    id: "cuarzo-cristal",
    nombre: "Cuarzo cristal",
    intencion: "Claridad · energía",
    descripcion:
      "Transparente, conocido como el “maestro sanador”. Se lo asocia a la claridad mental y se " +
      "dice que amplifica la energía de otras piedras.",
    familia: "Cuarzo",
    dureza: "7",
    chakra: "Todos",
    colores: ["#FFFFFF", "#BFCAD6"],
    enCatalogo: true,
  },
  {
    id: "ojo-de-tigre",
    nombre: "Ojo de tigre",
    intencion: "Protección · confianza",
    descripcion:
      "De brillo dorado y sedoso. Se la vincula con la seguridad personal, la determinación " +
      "y la protección frente a energías pesadas.",
    familia: "Cuarzo",
    dureza: "7",
    chakra: "Plexo solar",
    colores: ["#E0A94F", "#6B3F16"],
    enCatalogo: true,
  },
  {
    id: "turmalina-negra",
    nombre: "Turmalina negra",
    intencion: "Protección · arraigo",
    descripcion:
      "Una de las piedras de protección más usadas. Se la asocia a poner los pies en la tierra " +
      "y a alejar la negatividad.",
    familia: "Turmalina",
    dureza: "7 – 7,5",
    chakra: "Raíz",
    colores: ["#5A5A60", "#101012"],
    enCatalogo: true,
  },
  {
    id: "citrino",
    nombre: "Citrino",
    intencion: "Abundancia · alegría",
    descripcion:
      "Cuarzo de tonos miel y ámbar. Se lo conoce como la piedra de la prosperidad, el optimismo " +
      "y la creatividad.",
    familia: "Cuarzo",
    dureza: "7",
    chakra: "Plexo solar",
    colores: ["#FBE08A", "#C9831F"],
    enCatalogo: false,
  },
  {
    id: "lapislazuli",
    nombre: "Lapislázuli",
    intencion: "Verdad · expresión",
    descripcion:
      "Azul profundo con destellos dorados de pirita. Usado desde el antiguo Egipto, se asocia " +
      "a la sabiduría y a comunicar con honestidad.",
    familia: "Roca (lazurita)",
    dureza: "5 – 5,5",
    chakra: "Tercer ojo",
    colores: ["#4A6FD0", "#16235E"],
    enCatalogo: false,
  },
  {
    id: "aventurina",
    nombre: "Aventurina verde",
    intencion: "Suerte · oportunidades",
    descripcion:
      "Verde con pequeños brillos. Conocida como la piedra de la buena suerte; se la asocia " +
      "al equilibrio emocional y a los nuevos comienzos.",
    familia: "Cuarzo",
    dureza: "6,5 – 7",
    chakra: "Corazón",
    colores: ["#9FD8A8", "#2F7A48"],
    enCatalogo: false,
  },
  {
    id: "obsidiana",
    nombre: "Obsidiana",
    intencion: "Protección · introspección",
    descripcion:
      "Vidrio volcánico natural. Se la usa para mirar hacia adentro, soltar lo que pesa " +
      "y protegerse.",
    familia: "Vidrio volcánico",
    dureza: "5 – 5,5",
    chakra: "Raíz",
    colores: ["#4B4450", "#0B0A0D"],
    enCatalogo: false,
  },
  {
    id: "selenita",
    nombre: "Selenita",
    intencion: "Limpieza · paz",
    descripcion:
      "Blanca y luminosa, muy delicada. Se la usa para limpiar energéticamente otras piedras y " +
      "los espacios. No conviene mojarla.",
    familia: "Yeso",
    dureza: "2",
    chakra: "Corona",
    colores: ["#FFFFFF", "#DCD6CB"],
    enCatalogo: false,
  },
  {
    id: "labradorita",
    nombre: "Labradorita",
    intencion: "Transformación · magia",
    descripcion:
      "Gris con reflejos azules y verdes que cambian con la luz. Se la asocia a la intuición " +
      "y a atravesar cambios.",
    familia: "Feldespato",
    dureza: "6 – 6,5",
    chakra: "Tercer ojo",
    colores: ["#7FB3C9", "#2E3A45"],
    enCatalogo: false,
  },
  {
    id: "piedra-luna",
    nombre: "Piedra luna",
    intencion: "Ciclos · sensibilidad",
    descripcion:
      "De brillo lechoso y suave. Vinculada a la luna, a los ciclos y a la energía femenina.",
    familia: "Feldespato",
    dureza: "6 – 6,5",
    chakra: "Sacro",
    colores: ["#F4F1F8", "#A9B4C8"],
    enCatalogo: false,
  },
  {
    id: "jaspe-rojo",
    nombre: "Jaspe rojo",
    intencion: "Vitalidad · fuerza",
    descripcion:
      "Terroso y opaco. Se lo asocia a la energía física, la constancia y a mantenerse centrado.",
    familia: "Calcedonia",
    dureza: "6,5 – 7",
    chakra: "Raíz",
    colores: ["#D0654A", "#6E1E14"],
    enCatalogo: false,
  },
  {
    id: "malaquita",
    nombre: "Malaquita",
    intencion: "Cambio · sanación emocional",
    descripcion:
      "Verde intenso con bandas. Tradicionalmente usada para acompañar procesos de cambio. " +
      "Es blanda: mejor no mojarla ni usarla en elixires.",
    familia: "Carbonato de cobre",
    dureza: "3,5 – 4",
    chakra: "Corazón",
    colores: ["#5FCB97", "#0D5234"],
    enCatalogo: false,
  },
  {
    id: "sodalita",
    nombre: "Sodalita",
    intencion: "Lógica · serenidad",
    descripcion:
      "Azul con vetas blancas. Se la asocia a ordenar los pensamientos y a comunicarse con calma.",
    familia: "Feldespatoide",
    dureza: "5,5 – 6",
    chakra: "Garganta",
    colores: ["#6C86C9", "#1D2B5C"],
    enCatalogo: false,
  },
  {
    id: "hematita",
    nombre: "Hematita",
    intencion: "Enraizamiento · foco",
    descripcion:
      "Gris metálica y pesada. Se la usa para bajar a tierra, ganar concentración y equilibrio.",
    familia: "Óxido de hierro",
    dureza: "5,5 – 6,5",
    chakra: "Raíz",
    colores: ["#A7A9B0", "#2B2C31"],
    enCatalogo: false,
  },
];

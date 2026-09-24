/* ==========================================================================
 *  CAPÍTULO 02 · TERAPIAS ALTERNATIVAS
 *  Fotos: subir a /public/fotos/terapias/ y completar "src".
 * ========================================================================== */

export type Foto = { src: string | null; alt: string };

export const fotosTerapias: Foto[] = [
  { src: null, alt: "La sala de sesiones" },
  { src: null, alt: "Sesión de Reiki" },
  { src: null, alt: "Cuencos de armonización" },
  { src: null, alt: "Detalle del ambiente" },
];

export type Terapia = {
  id: string;
  nombre: string;
  bajada: string;
  queEs: string;
  comoFunciona: { titulo: string; texto: string }[];
  beneficios: string[];
};

export const terapias: Terapia[] = [
  {
    id: "reiki",
    nombre: "Reiki",
    bajada: "Energía a través de las manos",
    queEs:
      "Reiki es una práctica de origen japonés, creada por Mikao Usui a comienzos del siglo XX. " +
      "La palabra une rei (universal) y ki (energía vital). Quien da la sesión apoya suavemente " +
      "las manos —o las deja apenas por encima del cuerpo— en distintas zonas, para acompañarte " +
      "a entrar en un estado de relajación profunda.",
    comoFunciona: [
      {
        titulo: "Una charla breve",
        texto: "Contás cómo llegás y qué te gustaría trabajar. Sin juicios, a tu ritmo.",
      },
      {
        titulo: "Te recostás vestido/a",
        texto: "En una camilla, con luz tenue y música suave. No hay masajes ni presión.",
      },
      {
        titulo: "Imposición de manos",
        texto: "Se recorren distintas zonas del cuerpo, unos minutos en cada una.",
      },
      {
        titulo: "Cierre y registro",
        texto: "Volvés despacio y charlamos sobre lo que sentiste.",
      },
    ],
    beneficios: [
      "Relajación profunda del cuerpo y la mente",
      "Alivio del estrés y la ansiedad del día a día",
      "Mejor calidad de descanso",
      "Sensación de equilibrio, calma y claridad",
      "Acompañamiento en momentos de cambio",
    ],
  },
  {
    id: "sonora",
    nombre: "Armonización sonora",
    bajada: "Terapia vibracional con sonido",
    queEs:
      "Todo lo que suena, vibra. En una armonización sonora se usan cuencos, gongs y otros " +
      "instrumentos de sonidos largos y envolventes. Esas vibraciones no solo se escuchan: " +
      "también se sienten en el cuerpo, como cuando un tambor te retumba en el pecho.",
    comoFunciona: [
      {
        titulo: "El sonido se siente",
        texto: "Los cuencos se tocan cerca tuyo y su vibración recorre el cuerpo como una onda suave.",
      },
      {
        titulo: "El cuerpo se acompasa",
        texto:
          "Así como dos relojes de péndulo cerca terminan sincronizados, el cuerpo tiende a seguir " +
          "ritmos lentos y estables: la respiración se alarga y la mente baja un cambio.",
      },
      {
        titulo: "Solo tenés que estar",
        texto: "No hace falta saber meditar ni hacer nada. Te recostás, cerrás los ojos y escuchás.",
      },
    ],
    beneficios: [
      "Calma mental y menos ruido interno",
      "Liberación de tensiones acumuladas",
      "Respiración más lenta y profunda",
      "Ayuda a conciliar un mejor sueño",
      "Mayor conexión con el propio cuerpo",
    ],
  },
];

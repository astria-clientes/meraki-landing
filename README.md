# Meraki — Landing

Landing page de **Meraki** (Plottier, Neuquén): peluquería y barbería, terapias alternativas y bijou con piedras semipreciosas.
Next.js 14 (App Router) + TypeScript + Tailwind CSS.

```bash
npm install
npm run dev     # http://localhost:3000
```

**Deploy en Vercel:** importá este repo tal cual. No hacen falta variables de entorno.

---

## Concepto de diseño: "el hilo"

Las tres partes del negocio son **tres cuentas de un mismo collar**. Un hilo de cobre atraviesa toda la página y enhebra cada capítulo:

| Capítulo | Sección | Fondo | Tono tipográfico |
|---|---|---|---|
| — | Inicio | Crema `#F7F3EC` | Fraunces grande + Public Sans |
| 01 · El oficio | Peluquería & barbería | Tinta `#221912` | Etiquetas en mayúsculas, títulos firmes |
| 02 · La pausa | Terapias | Tinta suave `#2E2117` + dorado | Fraunces en *itálica* y liviana, formas de arco |
| 03 · La piedra | Bijou & piedras | Arena `#EFE3CB` | Serif cálida, gemas ilustradas |
| Cierre | Visitanos | Tinta | Las tres cuentas juntas: el collar se cierra |

El **cobre** `#B8823D` (el mismo color de la madera miel de los muebles del salón) aparece en los cinco bloques y es el que los une. Entre capítulos, `<Enhebrado>` hace un fundido de color con el hilo y una cuenta.

### Por qué esta paleta y esta tipografía

La paleta ("Taller de barrio") **no se inventó**: se tomó directo de las fotos reales del local — paredes blanco cálido, muebles de madera miel, plantas por todos lados y el dorado de los adornos de geometría sagrada (flor de la vida, sri yantra) que ya tiene el salón. Por eso el rincón de terapias no usa violeta/lavanda "new age" de manual: usa el mismo negro cálido y dorado que aparecen en los flyers reales de Reiki y Armonización sonora que mandó el cliente.

Tipografía: **Fraunces** (títulos, con eje variable "soft") + **Public Sans** (texto). Se evitó a propósito Inter/Poppins/Montserrat — las itálicas de Fraunces se sienten escritas a mano, no impresas, y encajan con la madera y lo artesanal del espacio.

WhatsApp aparece en cada capítulo con un **mensaje precargado distinto** (barbería, peluquería, terapias, piedras, cada producto y cada piedra), y además hay un botón flotante que acompaña todo el scroll.

## El material real que se usó

- **Fotos**: `fachada.jpg`, `salon-general.jpg`, `vitrina-productos.jpg` (`public/fotos/local/`), las estaciones de Diego y Ayelen (`public/fotos/equipo/`), y las fotos de armonización sonora y Reiki, recortadas de los flyers originales del cliente para sacar el marco dorado y el texto (`public/fotos/terapias/`).
- **Las 71 piedras de la Guía** salen del archivo HTML que mandó el cliente (su "enciclopedia" armada previamente): tipo de mineral, chakras, propiedades y cómo se usa cada una en una sesión de armonización sonora. Es la colección real de Diego, no texto inventado.
- **El póster "colección completa"** (72 especímenes) se linkea entero desde la Guía de piedras (`public/piedras/coleccion-completa.jpg`), como complemento visual.
- Los archivos originales sin recortar (los flyers completos, tal como los mandó el cliente) quedan guardados en `material-cliente/originales/` por si hacen falta después — no se sirven en el sitio.
- **Dato real que apareció en los flyers**: Diego Campos no es solo el barbero — también es el terapeuta holístico que da Reiki y Armonización sonora. Esto ya está reflejado en las secciones 01 y 02 (se lo menciona en ambos capítulos, para reforzar que es un mismo espacio y una misma persona).

---

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| **WhatsApp, mail, Instagram, dirección, horarios, textos de contacto** | `src/config/contacto.ts` |
| Logos (Meraki y la marca de piedras/terapias) | `src/data/marca.ts` + archivos en `public/logos/` |
| Profesionales y videos de peluquería | `src/data/peluqueria.ts` + `public/videos/`, `public/fotos/equipo/` |
| Textos de Reiki y armonización sonora, fotos de terapias | `src/data/terapias.ts` + `public/fotos/terapias/` |
| Catálogo de bijou | `src/data/productos.ts` + `public/productos/` |
| Guía de piedras (las 71 piedras de la colección) | `src/data/piedras.ts` |

Cada archivo tiene instrucciones en comentarios. Todo lo que está en `null` muestra un **recuadro rayado "pendiente"** con la carpeta donde va el archivo. Al cargar la ruta real, se reemplaza solo.

### Contenido de ejemplo que todavía hay que confirmar o reemplazar

- `contacto.ts`: el WhatsApp (`5492994125317`) sale de los flyers de terapias — **confirmar con el cliente** que sirve para todo el espacio y no solo para terapias. La dirección exacta y los horarios son de ejemplo.
- `productos.ts`: las 8 piezas de bijou (dijes, collares) son de ejemplo — no llegaron fotos de estas piezas todavía. Las fotos del local y de la colección de piedras sí son reales.
- `peluqueria.ts`: la lista de servicios de Diego y Ayelen se armó a partir de la descripción general; confirmar con ellos.

### Videos

El cliente los va a nombrar `video-peluqueria-01.mp4`, `video-peluqueria-02.mp4`, etc. Cuando lleguen: subirlos a `public/videos/` con ese mismo nombre y completar el campo `src` en `src/data/peluqueria.ts` (el `poster` ya está puesto con fotos reales del local, así que hasta que llegue el video se ve ese adelanto con un botón de play). Formato vertical 9:16 por defecto (reels), click para reproducir — nunca autoplay.

---

## Datos de contacto: ¿archivo de configuración o panel de administración?

**Recomendación: Opción A, un único archivo de configuración (`src/config/contacto.ts`).**

Por qué, para este caso puntual:

1. **Los datos cambian casi nunca.** Un WhatsApp o un horario se cambia una o dos veces por año. Un panel de administración (login, base de datos, hosting del CMS) es mucha infraestructura para mantener por algo que se toca tan poco.
2. **Los datos no son secretos.** El número, el mail y la dirección se muestran públicamente en la página. No hay nada que "proteger" de vos: el objetivo real es que el dueño **no dependa de vos** para cambiarlos, y eso el archivo ya lo resuelve.
3. **Es a prueba de errores.** El archivo es TypeScript: si el dueño borra una comilla sin querer, Vercel **no publica** el cambio y el sitio sigue en línea con la versión anterior. Con un CMS, un dato mal cargado se publica igual.
4. **Costo cero y nada que se rompa.** Sin base de datos, sin usuarios, sin contraseñas que se olviden, sin servicios de terceros que cambien de plan.

### Cómo lo edita el dueño sin saber programar (desde el celular o la compu)

1. Le das acceso de colaborador **solo a este repositorio** (o, mejor, un repo aparte solo con Meraki).
2. Entra a GitHub → `clientes/meraki/src/config/contacto.ts` → ícono del lápiz ✏️.
3. Cambia lo que está entre comillas, toca **Commit changes**.
4. Vercel publica solo en 1–2 minutos.

Si preferís que no entre a GitHub, le pasás el archivo `contacto.ts`, lo completa en cualquier editor de texto y te lo devuelve: vos solo lo pegás. Así ni siquiera tenés que pedirle los datos por chat.

### Cuándo pasar a la Opción B

Conviene un CMS liviano (ej. **Decap CMS** o **TinaCMS**, que editan estos mismos archivos desde un panel `/admin` sin base de datos) si:

- el dueño quiere **cargar productos al catálogo él mismo**, con fotos, seguido;
- o sumar piedras nuevas a la colección seguido.

La estructura ya está preparada para ese paso: contacto, productos y piedras son arrays de datos separados del diseño, así que se pueden pasar a JSON editable por un CMS sin tocar los componentes.

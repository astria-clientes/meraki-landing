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
| — | Inicio | Hueso `#F5EFE6` | Fraunces grande + Manrope |
| 01 · El oficio | Peluquería & barbería | Tinta `#1B1411` | Etiquetas en mayúsculas, títulos firmes |
| 02 · La pausa | Terapias | Ciruela `#2A2134` | Fraunces en *itálica* y liviana, formas de arco |
| 03 · La piedra | Bijou & piedras | Arena `#E9DDCB` | Serif cálida, gemas ilustradas |
| Cierre | Visitanos | Tinta | Las tres cuentas juntas: el collar se cierra |

El **cobre** `#B8693F` aparece en los cinco bloques y es el que los une. Entre capítulos, `<Enhebrado>` hace un fundido de color con el hilo y una cuenta.

WhatsApp aparece en cada capítulo con un **mensaje precargado distinto** (barbería, peluquería, terapias, piedras, cada producto y cada piedra), y además hay un botón flotante que acompaña todo el scroll.

---

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| **WhatsApp, mail, Instagram, dirección, horarios, textos de contacto** | `src/config/contacto.ts` |
| Logos (Meraki y la marca de piedras/terapias) | `src/data/marca.ts` + archivos en `public/logos/` |
| Profesionales y videos de peluquería | `src/data/peluqueria.ts` + `public/videos/`, `public/fotos/equipo/` |
| Textos de Reiki y armonización sonora, fotos de terapias | `src/data/terapias.ts` + `public/fotos/terapias/` |
| Catálogo de bijou | `src/data/productos.ts` + `public/productos/` |
| Guía de piedras (en stock y solo informativas) | `src/data/piedras.ts` |

Cada archivo tiene instrucciones en comentarios. Todo lo que está en `null` muestra un **recuadro rayado "pendiente"** con la carpeta donde va el archivo. Al cargar la ruta real, se reemplaza solo.

### Contenido de ejemplo que hay que reemplazar

- `contacto.ts`: el número de WhatsApp (`5492990000000`), la dirección y los horarios son de ejemplo.
- `productos.ts`: las 8 piezas son de ejemplo.
- `piedras.ts`: están marcadas como "en el local" amatista, cuarzo rosa, cuarzo cristal, ojo de tigre y turmalina negra. Ajustar `enCatalogo` según el stock real.
- `peluqueria.ts`: la lista de servicios de Diego y Ayelen se armó a partir de la descripción general; confirmar con ellos.

### Videos

Subir los `.mp4` a `public/videos/` (idealmente comprimidos, menos de 10 MB cada uno; H.264). Formato vertical 9:16 por defecto (reels). Opcional: una imagen `poster` para que se vea algo antes de darle play.

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
- o actualizar el stock de piedras cada semana.

La estructura ya está preparada para ese paso: contacto, productos y piedras son arrays de datos separados del diseño, así que se pueden pasar a JSON editable por un CMS sin tocar los componentes.

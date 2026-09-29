# Meraki — Landing

Landing page de **Meraki** (Plottier, Neuquén): peluquería y barbería, terapias alternativas y bijou con piedras semipreciosas.
Next.js 14 (App Router) + TypeScript + Tailwind CSS.

```bash
npm install
npm run dev     # http://localhost:3000
```

**Deploy en Vercel:** importá este repo tal cual. Necesita 2 variables de entorno para el panel de edición — ver más abajo.

**Ya está deployado:** [meraki-landing-six.vercel.app](https://meraki-landing-six.vercel.app/)

---

## Panel de edición propio — `/admin`

Después de probar Decap CMS (un panel de terceros) y no convencer, el panel de `/admin` es **código nuestro**, hecho a medida para las 6 secciones editables de Meraki: Catálogo (bijou & piedras), Textos (títulos y bajadas de cada capítulo), Peluquería & barbería, Terapias alternativas, Contacto, Logos.

No hay base de datos propia: el repo de GitHub ES la base de datos. El panel corre en el navegador, pero **ya no habla directo con GitHub** — habla con rutas propias (`/api/admin/*`) que corren en el servidor de Vercel, y esas sí hacen el commit real al repo con un token que el navegador nunca ve. Vercel publica el cambio solo, en 1-2 minutos.

El login **es email + contraseña simples** (nada de cuentas de GitHub, para que lo pueda usar el cliente sin entender nada de git). La sesión es una cookie firmada, sin base de datos de usuarios.

**Subida de fotos, resuelta:** cada campo de foto (`foto`, `imagen`, `poster`, logos) tiene un botón real de **"Subir foto"** — elegís el archivo de tu compu, el panel lo sube a `/public/uploads/` (con un commit propio) y completa la ruta solo. Nada de escribir rutas a mano.

**Catálogo como tabla:** la sección "Catálogo" lista las piezas en una tabla (miniatura, nombre, categoría, piedra) con "Editar" / "Borrar" y un botón "+ Nueva pieza" — al estilo de un admin de e-commerce, sin precios ni stock (acá no aplican).

### Piezas del panel (por si hay que tocarlo)

| Qué | Dónde |
|---|---|
| Rutas del servidor: login, logout, sesión, leer/guardar JSON, subir imagen | `src/app/api/admin/*/route.ts` |
| Lógica de servidor: firma/verifica la sesión, habla con la API de GitHub | `src/lib/adminServer.ts` |
| Cliente del panel (llama a `/api/admin/*` desde el navegador) | `src/lib/github.ts` |
| Pantalla principal (login + navegación entre secciones) | `src/app/admin/page.tsx` |
| Los formularios | `src/components/admin/*Form.tsx` |
| Piezas reutilizables (campos, listas editables, subida de imagen) | `src/components/admin/Campos.tsx` |
| Tabla + vista de edición (usada por Catálogo) | `src/components/admin/Tabla.tsx` |

### Login: qué hace falta tener cargado en Vercel

Cuatro variables de entorno en Vercel (Project → Settings → Environment Variables, marcadas para **Production**):

| Variable | Qué es |
|---|---|
| `ADMIN_EMAIL` | el email con el que se entra al panel |
| `ADMIN_PASSWORD` | la contraseña |
| `ADMIN_SESSION_SECRET` | un texto largo y random (ej. `openssl rand -hex 32`), solo para firmar la cookie de sesión — no lo ve ni lo usa nadie más |
| `GITHUB_TOKEN` | un **fine-grained personal access token** de GitHub, generado en Settings → Developer settings → Fine-grained tokens, con acceso *Only select repositories* → `astria-clientes/meraki-landing` y permiso *Contents: Read and write*. Es el que usa el servidor para hacer los commits — el navegador del cliente nunca lo ve. |

Después de cargarlas (o de cambiar cualquiera), hay que hacer un redeploy para que tomen efecto.

(Versión vieja, ya no aplica: el panel usaba login por GitHub OAuth con una GitHub App propia y las variables `GITHUB_OAUTH_CLIENT_ID` / `GITHUB_OAUTH_CLIENT_SECRET`. Se reemplazó por lo de arriba porque el cliente no tiene por qué manejar una cuenta de GitHub.)

### Qué queda afuera del panel (a propósito)

**Guía de piedras** (`src/data/piedras.ts`, las 71 piedras): es contenido rico y estructurado que conviene seguir editando como código — pasarlo a formularios sería más trabajo que beneficio para lo seguido que se toca.

---

## Fotos: tratamiento e integración visual

Las fotos reales pasan por dos cosas antes de llegar a la página:

1. **Tratamiento de color** (código, ya aplicado): más calidez, contraste, viñeta suave hacia el tono "tinta" del sitio y grano fino — para que no se vean "foto de catálogo" pegada sobre el diseño.
2. **Vida en pantalla** (`src/components/Medios.tsx`, componente `<Foto>`): zoom lentísimo y continuo (tipo Ken Burns) + un zoom extra al pasar el mouse, y un degradé sutil hacia abajo para dar profundidad. Se puede apagar por imagen con `viva={false}` / `degradado={false}` si en algún lugar molesta.

### Lo que el código no puede arreglar (para pedirle a Gemini u otra IA de imagen)

Esto sí necesita generación/edición con IA de imagen — no lo tengo disponible en este entorno, pero podés correrlo vos y devolverme el resultado para integrarlo:

**Prompt genérico (probar primero, sirve para casi todas):**
> "Mejorá la calidad de esta foto de interior manteniendo el encuadre y el contenido exactos: subí la nitidez y el detalle como si hubiera sido tomada con una cámara mejor, corregí el balance de blancos si hace falta, sin agregar ni quitar objetos de la escena. No cambies la composición ni el punto de vista."

**Fachada del local** (`fachada.jpg`): sacar el cable que cuelga del techo/cartel, enderezar la perspectiva si se puede sin deformar el cartel.

**Salón general** (`salon-general.jpg`): mejorar nitidez general (se ve algo blanda), sobre todo en el piso y los muebles del fondo.

**Estaciones de Diego y Ayelen**: estas están tomadas de cerca con poca profundidad de campo — pedirle "simulá una leve profundidad de campo (fondo un poco desenfocado, primer plano nítido), como con una lente de retrato" puede darles más aire de foto profesional.

Cuando tengas los resultados, mandámelos y los integro (recorte, posición, mismo tratamiento de color que el resto) para que no se note el salto de una foto a otra.

Las tres partes del negocio son **tres cuentas de un mismo collar**. Cada una es su propia página (ver "Estructura de rutas" abajo), pero comparten la misma paleta e hilo conductor:

| Capítulo | Ruta | Sección | Fondo | Tono tipográfico |
|---|---|---|---|---|
| — | `/` | Inicio | Crema `#F7F3EC` | Fraunces grande + Public Sans |
| 01 · El oficio | `/peluqueria` | Peluquería & barbería | Tinta `#221912` | Etiquetas en mayúsculas, títulos firmes |
| 02 · La pausa | `/terapias` | Terapias | Tinta suave `#2E2117` + dorado | Fraunces en *itálica* y liviana, formas de arco |
| 03 · La piedra | `/piedras` | Bijou & piedras | Arena `#EFE3CB` | Serif cálida, gemas ilustradas |
| Cierre | `/visitanos` | Visitanos | Tinta | Las tres cuentas juntas: el collar se cierra |

El **cobre** `#B8823D` (el mismo color de la madera miel de los muebles del salón) aparece en las cinco páginas y es el que las une. Dentro de cada capítulo, `<Enhebrado>` sigue usándose para fundidos de color entre sus propias secciones internas (ej. los dos videos + el catálogo en Piedras).

### Estructura de rutas

Hasta hace poco todo el sitio era un único scroll largo con los 3 capítulos + cierre apilados en `/`. Ahora cada capítulo es su propia ruta de Next.js App Router, para que el cliente pueda compartir un link directo a "Piedras" o "Terapias" sin que la visita tenga que scrollear desde el inicio:

- `src/app/page.tsx` — Home: solo el Hero, con los 3 capítulos como links reales a sus rutas (antes eran anclas `#peluqueria` de scroll).
- `src/app/peluqueria/page.tsx`, `src/app/terapias/page.tsx`, `src/app/piedras/page.tsx`, `src/app/visitanos/page.tsx` — una página por capítulo, cada una renderizando el componente de esa sección (`src/components/Peluqueria.tsx`, etc.) sin cambios de contenido.
- `src/app/layout.tsx` — el navbar (`Encabezado`), el botón flotante de WhatsApp y el footer ahora viven acá, así aparecen en las 5 páginas. El navbar resalta con color de acento la sección en la que estás parado.
- `src/components/NavegacionCapitulos.tsx` — la franja "Capítulo anterior / Capítulo siguiente" al final de cada página, para invitar a seguir el recorrido en orden sin tener que volver al inicio.

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

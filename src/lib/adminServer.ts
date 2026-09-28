import { createHmac, timingSafeEqual } from "crypto";

/* ==========================================================================
 *  Todo lo que corre en el servidor para el panel /admin:
 *  - firma/verifica la sesión (email + contraseña, sin base de datos: solo
 *    una cookie firmada con un secreto que vive en las variables de entorno)
 *  - habla con la API de GitHub usando un token propio del servidor
 *    (GITHUB_TOKEN), que el navegador del cliente nunca ve.
 * ========================================================================== */

const REPO = "astria-clientes/meraki-landing";
const RAMA = "main";

export const COOKIE_SESION = "admin_session";
const DURACION_MS = 8 * 60 * 60 * 1000; // 8 horas
export const DURACION_SESION_S = DURACION_MS / 1000;

function secretoSesion(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("Falta la variable de entorno ADMIN_SESSION_SECRET.");
  return s;
}

export function firmarSesion(): string {
  const ts = Date.now().toString();
  const firma = createHmac("sha256", secretoSesion()).update(ts).digest("hex");
  return `${ts}.${firma}`;
}

export function sesionValida(valor: string | undefined | null): boolean {
  if (!valor) return false;
  const [ts, firma] = valor.split(".");
  if (!ts || !firma) return false;
  if (!/^\d+$/.test(ts)) return false;
  if (Date.now() - Number(ts) > DURACION_MS) return false;
  let secreto: string;
  try {
    secreto = secretoSesion();
  } catch {
    return false;
  }
  const esperada = createHmac("sha256", secreto).update(ts).digest("hex");
  const a = Buffer.from(firma);
  const b = Buffer.from(esperada);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function tokenGitHub(): string {
  const t = process.env.GITHUB_TOKEN;
  if (!t) throw new Error("Falta la variable de entorno GITHUB_TOKEN en el servidor.");
  return t;
}

/** Solo se puede leer/escribir content/*.json — nunca una ruta arbitraria del repo. */
export function rutaContenidoValida(ruta: string): boolean {
  return /^content\/[a-z0-9_-]+\.json$/i.test(ruta) && !ruta.includes("..");
}

async function llamarGitHub(path: string, init?: RequestInit) {
  const res = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${tokenGitHub()}`,
      Accept: "application/vnd.github+json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const detalle = await res.text().catch(() => "");
    throw new Error(`GitHub respondió ${res.status}: ${detalle.slice(0, 300)}`);
  }
  return res.json();
}

export async function leerJsonServidor(rutaRepo: string): Promise<{ datos: unknown; sha: string }> {
  const data = await llamarGitHub(`/contents/${rutaRepo}?ref=${RAMA}`);
  const texto = Buffer.from(data.content as string, "base64").toString("utf8");
  return { datos: JSON.parse(texto), sha: data.sha as string };
}

export async function guardarJsonServidor(
  rutaRepo: string,
  datos: unknown,
  sha: string,
  mensaje: string
): Promise<string> {
  const contenido = Buffer.from(JSON.stringify(datos, null, 2) + "\n", "utf8").toString("base64");
  const res = await llamarGitHub(`/contents/${rutaRepo}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: mensaje, content: contenido, sha, branch: RAMA }),
  });
  return res.content.sha as string;
}

/** Sube una imagen ya codificada en base64 a /public/uploads y devuelve la ruta pública. */
export async function subirImagenServidor(nombreOriginal: string, base64: string, mensaje: string): Promise<string> {
  const nombreSeguro = nombreOriginal.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const nombreArchivo = `${Date.now()}-${nombreSeguro}`;
  const rutaRepo = `public/uploads/${nombreArchivo}`;

  await llamarGitHub(`/contents/${rutaRepo}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: mensaje, content: base64, branch: RAMA }),
  });

  return `/uploads/${nombreArchivo}`;
}

/* ==========================================================================
 *  Cliente de GitHub para el panel /admin.
 *  Todo corre en el navegador: el token vive en una cookie (la puso
 *  /callback después del login) y cada guardado es un commit real al repo,
 *  vía la API de contenidos de GitHub. No hay base de datos ni servidor
 *  propio — el repo ES la base de datos.
 * ========================================================================== */

const REPO = "astria-clientes/meraki-landing";
const RAMA = "main";
const COOKIE = "gh_token";

export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function cerrarSesion() {
  document.cookie = `${COOKIE}=; Max-Age=0; Path=/`;
}

function utf8ABase64(texto: string): string {
  const bytes = new TextEncoder().encode(texto);
  let binario = "";
  bytes.forEach((b) => (binario += String.fromCharCode(b)));
  return btoa(binario);
}

function base64AUtf8(b64: string): string {
  const binario = atob(b64.replace(/\n/g, ""));
  const bytes = new Uint8Array(binario.length);
  for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

async function llamarGitHub(path: string, init?: RequestInit) {
  const token = getToken();
  if (!token) throw new Error("No hay sesión iniciada.");
  const res = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
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

/** Trae un archivo de contenido (content/*.json) ya parseado, con su "sha" (hace falta para poder guardar después). */
export async function leerJson<T>(rutaRepo: string): Promise<{ datos: T; sha: string }> {
  const data = await llamarGitHub(`/contents/${rutaRepo}?ref=${RAMA}`);
  const texto = base64AUtf8(data.content as string);
  return { datos: JSON.parse(texto) as T, sha: data.sha as string };
}

/** Guarda un archivo de contenido (hace un commit real). */
export async function guardarJson(rutaRepo: string, datos: unknown, sha: string, mensaje: string): Promise<string> {
  const contenido = utf8ABase64(JSON.stringify(datos, null, 2) + "\n");
  const res = await llamarGitHub(`/contents/${rutaRepo}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: mensaje, content: contenido, sha, branch: RAMA }),
  });
  return res.content.sha as string;
}

/** Sube una imagen nueva a /public/uploads y devuelve la ruta pública (ej. "/uploads/169..-foto.jpg"). */
export async function subirImagen(archivo: File, mensaje: string): Promise<string> {
  const dataUrl: string = await new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result as string);
    lector.onerror = reject;
    lector.readAsDataURL(archivo);
  });
  const base64 = dataUrl.split(",")[1] ?? "";
  const nombreSeguro = archivo.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const nombreArchivo = `${Date.now()}-${nombreSeguro}`;
  const rutaRepo = `public/uploads/${nombreArchivo}`;

  await llamarGitHub(`/contents/${rutaRepo}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: mensaje, content: base64, branch: RAMA }),
  });

  return `/uploads/${nombreArchivo}`;
}

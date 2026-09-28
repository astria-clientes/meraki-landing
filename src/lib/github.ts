/* ==========================================================================
 *  Cliente del panel /admin, del lado del navegador.
 *  Ya no habla directo con GitHub (eso quedó en el servidor, en
 *  src/lib/adminServer.ts): acá solo se llama a nuestras propias rutas
 *  /api/admin/..., que son las que guardan de verdad (commit real al repo).
 *  La sesión es un email + contraseña simples; el navegador nunca ve ningún
 *  token de GitHub.
 * ========================================================================== */

async function mensajeError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    return typeof data?.error === "string" ? data.error : `Error ${res.status}`;
  } catch {
    return `Error ${res.status}`;
  }
}

export async function haySesion(): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/session");
    if (!res.ok) return false;
    const data = await res.json();
    return !!data.logueado;
  } catch {
    return false;
  }
}

export async function iniciarSesion(email: string, password: string): Promise<void> {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await mensajeError(res));
}

export async function cerrarSesion(): Promise<void> {
  await fetch("/api/admin/logout", { method: "POST" });
}

/** Trae un archivo de contenido (content/*.json) ya parseado, con su "sha" (hace falta para poder guardar después). */
export async function leerJson<T>(rutaRepo: string): Promise<{ datos: T; sha: string }> {
  const res = await fetch(`/api/admin/contenido?ruta=${encodeURIComponent(rutaRepo)}`);
  if (!res.ok) throw new Error(await mensajeError(res));
  return res.json();
}

/** Guarda un archivo de contenido (hace un commit real). */
export async function guardarJson(rutaRepo: string, datos: unknown, sha: string, mensaje: string): Promise<string> {
  const res = await fetch("/api/admin/contenido", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ruta: rutaRepo, datos, sha, mensaje }),
  });
  if (!res.ok) throw new Error(await mensajeError(res));
  const data = await res.json();
  return data.sha as string;
}

/** Sube una imagen nueva a /public/uploads y devuelve la ruta pública (ej. "/uploads/169..-foto.jpg"). */
export async function subirImagen(archivo: File, mensaje: string): Promise<string> {
  const dataUrl: string = await new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result as string);
    lector.onerror = reject;
    lector.readAsDataURL(archivo);
  });
  const contenido = dataUrl.split(",")[1] ?? "";

  const res = await fetch("/api/admin/imagen", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre: archivo.name, contenido, mensaje }),
  });
  if (!res.ok) throw new Error(await mensajeError(res));
  const data = await res.json();
  return data.ruta as string;
}

import { NextRequest, NextResponse } from "next/server";
import { COOKIE_SESION, sesionValida, subirImagenServidor } from "@/lib/adminServer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!sesionValida(req.cookies.get(COOKIE_SESION)?.value)) {
    return NextResponse.json({ error: "No hay sesión." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const nombre = typeof body?.nombre === "string" ? body.nombre : "";
  const contenido = typeof body?.contenido === "string" ? body.contenido : "";
  const mensaje = typeof body?.mensaje === "string" ? body.mensaje : `Subir imagen: ${nombre}`;

  if (!nombre || !contenido) {
    return NextResponse.json({ error: "Faltan datos del archivo." }, { status: 400 });
  }

  try {
    const ruta = await subirImagenServidor(nombre, contenido, mensaje);
    return NextResponse.json({ ruta });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Error" }, { status: 500 });
  }
}

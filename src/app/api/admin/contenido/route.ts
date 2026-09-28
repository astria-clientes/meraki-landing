import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE_SESION,
  guardarJsonServidor,
  leerJsonServidor,
  rutaContenidoValida,
  sesionValida,
} from "@/lib/adminServer";

export const dynamic = "force-dynamic";

function noAutorizado() {
  return NextResponse.json({ error: "No hay sesión." }, { status: 401 });
}

export async function GET(req: NextRequest) {
  if (!sesionValida(req.cookies.get(COOKIE_SESION)?.value)) return noAutorizado();

  const ruta = req.nextUrl.searchParams.get("ruta") ?? "";
  if (!rutaContenidoValida(ruta)) {
    return NextResponse.json({ error: "Ruta no permitida." }, { status: 400 });
  }

  try {
    const { datos, sha } = await leerJsonServidor(ruta);
    return NextResponse.json({ datos, sha });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!sesionValida(req.cookies.get(COOKIE_SESION)?.value)) return noAutorizado();

  const body = await req.json().catch(() => null);
  const ruta = typeof body?.ruta === "string" ? body.ruta : "";
  const sha = typeof body?.sha === "string" ? body.sha : "";
  const mensaje = typeof body?.mensaje === "string" ? body.mensaje : "Editar desde el panel";

  if (!rutaContenidoValida(ruta)) {
    return NextResponse.json({ error: "Ruta no permitida." }, { status: 400 });
  }
  if (!sha) {
    return NextResponse.json({ error: "Falta el sha del archivo actual." }, { status: 400 });
  }

  try {
    const nuevoSha = await guardarJsonServidor(ruta, body.datos, sha, mensaje);
    return NextResponse.json({ sha: nuevoSha });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { COOKIE_SESION, DURACION_SESION_S, firmarSesion } from "@/lib/adminServer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const emailEsperado = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const passwordEsperada = process.env.ADMIN_PASSWORD ?? "";

  if (!emailEsperado || !passwordEsperada) {
    return NextResponse.json(
      { error: "El panel todavía no está configurado (faltan ADMIN_EMAIL / ADMIN_PASSWORD)." },
      { status: 500 }
    );
  }

  if (email !== emailEsperado || password !== passwordEsperada) {
    return NextResponse.json({ error: "Email o contraseña incorrectos." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_SESION, firmarSesion(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: DURACION_SESION_S,
  });
  return res;
}

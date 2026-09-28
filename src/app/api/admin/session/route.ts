import { NextRequest, NextResponse } from "next/server";
import { COOKIE_SESION, sesionValida } from "@/lib/adminServer";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const logueado = sesionValida(req.cookies.get(COOKIE_SESION)?.value);
  return NextResponse.json({ logueado });
}

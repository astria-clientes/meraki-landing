import { NextRequest, NextResponse } from "next/server";

/* ==========================================================================
 *  Paso 1 del login del panel /admin.
 *  Manda a la persona a GitHub para que autorice; GitHub la devuelve a
 *  /callback. No guarda nada acá.
 * ========================================================================== */

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new NextResponse("Falta la variable de entorno GITHUB_OAUTH_CLIENT_ID en Vercel.", {
      status: 500,
    });
  }

  const redirectUri = `${req.nextUrl.origin}/callback`;
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", "repo");
  url.searchParams.set("state", Math.random().toString(36).slice(2));

  return NextResponse.redirect(url.toString());
}

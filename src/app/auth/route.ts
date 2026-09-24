import { NextRequest, NextResponse } from "next/server";

/* ==========================================================================
 *  Paso 1 del login del panel /admin (Decap CMS).
 *  Decap abre esta ruta en una ventana nueva; acá la mandamos a GitHub para
 *  que la persona autorice, y GitHub la manda de vuelta a /callback.
 *  No guarda nada, no tiene base de datos: solo arma la URL de GitHub.
 * ========================================================================== */

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new NextResponse(
      "Falta la variable de entorno GITHUB_OAUTH_CLIENT_ID en Vercel.",
      { status: 500 }
    );
  }

  const redirectUri = `${req.nextUrl.origin}/callback`;
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", "repo");
  url.searchParams.set("state", Math.random().toString(36).slice(2));

  return NextResponse.redirect(url.toString());
}

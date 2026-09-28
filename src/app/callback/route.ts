import { NextRequest, NextResponse } from "next/server";

/* ==========================================================================
 *  Paso 2 del login del panel /admin.
 *  GitHub vuelve acá con un "code" de un solo uso. Lo cambiamos por un token
 *  de acceso (necesita el Client Secret, por eso este paso vive en el
 *  servidor) y lo guardamos en una cookie del navegador — el panel lo usa
 *  desde ahí para hablar directo con la API de GitHub. No se guarda en
 *  ningún otro lado.
 * ========================================================================== */

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new NextResponse(
      "Faltan GITHUB_OAUTH_CLIENT_ID / GITHUB_OAUTH_CLIENT_SECRET en las variables de entorno de Vercel.",
      { status: 500 }
    );
  }
  if (!code) {
    return new NextResponse("GitHub no mandó ningún código. Volvé a intentar el login.", { status: 400 });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const tokenData: { access_token?: string; error?: string; error_description?: string } =
    await tokenRes.json();

  if (!tokenData.access_token) {
    return new NextResponse(
      `No se pudo completar el login con GitHub: ${tokenData.error_description ?? tokenData.error ?? "error desconocido"}.`,
      { status: 400 }
    );
  }

  const res = NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
  res.cookies.set("gh_token", tokenData.access_token, {
    httpOnly: false, // el panel lo lee desde el navegador para hablar con la API de GitHub
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 horas
  });
  return res;
}

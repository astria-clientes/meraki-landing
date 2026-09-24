import { NextRequest, NextResponse } from "next/server";

/* ==========================================================================
 *  Paso 2 del login del panel /admin (Decap CMS).
 *  GitHub vuelve acá con un "code" de un solo uso. Lo cambiamos por un token
 *  de acceso (eso sí necesita el Client Secret, por eso este paso vive en el
 *  servidor y no en el navegador) y se lo pasamos de vuelta a la ventana del
 *  panel con el protocolo que Decap espera (postMessage).
 *  No se guarda el token en ningún lado: solo pasa de acá a la pestaña del
 *  panel, una sola vez.
 * ========================================================================== */

export const dynamic = "force-dynamic";

function paginaError(mensaje: string) {
  return new NextResponse(`<p style="font-family:sans-serif">${mensaje}</p>`, {
    status: 400,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return paginaError(
      "Faltan GITHUB_OAUTH_CLIENT_ID / GITHUB_OAUTH_CLIENT_SECRET en las variables de entorno de Vercel."
    );
  }
  if (!code) {
    return paginaError("GitHub no mandó ningún código. Volvé a intentar el login.");
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const tokenData: { access_token?: string; error?: string; error_description?: string } =
    await tokenRes.json();

  if (!tokenData.access_token) {
    return paginaError(
      `No se pudo completar el login con GitHub: ${tokenData.error_description ?? tokenData.error ?? "error desconocido"}.`
    );
  }

  const payload = JSON.stringify({ token: tokenData.access_token, provider: "github" }).replace(
    /'/g,
    "\\'"
  );

  const html = `<!DOCTYPE html>
<html>
  <body>
    <script>
      (function () {
        function recibirMensaje(e) {
          window.opener.postMessage(
            'authorization:github:success:${payload}',
            e.origin
          );
          window.removeEventListener("message", recibirMensaje, false);
        }
        window.addEventListener("message", recibirMensaje, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
    Ya podés cerrar esta ventana.
  </body>
</html>`;

  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

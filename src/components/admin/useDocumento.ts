"use client";

import { useEffect, useState } from "react";
import { guardarJson, leerJson } from "@/lib/github";

type Estado<T> =
  | { estado: "cargando" }
  | { estado: "error"; mensaje: string }
  | { estado: "listo"; datos: T; sha: string };

/** Carga un content/*.json, deja editar en memoria, y lo guarda (commit real) cuando se pide. */
export function useDocumento<T>(rutaRepo: string) {
  const [estado, setEstado] = useState<Estado<T>>({ estado: "cargando" });
  const [guardando, setGuardando] = useState(false);
  const [guardadoOk, setGuardadoOk] = useState(false);

  useEffect(() => {
    let cancelado = false;
    leerJson<T>(rutaRepo)
      .then(({ datos, sha }) => {
        if (!cancelado) setEstado({ estado: "listo", datos, sha });
      })
      .catch((err) => {
        if (!cancelado) setEstado({ estado: "error", mensaje: err instanceof Error ? err.message : "Error" });
      });
    return () => {
      cancelado = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rutaRepo]);

  function setDatos(datos: T) {
    setEstado((e) => (e.estado === "listo" ? { ...e, datos } : e));
    setGuardadoOk(false);
  }

  async function guardar(mensaje: string) {
    if (estado.estado !== "listo") return;
    setGuardando(true);
    setGuardadoOk(false);
    try {
      const nuevoSha = await guardarJson(rutaRepo, estado.datos, estado.sha, mensaje);
      setEstado({ estado: "listo", datos: estado.datos, sha: nuevoSha });
      setGuardadoOk(true);
    } catch (err) {
      setEstado({ estado: "error", mensaje: err instanceof Error ? err.message : "Error al guardar" });
    } finally {
      setGuardando(false);
    }
  }

  return { estado, setDatos, guardar, guardando, guardadoOk };
}

"use client";

/* ==========================================================================
 *  Transición "velo": al tocar un capítulo, un velo de luz (el mismo
 *  crema/dorado del sitio) crece hasta cubrir la pantalla, ahí cambia de
 *  ruta, y se disuelve para revelar el capítulo nuevo. No es un objeto que
 *  cruza la pantalla como una hoja de papel: es un brillo que respira —el
 *  mismo lenguaje que ya usan la estrella del Hero y las luces de fondo—,
 *  así se siente como parte del sitio y no como una animación pegada encima.
 * ========================================================================== */

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const DURACION = 480;
type Fase = "inactivo" | "cubriendo" | "revelando";
const HojaContexto = createContext<(href: string) => void>(() => {});

export function useNavegacionHoja() {
  return useContext(HojaContexto);
}

export function TransicionHojaProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [fase, setFase] = useState<Fase>("inactivo");
  const navegando = useRef(false);

  const navegar = useCallback(
    (href: string) => {
      if (navegando.current) return;
      navegando.current = true;

      setFase("cubriendo"); // el velo crece hasta cubrir la pantalla
      window.setTimeout(() => {
        router.push(href);
        window.setTimeout(() => {
          setFase("revelando"); // se disuelve y revela el capítulo nuevo
          window.setTimeout(() => {
            setFase("inactivo");
            navegando.current = false;
          }, DURACION);
        }, 30);
      }, DURACION);
    },
    [router]
  );

  return (
    <HojaContexto.Provider value={navegar}>
      {children}
      <div aria-hidden className="velo-contenedor" data-fase={fase}>
        <div className="velo" />
      </div>
    </HojaContexto.Provider>
  );
}

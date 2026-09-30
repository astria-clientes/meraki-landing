"use client";

/* ==========================================================================
 *  Transición "hoja": al tocar un capítulo, una hoja de papel (el mismo
 *  crema/arena del sitio) gira sobre su propio borde izquierdo —como si
 *  pasaras la página— hasta tapar la pantalla, ahí cambia de ruta, y sigue
 *  girando para revelar el capítulo nuevo del otro lado. Es un giro que no
 *  para de crecer (90 → 180 → 270 → 360…), así nunca hay que "resetear" de
 *  golpe: cada tramo sigue el sentido del anterior.
 * ========================================================================== */

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const DURACION = 520;
const HojaContexto = createContext<(href: string) => void>(() => {});

export function useNavegacionHoja() {
  return useContext(HojaContexto);
}

export function TransicionHojaProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [grados, setGrados] = useState(90);
  const navegando = useRef(false);

  const navegar = useCallback(
    (href: string) => {
      if (navegando.current) return;
      navegando.current = true;

      setGrados((g) => g + 90); // gira hasta tapar la pantalla
      window.setTimeout(() => {
        router.push(href);
        window.setTimeout(() => {
          setGrados((g) => g + 90); // sigue girando: revela el capítulo nuevo
          window.setTimeout(() => {
            navegando.current = false;
          }, DURACION);
        }, 60);
      }, DURACION);
    },
    [router]
  );

  return (
    <HojaContexto.Provider value={navegar}>
      {children}
      <div aria-hidden className="hoja" style={{ transform: `rotateY(${grados}deg)` }} />
    </HojaContexto.Provider>
  );
}

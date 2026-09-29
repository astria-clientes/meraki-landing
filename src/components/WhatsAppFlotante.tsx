"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/lib/whatsapp";
import { IconoWhatsApp } from "./Iconos";

/**
 * Botón fijo de WhatsApp, presente en todas las páginas.
 * Aparece recién al scrollear un poco: en pantallas chicas, si estuviera
 * visible desde el primer instante, tapa el índice de capítulos del Hero.
 */
export default function WhatsAppFlotante() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,.45)] transition-all duration-300 md:bottom-6 md:right-6 md:h-16 md:w-16 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* Anillo de cobre, el hilo de la marca, respirando por debajo del verde */}
      <span
        aria-hidden
        className="absolute -inset-1.5 animate-respirar rounded-full ring-2 ring-cobre-claro/70"
      />
      <span className="absolute inset-0 animate-ondas rounded-full bg-whatsapp" aria-hidden />
      <IconoWhatsApp className="relative h-7 w-7 transition-transform duration-300 group-hover:scale-110 md:h-8 md:w-8" />
    </a>
  );
}
